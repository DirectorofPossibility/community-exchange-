import {
  ArrowRight,
  Heart,
  GraduationCap,
  Home,
  Megaphone,
  DollarSign,
  Leaf,
  Globe,
  Compass,
  Scale,
  Newspaper,
  Sparkles,
  BookOpen,
  ExternalLink,
} from 'lucide-react'
import Link from 'next/link'
import {
  PATHWAYS,
  PATHWAY_COLOR_MAP,
} from '@/lib/sample-data'
import { getContent, type ContentItem } from '@/lib/db'

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

function ContentCard({ item }: { item: ContentItem }) {
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
  // Fetch real content by center — all in parallel
  const [resourceItems, actionItems, learningItems, allItems] = await Promise.all([
    getContent({ limit: 4, center: 'resource' }),
    getContent({ limit: 4, center: 'action' }),
    getContent({ limit: 4, center: 'learning' }),
    getContent({ limit: 10 }),
  ])

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
              Houston&rsquo;s Community Wayfinder
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-3 max-w-2xl">
              What&rsquo;s happening in your community — and how you can be part of it.
            </h1>
            <p className="text-white/60 max-w-xl text-sm leading-relaxed">
              Resources, activities, news, and the people who make decisions — all in one place.
            </p>
          </div>
        </section>

        {/* ─── Pathway Ticker ─── */}
        <section className="bg-white border-b-2 border-rule px-6 py-3">
          <div className="max-w-6xl mx-auto flex items-center gap-3 overflow-x-auto">
            {PATHWAYS.map((p) => {
              const colors = PATHWAY_COLOR_MAP[p.id]
              return (
                <Link
                  key={p.id}
                  href={`/activities?pathway=${p.id}`}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold whitespace-nowrap border-2 border-rule hover:${colors.border} ${colors.text} transition-colors`}
                >
                  {PATHWAY_ICONS[p.id]}
                  {p.name}
                </Link>
              )
            })}
          </div>
        </section>

        {/* ─── 3 Centers Editorial Grid ─── */}
        <section className="px-6 py-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-6">
              {(['resource', 'action', 'learning'] as const).map((centerKey) => {
                const meta = CENTER_LABELS[centerKey]
                const items = centerData[centerKey]
                return (
                  <div key={centerKey} className="bg-white border-2 border-rule">
                    <div className="px-5 py-4 border-b-2 border-rule flex items-center gap-2">
                      {CENTER_ICONS[centerKey]}
                      <h2 className={`font-display text-sm font-bold uppercase tracking-wider ${meta.color}`}>
                        {meta.title}
                      </h2>
                      <span className="text-[10px] text-faint ml-auto">{meta.subtitle}</span>
                    </div>
                    <div className="p-5 space-y-4">
                      {items.length > 0 ? (
                        items.slice(0, 3).map((item) => (
                          <ContentCard key={item.id} item={item} />
                        ))
                      ) : (
                        <p className="text-xs text-faint italic">Content coming soon</p>
                      )}
                      <Link href="/activities" className={`inline-flex items-center gap-1 text-xs font-bold ${meta.color} hover:underline`}>
                        {meta.linkText} <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── Recent Content + 3 Good Things ─── */}
        <section className="px-6 py-10 bg-white border-t-2 border-rule">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-8">

              {/* Recent Content Feed */}
              <div className="lg:col-span-3">
                <div className="flex items-center gap-2 mb-6">
                  <Newspaper size={16} className="text-ink" />
                  <h2 className="font-display text-lg font-bold text-ink">Latest Content</h2>
                </div>
                <div className="divide-y divide-rule">
                  {allItems.slice(0, 6).map((item) => {
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
                            {item.description && (
                              <p className="text-xs text-muted mt-1 line-clamp-2">
                                {item.description}
                              </p>
                            )}
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
                  {/* Pull from learning center — positive content */}
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

        {/* ─── 7 Pathways (compact) ─── */}
        <section className="px-6 py-10 border-t-2 border-rule">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-lg font-bold text-ink mb-6">7 Pathways</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PATHWAYS.map((pathway) => {
                const colors = PATHWAY_COLOR_MAP[pathway.id]
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
            <Link href="/activities" className="hover:text-white transition-colors">Activities</Link>
            <Link href="/about" className="hover:text-white transition-colors">How It Works</Link>
            <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
