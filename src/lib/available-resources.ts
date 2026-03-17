import { createClient } from '@/lib/supabase/server'
import { SAMPLE_ACTIVITIES, type Activity } from './sample-data'
import { safeQuery, safeQueryMany } from '@/lib/safe-query'

// Re-export the type under the new name
export type { Activity as AvailableResource } from './sample-data'

/** Row shape from the available_resources table */
interface AvailableResourceRow {
  id: string
  title: string
  pathway: string
  org: string
  description: string
  address: string
  city: string
  state: string
  zip: string
  county: string
  center_learning: boolean
  center_resource: boolean
  center_action: boolean
  center_accountability: boolean
  content_learning: { title: string; description: string }[]
  content_resource: { title: string; org: string; url?: string }[]
  content_action: { title: string; description: string; type: 'volunteer' | 'event' | 'service' }[]
  content_accountability: { title: string; role: string; level: string }[]
}

function rowToResource(row: AvailableResourceRow): Activity {
  return {
    id: row.id,
    title: row.title,
    pathway: row.pathway as Activity['pathway'],
    org: row.org,
    description: row.description,
    location: {
      address: row.address,
      city: row.city,
      state: row.state,
      zip: row.zip,
      county: row.county,
    },
    centers: {
      learning: row.center_learning,
      resource: row.center_resource,
      action: row.center_action,
      accountability: row.center_accountability,
    },
    centerContent: {
      learning: row.content_learning?.length ? row.content_learning : undefined,
      resource: row.content_resource?.length ? row.content_resource : undefined,
      action: row.content_action?.length ? row.content_action : undefined,
      accountability: row.content_accountability?.length ? row.content_accountability : undefined,
    },
  }
}

export async function getAvailableResources(pathway?: string): Promise<Activity[]> {
  const supabase = await createClient()
  let query = supabase.from('available_resources').select('*').order('city').order('title')
  if (pathway) {
    query = query.eq('pathway', pathway)
  }
  const data = await safeQueryMany<AvailableResourceRow>(() => query)
  if (data.length > 0) return data.map(rowToResource)
  // Fall back to sample data
  let resources = [...SAMPLE_ACTIVITIES]
  if (pathway) resources = resources.filter(a => a.pathway === pathway)
  return resources
}

export async function getAvailableResource(id: string): Promise<Activity | null> {
  const supabase = await createClient()
  const data = await safeQuery<AvailableResourceRow>(() =>
    supabase.from('available_resources').select('*').eq('id', id).single()
  )
  if (data) return rowToResource(data)
  return SAMPLE_ACTIVITIES.find(a => a.id === id) || null
}

export async function getRelatedResources(resource: Activity, limit = 3): Promise<Activity[]> {
  const supabase = await createClient()
  const data = await safeQueryMany<AvailableResourceRow>(() =>
    supabase.from('available_resources').select('*')
      .eq('pathway', resource.pathway)
      .neq('id', resource.id)
      .limit(limit)
  )
  if (data.length > 0) return data.map(rowToResource)
  return SAMPLE_ACTIVITIES
    .filter(a => a.id !== resource.id && a.pathway === resource.pathway)
    .slice(0, limit)
}
