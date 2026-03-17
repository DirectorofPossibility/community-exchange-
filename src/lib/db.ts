/**
 * @fileoverview Database queries for the Community Exchange frontend.
 *
 * Fetches real content from Supabase (content_inbox, content_review_queue,
 * content_pathways, organizations) and maps it to the frontend data model.
 */

import { createServiceClient } from '@/lib/supabase/server'
import { safeQuery, safeQueryMany } from '@/lib/safe-query'

// ── Theme → Pathway mapping ──────────────────────────────────────────
const THEME_TO_PATHWAY: Record<string, string> = {
  THEME_01: 'health',
  THEME_02: 'families',
  THEME_03: 'hood',
  THEME_04: 'voice',
  THEME_05: 'money',
  THEME_06: 'planet',
  THEME_07: 'bigger',
}

// ── Center derivation from content_type ──────────────────────────────
const CONTENT_TYPE_TO_CENTER: Record<string, string> = {
  // Learning
  article: 'learning',
  reading_list: 'learning',
  research: 'learning',
  book: 'learning',
  video: 'learning',
  podcast: 'learning',
  curriculum: 'learning',
  dataset_or_map: 'learning',
  case_study: 'learning',
  faq: 'learning',
  guide: 'learning',
  // Resource
  organization_profile: 'resource',
  online_class: 'resource',
  webinar: 'resource',
  diy_kit: 'resource',
  facilitator_tool: 'resource',
  // Action
  volunteer_opportunity: 'action',
  event: 'action',
  workshop: 'action',
  talking_circle: 'action',
  advocacy_action: 'action',
  // Accountability
  policy_brief: 'accountability',
  press_release: 'accountability',
  report: 'accountability',
  // Fallback: funding
  funding_or_grant: 'resource',
  job_or_fellowship: 'resource',
  news: 'learning',
}

// ── Types ────────────────────────────────────────────────────────────

export interface ContentItem {
  id: string
  title: string
  description: string
  source_url: string
  source_domain: string
  org_id: string | null
  org_name: string
  content_type: string | null
  image_url: string | null
  created_at: string
  center: string
  pathway: string | null
  pathway_name: string | null
  keywords: string[]
  action_items: Record<string, string | null> | null
}

// ── Queries ──────────────────────────────────────────────────────────

/**
 * Fetches content items with their classifications.
 * Joins content_inbox → organizations, content_review_queue (for center),
 * and content_pathways (for pathway).
 */
export async function getContent(options: {
  limit?: number
  center?: string
  pathway?: string
  contentType?: string
} = {}): Promise<ContentItem[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY
  if (!url || !key) {
    console.error('[getContent] Missing env vars — URL:', !!url, 'KEY:', !!key)
    return []
  }
  const supabase = createServiceClient()
  const { limit = 20, center, pathway } = options

  // Fetch content_inbox with org join
  const query = supabase
    .from('content_inbox')
    .select(`
      id,
      title,
      description,
      source_url,
      source_domain,
      org_id,
      content_type,
      image_url,
      created_at,
      parent_inbox_id
    `)
    .eq('status', 'needs_review')
    .is('parent_inbox_id', null)
    .order('created_at', { ascending: false })
    .limit(100) // fetch all to ensure center/pathway filtering works with small datasets

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items = await safeQueryMany<any>(() => query)
  if (items.length === 0) {
    console.warn('[getContent] No items returned from content_inbox')
    return []
  }

  // Get IDs for junction lookups
  const ids = items.map((i: any) => i.id)

  // Parallel: fetch classifications, pathways, and org names
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [classRows, pathwayRows, orgRows] = await Promise.all([
    safeQueryMany<any>(() =>
      supabase.from('content_review_queue').select('inbox_id, ai_classification').in('inbox_id', ids)
    ),
    safeQueryMany<any>(() =>
      supabase.from('content_pathways').select('content_id, theme_id, is_primary').in('content_id', ids).eq('is_primary', true)
    ),
    safeQueryMany<any>(() =>
      supabase.from('organizations').select('org_id, org_name').in('org_id', items.map((i: any) => i.org_id).filter(Boolean) as string[])
    ),
  ])

  // Build lookup maps
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const classMap = new Map<string, any>()
  for (const row of classRows) {
    classMap.set(row.inbox_id, row.ai_classification)
  }

  const pathwayMap = new Map<string, string>()
  for (const row of pathwayRows) {
    pathwayMap.set(row.content_id, THEME_TO_PATHWAY[row.theme_id] || 'bigger')
  }

  const orgMap = new Map<string, string>()
  for (const row of orgRows) {
    orgMap.set(row.org_id, row.org_name)
  }

  // Assemble content items
  let result: ContentItem[] = items.map(item => {
    const classification = classMap.get(item.id)
    const itemCenter = classification?.center?.toLowerCase() ||
      CONTENT_TYPE_TO_CENTER[item.content_type || ''] || 'learning'
    const itemPathway = pathwayMap.get(item.id) || null

    return {
      id: item.id,
      title: item.title || 'Untitled',
      description: item.description || classification?.reasoning?.slice(0, 200) || '',
      source_url: item.source_url,
      source_domain: item.source_domain || '',
      org_id: item.org_id,
      org_name: orgMap.get(item.org_id || '') || item.source_domain || 'Unknown',
      content_type: item.content_type,
      image_url: item.image_url,
      created_at: item.created_at,
      center: itemCenter,
      pathway: itemPathway,
      pathway_name: null, // filled below
      keywords: classification?.keywords || [],
      action_items: classification?.action_items || null,
    }
  })

  // Filter by center if requested
  if (center) {
    result = result.filter(i => i.center === center)
  }

  // Filter by pathway if requested
  if (pathway) {
    result = result.filter(i => i.pathway === pathway)
  }

  return result.slice(0, limit)
}

