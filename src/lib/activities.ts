import { createClient } from '@/lib/supabase/server'
import type { Activity } from './sample-data'

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
  const supabase = await createClient()
  let query = supabase.from('activities').select('*').order('city').order('title')
  if (pathway) {
    query = query.eq('pathway', pathway)
  }
  const { data, error } = await query
  if (error) throw error
  return (data as ActivityRow[]).map(rowToActivity)
}

export async function getActivity(id: string): Promise<Activity | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('activities').select('*').eq('id', id).single()
  if (error || !data) return null
  return rowToActivity(data as ActivityRow)
}

export async function getRelatedActivities(activity: Activity, limit = 3): Promise<Activity[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('pathway', activity.pathway)
    .neq('id', activity.id)
    .limit(limit)
  if (error || !data) return []
  return (data as ActivityRow[]).map(rowToActivity)
}
