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
} from 'lucide-react'
import Link from 'next/link'
import {
  PATHWAYS,
  PATHWAY_COLOR_MAP,
  SAMPLE_ACTIVITIES,
} from '@/lib/sample-data'

const PATHWAY_ICONS: Record<string, React.ReactNode> = {
  health: <Heart className="w-5 h-5" />,
  families: <GraduationCap className="w-5 h-5" />,
  hood: <Home className="w-5 h-5" />,
  voice: <Megaphone className="w-5 h-5" />,
  money: <DollarSign className="w-5 h-5" />,
  planet: <Leaf className="w-5 h-5" />,
  bigger: <Globe className="w-5 h-5" />,
}

/** Sample news items — will come from Supabase later */
const SAMPLE_NEWS = [
  {
    id: 'n1',
    title: 'City Council Approves New Community Health Center in Third Ward',
    source: 'Houston Chronicle',
    pathway: 'health' as const,
    date: 'Mar 14',
  },
  {
    id: 'n2',
    title: 'HISD Announces Free Summer Learning Programs for All Students',
    source: 'Houston ISD',
    pathway: 'families' as const,
    date: 'Mar 13',
  },
  {
    id: 'n3',
    title: 'Harris County Launches New Online Portal for Property Tax Assistance',
    source: 'Harris County',
    pathway: 'money' as const,
    date: 'Mar 12',
  },
  {
    id: 'n4',
    title: 'Bayou Greenways Project Completes New Trail Section Near East End',
    source: 'Houston Parks Board',
    pathway: 'planet' as const,
    date: 'Mar 11',
  },
  {
    id: 'n5',
    title: 'Early Voting Begins Next Week for Special Election in District F',
    source: 'Harris County Elections',
    pathway: 'voice' as const,
    date: 'Mar 10',
  },
]

/** 3 Good Things — curated positive community highlights */
const THREE_GOOD_THINGS = [
  {
    title: 'Neighbors Raised $12K for Sunnyside Community Garden',
    description: 'A crowdfunding campaign hit its goal in 8 days — 200+ residents chipped in to build raised beds and a tool shed.',
    pathway: 'hood' as const,
  },
  {
    title: '47 First-Time Voters Registered at Kashmere High',
    description: 'Student-led voter registration drive brought in the highest numbers in the school\'s history.',
    pathway: 'voice' as const,
  },
  {
    title: 'BakerRipley Helped 1,200 Families Avoid Utility Shutoffs This Month',
    description: 'Emergency assistance program connected residents with $2.3M in bill relief before the summer heat.',
    pathway: 'money' as const,
  },
]

