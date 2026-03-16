import {
  ArrowRight,
  Heart,
  GraduationCap,
  Home,
  Megaphone,
  DollarSign,
  Leaf,
  Globe,
  MapPin,
  BookOpen,
  Compass,
  Scale,
} from 'lucide-react'
import Link from 'next/link'
import {
  PATHWAYS,
  PATHWAY_COLOR_MAP,
  CENTERS,
  CENTER_COLOR_MAP,
  type PathwayId,
} from '@/lib/sample-data'
import type { Activity } from '@/lib/sample-data'
import { getActivities } from '@/lib/activities'
import Wayfinder from '@/components/Wayfinder'

export const dynamic = 'force-dynamic'

const PATHWAY_ICONS: Record<string, React.ReactNode> = {
  health: <Heart className="w-5 h-5" />,
  families: <GraduationCap className="w-5 h-5" />,
  hood: <Home className="w-5 h-5" />,
  voice: <Megaphone className="w-5 h-5" />,
  money: <DollarSign className="w-5 h-5" />,
  planet: <Leaf className="w-5 h-5" />,
  bigger: <Globe className="w-5 h-5" />,
}

function ActivityCard({ activity }: { activity: Activity }) {
  const pathway = PATHWAYS.find((p) => p.id === activity.pathway)!
  const colors = PATHWAY_COLOR_MAP[activity.pathway]
  const centerCount = Object.values(activity.centers).filter(Boolean).length

  return (
    <Link
      href={`/activities/${activity.id}`}
      className={`bg-white border-2 border-rule ${colors.borderTop} border-t-4 shadow-card hover:shadow-card-hover transition-all flex flex-col group`}
    >
      <div className="p-5 flex-1 flex flex-col">
        <span className={`inline-block self-start text-[10px] font-bold uppercase tracking-wider ${colors.text} mb-2`}>
          {pathway.name}
        </span>
        <h3 className="font-display text-sm font-bold text-ink mb-1 group-hover:underline leading-snug">
          {activity.title}
        </h3>
        <p className="text-xs text-faint mb-2">{activity.org}</p>
        <div className="flex items-center gap-2 mb-2">
          <Wayfinder centers={activity.centers} />
          <span className="text-[10px] text-faint">{centerCount} of 4 centers</span>
        </div>
        <p className="text-xs text-muted leading-relaxed line-clamp-2 flex-1">
          {activity.description}
        </p>
      </div>
    </Link>
  )
}

