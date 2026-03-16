import { createClient } from '@/lib/supabase/server'
import { SAMPLE_ACTIVITIES, type Activity } from './sample-data'

/** Row shape from the activities table */
interface ActivityRow {
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

function rowToActivity(row: ActivityRow): Activity {
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

export async function getActivities(pathway?: string): Promise<Activity[]> {
  try {
    const supabase = await createClient()
    let query = supabase.from('activities').select('*').order('city').order('title')
    if (pathway) {
      query = query.eq('pathway', pathway)
    }
    const { data, error } = await query
    if (error || !data || data.length === 0) throw new Error('No DB activities')
    return (data as ActivityRow[]).map(rowToActivity)
  } catch {
    // Fall back to sample data until activities table exists
    let activities = [...SAMPLE_ACTIVITIES]
    if (pathway) activities = activities.filter(a => a.pathway === pathway)
    return activities
  }
}

export async function getActivity(id: string): Promise<Activity | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from('activities').select('*').eq('id', id).single()
    if (error || !data) throw new Error('Not found in DB')
    return rowToActivity(data as ActivityRow)
  } catch {
    return SAMPLE_ACTIVITIES.find(a => a.id === id) || null
  }
}

export async function getRelatedActivities(activity: Activity, limit = 3): Promise<Activity[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('pathway', activity.pathway)
      .neq('id', activity.id)
      .limit(limit)
    if (error || !data || data.length === 0) throw new Error('No DB results')
    return (data as ActivityRow[]).map(rowToActivity)
  } catch {
    return SAMPLE_ACTIVITIES
      .filter(a => a.id !== activity.id && a.pathway === activity.pathway)
      .slice(0, limit)
  }
}