export default function HomePage() {
  const featured = SAMPLE_ACTIVITIES.slice(0, 4)

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

              {/* Resource Center */}
              <div className="bg-white border-2 border-rule">
                <div className="px-5 py-4 border-b-2 border-rule flex items-center gap-2">
                  <Compass size={16} className="text-resource" />
                  <h2 className="font-display text-sm font-bold uppercase tracking-wider text-resource">
                    Resource Center
                  </h2>
                  <span className="text-[10px] text-faint ml-auto">What&rsquo;s available</span>
                </div>
                <div className="p-5 space-y-4">
                  {featured.filter(a => a.centers.resource).slice(0, 3).map((activity) => {
                    const colors = PATHWAY_COLOR_MAP[activity.pathway]
                    return (
                      <Link key={activity.id} href="/activities" className="block group">
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${colors.text}`}>
                          {PATHWAYS.find(p => p.id === activity.pathway)!.name}
                        </span>
                        <h3 className="text-sm font-bold text-ink group-hover:underline leading-snug mt-0.5">
                          {activity.title}
                        </h3>
                        <p className="text-xs text-faint mt-0.5">{activity.org}</p>
                      </Link>
                    )
                  })}
                  <Link href="/activities" className="inline-flex items-center gap-1 text-xs font-bold text-resource hover:underline">
                    Browse all resources <ArrowRight size={12} />
                  </Link>
                </div>
              </div>

              {/* Action Center */}
              <div className="bg-white border-2 border-rule">
                <div className="px-5 py-4 border-b-2 border-rule flex items-center gap-2">
                  <Heart size={16} className="text-action" />
                  <h2 className="font-display text-sm font-bold uppercase tracking-wider text-action">
                    Action Center
                  </h2>
                  <span className="text-[10px] text-faint ml-auto">How to show up</span>
                </div>
                <div className="p-5 space-y-4">
                  {featured.filter(a => a.centers.action).slice(0, 3).map((activity) => {
                    const colors = PATHWAY_COLOR_MAP[activity.pathway]
                    const actionItems = activity.centerContent.action || []
                    return (
                      <Link key={activity.id} href="/activities" className="block group">
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${colors.text}`}>
                          {PATHWAYS.find(p => p.id === activity.pathway)!.name}
                        </span>
                        <h3 className="text-sm font-bold text-ink group-hover:underline leading-snug mt-0.5">
                          {actionItems[0]?.title || activity.title}
                        </h3>
                        <p className="text-xs text-faint mt-0.5">{actionItems[0]?.description || activity.org}</p>
                      </Link>
                    )
                  })}
                  <Link href="/activities" className="inline-flex items-center gap-1 text-xs font-bold text-action hover:underline">
                    Find ways to participate <ArrowRight size={12} />
                  </Link>
                </div>
              </div>

              {/* Library */}
              <div className="bg-white border-2 border-rule">
                <div className="px-5 py-4 border-b-2 border-rule flex items-center gap-2">
                  <Scale size={16} className="text-accountability" />
                  <h2 className="font-display text-sm font-bold uppercase tracking-wider text-accountability">
                    Library
                  </h2>
                  <span className="text-[10px] text-faint ml-auto">Who makes decisions</span>
                </div>
                <div className="p-5 space-y-4">
                  {featured.filter(a => a.centers.accountability).slice(0, 3).map((activity) => {
                    const colors = PATHWAY_COLOR_MAP[activity.pathway]
                    const officials = activity.centerContent.accountability || []
                    return (
                      <Link key={activity.id} href="/activities" className="block group">
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${colors.text}`}>
                          {PATHWAYS.find(p => p.id === activity.pathway)!.name}
                        </span>
                        <h3 className="text-sm font-bold text-ink group-hover:underline leading-snug mt-0.5">
                          {officials[0]?.title || activity.title}
                        </h3>
                        <p className="text-xs text-faint mt-0.5">
                          {officials[0] ? `${officials[0].level} · ${officials[0].role}` : activity.org}
                        </p>
                      </Link>
                    )
                  })}
                  <Link href="/activities" className="inline-flex items-center gap-1 text-xs font-bold text-accountability hover:underline">
                    Explore the library <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── News + 3 Good Things ─── */}
        <section className="px-6 py-10 bg-white border-t-2 border-rule">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-8">

              {/* News Feed */}
              <div className="lg:col-span-3">
                <div className="flex items-center gap-2 mb-6">
                  <Newspaper size={16} className="text-ink" />
                  <h2 className="font-display text-lg font-bold text-ink">Community News</h2>
                </div>
                <div className="divide-y divide-rule">
                  {SAMPLE_NEWS.map((item) => {
                    const colors = PATHWAY_COLOR_MAP[item.pathway]
                    return (
                      <div key={item.id} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex items-start gap-3">
                          <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${colors.bg}`} />
                          <div className="min-w-0 flex-1">
                            <h3 className="text-sm font-bold text-ink leading-snug">
                              {item.title}
                            </h3>
                            <p className="text-xs text-faint mt-1">
                              {item.source} &middot; {item.date}
                            </p>
                          </div>
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
                  {THREE_GOOD_THINGS.map((item, i) => {
                    const colors = PATHWAY_COLOR_MAP[item.pathway]
                    return (
                      <div key={i} className={`border-2 border-rule ${colors.borderLeft} border-l-4 p-4`}>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${colors.text}`}>
                          {PATHWAYS.find(p => p.id === item.pathway)!.name}
                        </span>
                        <h3 className="text-sm font-bold text-ink leading-snug mt-1">
                          {item.title}
                        </h3>
                        <p className="text-xs text-muted leading-relaxed mt-1">
                          {item.description}
                        </p>
                      </div>
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