/**
 * Fetches a single content item by ID with full details.
 */
export async function getContentById(id: string): Promise<ContentItem | null> {
  const supabase = createServiceClient()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const item = await safeQuery<any>(() =>
    supabase.from('content_inbox').select('*').eq('id', id).single()
  )

  if (!item) return null

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [classData, pathwayData, orgData] = await Promise.all([
    safeQuery<any>(() =>
      supabase.from('content_review_queue').select('ai_classification').eq('inbox_id', id).single()
    ),
    safeQuery<any>(() =>
      supabase.from('content_pathways').select('theme_id, is_primary').eq('content_id', id).eq('is_primary', true).single()
    ),
    item.org_id
      ? safeQuery<any>(() => supabase.from('organizations').select('org_name').eq('org_id', item.org_id).single())
      : Promise.resolve(null),
  ])

  const classification = classData?.ai_classification
  const itemPathway = pathwayData
    ? THEME_TO_PATHWAY[pathwayData.theme_id] || null
    : null

  return {
    id: item.id,
    title: item.title || 'Untitled',
    description: item.description || classification?.reasoning?.slice(0, 200) || '',
    source_url: item.source_url,
    source_domain: item.source_domain || '',
    org_id: item.org_id,
    org_name: orgData?.org_name || item.source_domain || 'Unknown',
    content_type: item.content_type,
    image_url: item.image_url,
    created_at: item.created_at,
    center: classification?.center?.toLowerCase() ||
      CONTENT_TYPE_TO_CENTER[item.content_type || ''] || 'learning',
    pathway: itemPathway,
    pathway_name: null,
    keywords: classification?.keywords || [],
    action_items: classification?.action_items || null,
  }
}

/**
 * Fetches related content for a given item (same pathway or center).
 */
export async function getRelatedContent(
  currentId: string,
  pathway: string | null,
  center: string,
  limit = 3,
): Promise<ContentItem[]> {
  // Try same pathway first, then same center
  const items = await getContent({ limit: limit + 5, pathway: pathway || undefined })
  const filtered = items.filter(i => i.id !== currentId).slice(0, limit)
  if (filtered.length >= limit) return filtered

  // Supplement with same center
  const centerItems = await getContent({ limit: limit + 5, center })
  const more = centerItems.filter(i => i.id !== currentId && !filtered.some(f => f.id === i.id))
  return [...filtered, ...more].slice(0, limit)
}

/**
 * Fetches children of a multi-resource parent.
 */
export async function getChildContent(parentId: string): Promise<ContentItem[]> {
  const supabase = createServiceClient()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items = await safeQueryMany<any>(() =>
    supabase.from('content_inbox')
      .select('id, title, description, source_url, source_domain, org_id, content_type, image_url, created_at')
      .eq('parent_inbox_id', parentId)
      .order('created_at', { ascending: true })
  )

  if (items.length === 0) return []

  // Get org name
  const orgIds = Array.from(new Set(items.map((i: any) => i.org_id).filter(Boolean))) as string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const orgs = orgIds.length > 0
    ? await safeQueryMany<any>(() => supabase.from('organizations').select('org_id, org_name').in('org_id', orgIds))
    : []

  const orgMap = new Map<string, string>()
  for (const org of orgs) orgMap.set(org.org_id, org.org_name)

  return items.map(item => ({
    id: item.id,
    title: item.title || 'Untitled',
    description: item.description || '',
    source_url: item.source_url,
    source_domain: item.source_domain || '',
    org_id: item.org_id,
    org_name: orgMap.get(item.org_id || '') || '',
    content_type: item.content_type,
    image_url: item.image_url,
    created_at: item.created_at,
    center: CONTENT_TYPE_TO_CENTER[item.content_type || ''] || 'resource',
    pathway: null,
    pathway_name: null,
    keywords: [],
    action_items: null,
  }))
}
