// src/lib/getData.ts
// Asset-based taxonomy informed by Julia Minson's receptive language research.
// Language: goals not deficits, curiosity not judgment, agency not charity.

import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// ── The 7 Pathways — framed as goals, not deficits ─────────────
// Minson: separate the person from the problem.
// Each label describes where someone is GOING, not where they're lacking.
export const PATHWAYS = [
  {
    id: 'food',
    // Goal framing — not "food assistance"
    label: 'Feeding Your Family Well',
    shortLabel: 'Food & Meals',
    emoji: '🥗',
    color: '#B45309',
    bg: '#FFFBEB',
    border: '#FDE68A',
    // Receptive language: curious, warm, non-assumptive
    prompt: 'Whether you\'re stretching a budget, stocking a pantry, or helping a neighbor — here\'s what\'s available.',
    // Asset framing: what exists, not what people lack
    assetLabel: 'places with food and meals',
    tags: ['food','hunger','pantry','snap','meal','nutrition','grocery'],
  },
  {
    id: 'housing',
    label: 'Finding a Place to Call Home',
    shortLabel: 'Housing & Shelter',
    emoji: '🏠',
    color: '#1D4ED8',
    bg: '#EFF6FF',
    border: '#BFDBFE',
    prompt: 'From emergency shelter to homeownership — every step toward stability matters.',
    assetLabel: 'places that help with housing',
    tags: ['housing','shelter','homeless','rent','eviction','utility','mortgage'],
  },
  {
    id: 'health',
    label: 'Taking Care of Your Health',
    shortLabel: 'Health & Wellness',
    emoji: '💚',
    color: '#047857',
    bg: '#ECFDF5',
    border: '#A7F3D0',
    prompt: 'Clinics, counseling, dental care, and more — you deserve to feel well.',
    assetLabel: 'places that support health',
    tags: ['health','medical','mental','dental','clinic','wellness','insurance','therapy'],
  },
  {
    id: 'jobs',
    label: 'Building Your Future',
    shortLabel: 'Jobs & Income',
    emoji: '🌱',
    color: '#6D28D9',
    bg: '#F5F3FF',
    border: '#DDD6FE',
    prompt: 'Skills, opportunities, and support for wherever you are in your work life.',
    assetLabel: 'places that support work and income',
    tags: ['job','employ','work','career','income','training','resume','workforce'],
  },
  {
    id: 'education',
    label: 'Growing Your Skills',
    shortLabel: 'Education & Skills',
    emoji: '📚',
    color: '#BE185D',
    bg: '#FDF2F8',
    border: '#FBCFE8',
    prompt: 'From early learning to adult education — every new skill opens a door.',
    assetLabel: 'places that support learning',
    tags: ['education','school','literacy','tutor','learn','skill','ged','college'],
  },
  {
    id: 'family',
    label: 'Supporting Your Family',
    shortLabel: 'Family & Children',
    emoji: '👨‍👩‍👧',
    color: '#C2410C',
    bg: '#FFF7ED',
    border: '#FED7AA',
    prompt: 'Childcare, parenting support, youth programs — because strong families build strong communities.',
    assetLabel: 'places that support families and children',
    tags: ['child','family','youth','foster','parent','kid','childcare','baby','teen'],
  },
  {
    id: 'community',
    label: 'Getting Connected',
    shortLabel: 'Community & Civic',
    emoji: '🤝',
    color: '#0E7490',
    bg: '#ECFEFF',
    border: '#A5F3FC',
    prompt: 'Volunteer, advocate, or simply belong — Houston is stronger when we show up for each other.',
    assetLabel: 'places to connect and get involved',
    tags: ['community','civic','legal','volunteer','advocacy','grief','immigrant','senior'],
  },
]

export const CENTERS = [
  { id: 'resource',       label: 'Resource Center',       emoji: '📋', desc: 'Find organizations and services' },
  { id: 'action',         label: 'Action Center',         emoji: '⚡', desc: 'Volunteer, donate, get involved' },
  { id: 'learning',       label: 'Learning Center',       emoji: '🎓', desc: 'Guides written in plain language' },
  { id: 'accountability', label: 'Accountability Center', emoji: '📊', desc: 'Data on community needs and gaps' },
]

export interface OrgRecord {
  org_id: string
  org_name: string
  summary_6th_grade: string | null
  description_full: string | null
  tags: string[] | null
  city: string | null
  state: string | null
  zip_code: string | null
  phone: string | null
  website: string | null
  is_verified: string | null
  org_type: string | null
  latitude: number | null
  longitude: number | null
}

export async function getAvailableResources({
  pathway,
  county,
  limit = 60,
}: {
  pathway?: string
  county?: string
  limit?: number
} = {}): Promise<OrgRecord[]> {
  const supabase = getSupabase()
  let query = supabase
    .from('organizations')
    .select('org_id,org_name,summary_6th_grade,description_full,tags,city,state,zip_code,phone,website,is_verified,org_type,latitude,longitude')
    .is('deleted_at', null)
    .limit(limit)

  if (pathway && pathway !== 'all') {
    const p = PATHWAYS.find(pw => pw.id === pathway)
    if (p) query = query.overlaps('tags', p.tags)
  }
  if (county && county !== 'all') query = query.ilike('city', `%${county}%`)

  const { data, error } = await query
  if (error) { console.error('getAvailableResources error:', error); return [] }
  return data || []
}

export async function getCounties(): Promise<string[]> {
  const supabase = getSupabase()
  const { data } = await supabase
    .from('organizations').select('city')
    .is('deleted_at', null).not('city', 'is', null)
  return Array.from(new Set(data?.map((d: { city: string | null }) => d.city).filter(Boolean) as string[])).sort()
}

export async function getPathwayCounts(): Promise<Record<string, number>> {
  const supabase = getSupabase()
  const { data } = await supabase.from('organizations').select('tags').is('deleted_at', null)
  const counts: Record<string, number> = {}
  PATHWAYS.forEach(p => { counts[p.id] = 0 })
  data?.forEach((org: { tags: string[] | null }) => {
    if (!org.tags) return
    PATHWAYS.forEach(pathway => {
      if (pathway.tags.some(tag => org.tags.some((t: string) => t.toLowerCase().includes(tag)))) {
        counts[pathway.id]++
      }
    })
  })
  return counts
}

export async function getFeaturedResources(): Promise<OrgRecord[]> {
  return getAvailableResources({ limit: 7 })
}

export async function getRecentOrgs(): Promise<OrgRecord[]> {
  return getAvailableResources({ limit: 6 })
}

export async function getOrgCount(): Promise<number> {
  const supabase = getSupabase()
  const { count } = await supabase
    .from('organizations').select('*', { count: 'exact', head: true }).is('deleted_at', null)
  return count || 0
}
