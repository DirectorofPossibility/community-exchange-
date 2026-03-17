import {
  ArrowRight,
  Heart,
  GraduationCap,
  Home,
  Megaphone,
  DollarSign,
  Leaf,
  Globe,
  BookOpen,
  Compass,
  Scale,
  ExternalLink,
  Newspaper,
  Sparkles,
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
import { getAvailableResources } from '@/lib/available-resources'
import { getContent, type ContentItem } from '@/lib/db'
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

const CENTER_ICONS: Record<string, React.ReactNode> = {
  resource: <Compass size={16} className="text-resource" />,
  action: <Heart size={16} className="text-action" />,
  learning: <BookOpen size={16} className="text-learning" />,
  accountability: <Scale size={16} className="text-accountability" />,
}

const CENTER_LABELS: Record<string, { title: string; subtitle: string; color: string; linkText: string }> = {
  resource: { title: 'Resource Center', subtitle: "What's available", color: 'text-resource', linkText: 'Browse all resources' },
  action: { title: 'Action Center', subtitle: 'How to show up', color: 'text-action', linkText: 'Find ways to participate' },
  learning: { title: 'Library', subtitle: 'Understand the issues', color: 'text-learning', linkText: 'Explore the library' },
}

function ActivityCard({ activity }: { activity: Activity }) {
  const pathway = PATHWAYS.find((p) => p.id === activity.pathway)!
  const colors = PATHWAY_COLOR_MAP[activity.pathway]
  const centerCount = Object.values(activity.centers).filter(Boolean).length

  return (
    <Link
      href={`/available-resources/${activity.id}`}
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

function DBContentCard({ item }: { item: ContentItem }) {
  const pathway = item.pathway ? PATHWAYS.find(p => p.id === item.pathway) : null
  const colors = item.pathway ? PATHWAY_COLOR_MAP[item.pathway] : null
  return (
    <Link href={`/content/${item.id}`} className="block group">
      {pathway && colors && (
        <span className={`text-[10px] font-bold uppercase tracking-wider ${colors.text}`}>
          {pathway.name}
        </span>
      )}
      <h3 className="text-sm font-bold text-ink group-hover:underline leading-snug mt-0.5">
        {item.title}
      </h3>
      <p className="text-xs text-faint mt-0.5">{item.org_name}</p>
    </Link>
  )
}

export default async function HomePage() {
  // Fetch both sample activities and real DB content in parallel
  const [allActivities, resourceItems, actionItems, learningItems, allContent] = await Promise.all([
    getAvailableResources(),
    getContent({ limit: 4, center: 'resource' }),
    getContent({ limit: 4, center: 'action' }),
    getContent({ limit: 4, center: 'learning' }),
    getContent({ limit: 10 }),
  ])

  // Pick one featured activity per pathway
  const featured: Activity[] = []
  for (const p of PATHWAYS) {
    const match = allActivities.find((a) => a.pathway === p.id)
    if (match) featured.push(match)
  }

  const byPathway = new Map<PathwayId, Activity[]>()
  for (const a of allActivities) {
    if (!byPathway.has(a.pathway)) byPathway.set(a.pathway, [])
    byPathway.get(a.pathway)!.push(a)
  }

  const centerData: Record<string, ContentItem[]> = {
    resource: resourceItems,
    action: actionItems,
    learning: learningItems,
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
            <Link href="/available-resources" className="hover:text-ink transition-colors">Available Resources</Link>
            <Link href="/search" className="hover:text-ink transition-colors">Search</Link>
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
              Resources, services, news, and the people who make decisions — all in one place.
            </p>
            <Link
              href="/available-resources"
              className="inline-flex items-center gap-2 bg-white text-ink font-bold text-sm px-5 py-2.5 hover:bg-white/90 transition-colors"
            >
              Browse All Resources <ArrowRight size={16} />
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
                  href={`/available-resources?pathway=${p.id}`}
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

        {/* ─── 3 Centers Editorial Grid (Real DB Content) ─── */}
        <section className="px-6 py-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-6">
              {(['resource', 'action', 'learning'] as const).map((centerKey) => {
                const meta = CENTER_LABELS[centerKey]
                const items = centerData[centerKey]
                return (
                  <div key={centerKey} className="bg-white border-2 border-rule">
                    <Link href={`/search?center=${centerKey}`} className="px-5 py-4 border-b-2 border-rule flex items-center gap-2 hover:bg-paper/50 transition-colors">
                      {CENTER_ICONS[centerKey]}
                      <h2 className={`font-display text-sm font-bold uppercase tracking-wider ${meta.color}`}>
                        {meta.title}
                      </h2>
                      <span className="text-[10px] text-faint ml-auto">{meta.subtitle}</span>
                    </Link>
                    <div className="p-5 space-y-4">
                      {items.length > 0 ? (
                        items.slice(0, 3).map((item) => (
                          <DBContentCard key={item.id} item={item} />
                        ))
                      ) : (
                        <p className="text-xs text-faint italic">Content coming soon</p>
                      )}
                      <Link href={`/search?center=${centerKey}`} className={`inline-flex items-center gap-1 text-xs font-bold ${meta.color} hover:underline`}>
                        {meta.linkText} <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── Latest Content + 3 Good Things ─── */}
        <section className="px-6 py-10 bg-white border-t-2 border-rule">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Latest Content Feed */}
              <div className="lg:col-span-3">
                <div className="flex items-center gap-2 mb-6">
                  <Newspaper size={16} className="text-ink" />
                  <h2 className="font-display text-lg font-bold text-ink">Latest Content</h2>
                </div>
                <div className="divide-y divide-rule">
                  {allContent.slice(0, 6).map((item) => {
                    const colors = item.pathway ? PATHWAY_COLOR_MAP[item.pathway] : null
                    return (
                      <div key={item.id} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex items-start gap-3">
                          <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${colors?.bg || 'bg-rule'}`} />
                          <div className="min-w-0 flex-1">
                            <Link href={`/content/${item.id}`} className="group">
                              <h3 className="text-sm font-bold text-ink leading-snug group-hover:underline">
                                {item.title}
                              </h3>
                            </Link>
                            <p className="text-xs text-faint mt-1">
                              {item.org_name}
                              {item.content_type && (
                                <> &middot; {item.content_type.replace(/_/g, ' ')}</>
                              )}
                            </p>
                          </div>
                          <a
                            href={item.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-faint hover:text-ink flex-shrink-0 mt-1"
                            title="View source"
                          >
                            <ExternalLink size={12} />
                          </a>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* 3 Good Things */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles size={16} className="text-ink" />
                  <h2 className="font-display text-lg font-bold text-ink">3 Good Things</h2>
                </div>
                <div className="space-y-4">
                  {learningItems.slice(0, 3).map((item) => {
                    const colors = item.pathway ? PATHWAY_COLOR_MAP[item.pathway] : null
                    const pathway = item.pathway ? PATHWAYS.find(p => p.id === item.pathway) : null
                    return (
                      <Link
                        key={item.id}
                        href={`/content/${item.id}`}
                        className={`block border-2 border-rule ${colors?.borderLeft || 'border-l-rule'} border-l-4 p-4 hover:shadow-card-hover transition-shadow`}
                      >
                        {pathway && colors && (
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${colors.text}`}>
                            {pathway.name}
                          </span>
                        )}
                        <h3 className="text-sm font-bold text-ink leading-snug mt-1">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="text-xs text-muted leading-relaxed mt-1 line-clamp-2">
                            {item.description}
                          </p>
                        )}
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Featured Resources ─── */}
        <section className="px-6 py-10 border-t-2 border-rule">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-lg font-bold text-ink">Start Exploring</h2>
              <Link href="/available-resources" className="text-xs font-bold text-muted hover:text-ink transition-colors inline-flex items-center gap-1">
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

        {/* ─── 4 Centers Explainer ─── */}
        <section className="bg-white border-t-2 border-rule px-6 py-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-ink mb-4">
              Every resource connects to 4 centers of engagement
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
                  <Link key={center.id} href={`/search?center=${center.id}`} className="flex items-start gap-3 p-3 hover:bg-paper/50 transition-colors">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${colors.bg} ${colors.border} border-2`}>
                      <span style={{ color: CENTER_COLOR_MAP[center.color].hex }}>
                        {icons[center.id]}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-ink">{center.name}</h3>
                      <p className="text-xs text-faint">{center.question}</p>
                    </div>
                  </Link>
                )
              })}
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
                    href={`/available-resources?pathway=${pathway.id}`}
                    className={`group flex items-center gap-3 bg-white border-2 border-rule ${colors.borderLeft} border-l-4 p-4 hover:shadow-card-hover transition-shadow`}
                  >
                    <div className={colors.text}>{PATHWAY_ICONS[pathway.id]}</div>
                    <div>
                      <h3 className="text-sm font-bold text-ink group-hover:underline">{pathway.name}</h3>
                      <p className="text-xs text-faint">{pathway.description}</p>
                      <p className="text-[10px] text-faint mt-0.5">{count} resources</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer className="bg-ink text-white/70 border-t-2 border-ink px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">Community Exchange &mdash; The Change Lab Inc.</p>
          <nav className="flex gap-6 text-sm">
            <Link href="/available-resources" className="hover:text-white transition-colors">Available Resources</Link>
            <Link href="/search" className="hover:text-white transition-colors">Search</Link>
            <Link href="/about" className="hover:text-white transition-colors">How It Works</Link>
            <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
