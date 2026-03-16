import { createClient } from '@/lib/supabase/server'

export type UserRole = 'user' | 'neighbor' | 'partner' | 'super_admin'

export interface UserProfile {
  id: string
  email: string
  display_name: string | null
  zip_code: string | null
  role: UserRole
}

/** Get the current authenticated user + their profile. Returns null if not logged in. */
export async function getCurrentUser(): Promise<UserProfile | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name, zip_code, role')
    .eq('id', user.id)
    .single()

  return {
    id: user.id,
    email: user.email ?? '',
    display_name: profile?.display_name ?? null,
    zip_code: profile?.zip_code ?? null,
    role: (profile?.role as UserRole) ?? 'user',
  }
}

/** Role hierarchy for permission checks */
const ROLE_LEVEL: Record<UserRole, number> = {
  user: 0,
  neighbor: 1,
  partner: 2,
  super_admin: 3,
}

/** Check if a role meets a minimum required level */
export function hasRole(userRole: UserRole, minRole: UserRole): boolean {
  return ROLE_LEVEL[userRole] >= ROLE_LEVEL[minRole]
}