export default async function HomePage() {
  const allActivities = await getActivities()

  // Pick featured activities — one from each pathway, shuffled
  const featured: Activity[] = []
  for (const p of PATHWAYS) {
    const match = allActivities.find((a) => a.pathway === p.id)
    if (match) featured.push(match)
  }

  // Group by pathway for the pathway sections
  const byPathway = new Map<PathwayId, Activity[]>()
  for (const a of allActivities) {
    if (!byPathway.has(a.pathway)) byPathway.set(a.pathway, [])
    byPathway.get(a.pathway)!.push(a)
  }

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      {/* ─── Masthead ─── */}
      <header className="bg-white border-b-2 border-ink shadow-header px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-bold tracking-tight text-ink">
            Community Exchange
          </Link>
          <nav className="flex gap-6 text-sm font-medium text-muted">
            <Link href="/activities" className="hover:text-ink transition-colors">Activities</Link>
            <Link href="/about" className="hover:text-ink transition-colors">How It Works</Link>
            <Link href="/login" className="hover:text-ink transition-colors">Sign In</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* ─── Hero Banner ─── */}
        <section className="bg-ink text-white px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-mono uppercase tracking-widest text-white/50 mb-3">
              Greater Houston Community Wayfinder
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-3 max-w-2xl">
              What&rsquo;s happening in your community — and how you can be part of it.
            </h1>
            <p className="text-white/60 max-w-xl text-sm leading-relaxed mb-6">
              {allActivities.length} activities across 7 pathways. Explore resources, take action, and discover who makes decisions in your neighborhood.
            </p>
            <Link
              href="/activities"
              className="inline-flex items-center gap-2 bg-white text-ink font-bold text-sm px-5 py-2.5 hover:bg-white/90 transition-colors"
            >
              Browse All Activities <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* ─── Pathway Ticker ─── */}
        <section className="bg-white border-b-2 border-rule px-6 py-3">
          <div className="max-w-6xl mx-auto flex items-center gap-3 overflow-x-auto">
            {PATHWAYS.map((p) => {
              const colors = PATHWAY_COLOR_MAP[p.id]
              const count = byPathway.get(p.id)?.length || 0
              return (
                <Link
                  key={p.id}
                  href={`/activities?pathway=${p.id}`}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold whitespace-nowrap border-2 border-rule hover:border-ink ${colors.text} transition-colors`}
                >
                  {PATHWAY_ICONS[p.id]}
                  {p.name}
                  <span className="text-faint font-normal">({count})</span>
                </Link>
              )
            })}
          </div>
        </section>

        {/* ─── 4 Centers Explainer ─── */}
        <section className="bg-white border-b border-rule px-6 py-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-ink mb-4">
              Every activity connects to 4 centers of engagement
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CENTERS.map((center) => {
                const colors = CENTER_COLOR_MAP[center.color]
                const icons: Record<string, React.ReactNode> = {
                  learning: <BookOpen size={20} />,
                  resource: <Compass size={20} />,
                  action: <Heart size={20} />,
                  accountability: <Scale size={20} />,
                }
                return (
                  <div key={center.id} className="flex items-start gap-3 p-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${colors.bg} ${colors.border} border-2`}>
                      <span style={{ color: CENTER_COLOR_MAP[center.color].hex }}>
                        {icons[center.id]}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-ink">{center.name}</h3>
                      <p className="text-xs text-faint">{center.question}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── Featured Activities Grid ─── */}
        <section className="px-6 py-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-lg font-bold text-ink">Start Exploring</h2>
              <Link href="/activities" className="text-xs font-bold text-muted hover:text-ink transition-colors inline-flex items-center gap-1">
                View all <ArrowRight size={12} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {featured.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </div>
        </section>

        {/* ─── 7 Pathways ─── */}
        <section className="px-6 py-10 bg-white border-t-2 border-rule">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-lg font-bold text-ink mb-2">7 Pathways</h2>
            <p className="text-sm text-muted mb-6">Each pathway is a lens into community life. Pick the one that speaks to you.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PATHWAYS.map((pathway) => {
                const colors = PATHWAY_COLOR_MAP[pathway.id]
                const count = byPathway.get(pathway.id)?.length || 0
                return (
                  <Link
                    key={pathway.id}
                    href={`/activities?pathway=${pathway.id}`}
                    className={`group flex items-center gap-3 bg-white border-2 border-rule ${colors.borderLeft} border-l-4 p-4 hover:shadow-card-hover transition-shadow`}
                  >
                    <div className={colors.text}>{PATHWAY_ICONS[pathway.id]}</div>
                    <div>
                      <h3 className="text-sm font-bold text-ink group-hover:underline">{pathway.name}</h3>
                      <p className="text-xs text-faint">{pathway.description}</p>
                      <p className="text-[10px] text-faint mt-0.5">{count} activities</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── By Location ─── */}
        <section className="px-6 py-10 border-t-2 border-rule">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <MapPin size={18} className="text-ink" />
              <h2 className="font-display text-lg font-bold text-ink">By Location</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {Array.from(
                allActivities.reduce((acc, a) => {
                  const key = a.location.county
                  acc.set(key, (acc.get(key) || 0) + 1)
                  return acc
                }, new Map<string, number>())
              )
                .sort((a, b) => b[1] - a[1])
                .map(([county, count]) => (
                  <div key={county} className="bg-white border-2 border-rule p-4">
                    <h3 className="text-sm font-bold text-ink">{county} County</h3>
                    <p className="text-xs text-faint">{count} activities</p>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer className="bg-ink text-white/70 border-t-2 border-ink px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">Community Exchange &mdash; The Change Lab Inc.</p>
          <nav className="flex gap-6 text-sm">
            <Link href="/activities" className="hover:text-white transition-colors">Activities</Link>
            <Link href="/about" className="hover:text-white transition-colors">How It Works</Link>
            <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
