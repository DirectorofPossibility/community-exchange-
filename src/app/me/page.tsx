import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getCurrentUser, hasRole } from '@/lib/auth'
import { ArrowLeft, User, MapPin, Shield, Building2, Crown } from 'lucide-react'
import SignOutButton from '@/components/SignOutButton'

const ROLE_CONFIG = {
  user: { label: 'User', icon: User, color: 'text-muted', bg: 'bg-paper' },
  neighbor: { label: 'Neighbor', icon: MapPin, color: 'text-health', bg: 'bg-health/10' },
  partner: { label: 'Partner', icon: Building2, color: 'text-families', bg: 'bg-families/10' },
  super_admin: { label: 'Super Admin', icon: Crown, color: 'text-voice', bg: 'bg-voice/10' },
} as const

export default async function MePage() {
  const user = await getCurrentUser()
  if (!user) redirect('/login')

  const roleInfo = ROLE_CONFIG[user.role]
  const RoleIcon = roleInfo.icon

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      {/* Header */}
      <header className="bg-white border-b-2 border-ink shadow-header px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-bold tracking-tight text-ink">
            Community Exchange
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium text-muted">
            <Link href="/available-resources" className="hover:text-ink transition-colors">Available Resources</Link>
            <SignOutButton />
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="bg-white border-b-2 border-rule px-6 py-10">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-muted hover:text-ink transition-colors mb-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
            </Link>
            <h1 className="font-display text-headline font-bold text-ink mb-2">
              My Dashboard
            </h1>
            <p className="text-muted">
              Welcome back{user.display_name ? `, ${user.display_name}` : ''}.
            </p>
          </div>
        </section>

        <section className="px-6 py-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Profile Card */}
              <div className="bg-white border-2 border-rule shadow-card p-6">
                <h2 className="font-display text-lg font-bold text-ink mb-4">Profile</h2>
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-faint">Email</span>
                    <p className="text-sm text-ink">{user.email}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-faint">Display Name</span>
                    <p className="text-sm text-ink">{user.display_name || 'Not set'}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-faint">ZIP Code</span>
                    <p className="text-sm text-ink">{user.zip_code || 'Not set'}</p>
                  </div>
                </div>
              </div>

              {/* Role Card */}
              <div className="bg-white border-2 border-rule shadow-card p-6">
                <h2 className="font-display text-lg font-bold text-ink mb-4">Your Role</h2>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${roleInfo.bg}`}>
                  <RoleIcon className={`w-5 h-5 ${roleInfo.color}`} />
                  <span className={`text-sm font-bold ${roleInfo.color}`}>{roleInfo.label}</span>
                </div>
                <div className="mt-4 space-y-2 text-xs text-muted">
                  <p className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5" />
                    {user.role === 'user' && 'Add your ZIP code to become a Neighbor'}
                    {user.role === 'neighbor' && 'You have full community access'}
                    {user.role === 'partner' && 'You can manage organization content'}
                    {user.role === 'super_admin' && 'Full platform administration'}
                  </p>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white border-2 border-rule shadow-card p-6">
                <h2 className="font-display text-lg font-bold text-ink mb-4">Quick Links</h2>
                <div className="space-y-2">
                  <Link
                    href="/available-resources"
                    className="block px-4 py-3 bg-paper border border-rule text-sm font-semibold text-ink hover:border-ink transition-colors"
                  >
                    Browse Activities
                  </Link>
                  {hasRole(user.role, 'partner') && (
                    <Link
                      href="/dashboard"
                      className="block px-4 py-3 bg-paper border border-rule text-sm font-semibold text-ink hover:border-ink transition-colors"
                    >
                      Partner Dashboard
                    </Link>
                  )}
                  {hasRole(user.role, 'super_admin') && (
                    <Link
                      href="/dashboard/admin"
                      className="block px-4 py-3 bg-paper border border-rule text-sm font-semibold text-ink hover:border-ink transition-colors"
                    >
                      Admin Panel
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-ink text-white/70 border-t-2 border-ink px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">Community Exchange &mdash; The Change Lab Inc.</p>
          <nav className="flex gap-6 text-sm">
            <Link href="/available-resources" className="hover:text-white transition-colors">Available Resources</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
