import { createClient } from '@/lib/supabase/server'
import { SAMPLE_ACTIVITIES, type Activity } from './sample-data'

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
  try {
    const supabase = await createClient()
    let query = supabase.from('available_resources').select('*').order('city').order('title')
    if (pathway) {
      query = query.eq('pathway', pathway)
    }
    const { data, error } = await query
    if (error || !data || data.length === 0) throw new Error('No DB results')
    return (data as AvailableResourceRow[]).map(rowToResource)
  } catch {
    let resources = [...SAMPLE_ACTIVITIES]
    if (pathway) resources = resources.filter(a => a.pathway === pathway)
    return resources
  }
}

export async function getAvailableResource(id: string): Promise<Activity | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from('available_resources').select('*').eq('id', id).single()
    if (error || !data) throw new Error('Not found in DB')
    return rowToResource(data as AvailableResourceRow)
  } catch {
    return SAMPLE_ACTIVITIES.find(a => a.id === id) || null
  }
}

export async function getRelatedResources(resource: Activity, limit = 3): Promise<Activity[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('available_resources')
      .select('*')
      .eq('pathway', resource.pathway)
      .neq('id', resource.id)
      .limit(limit)
    if (error || !data || data.length === 0) throw new Error('No DB results')
    return (data as AvailableResourceRow[]).map(rowToResource)
  } catch {
    return SAMPLE_ACTIVITIES
      .filter(a => a.id !== resource.id && a.pathway === resource.pathway)
      .slice(0, limit)
  }
}
