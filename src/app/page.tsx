import {
  ArrowRight,
  Search,
  Layers,
  TrendingUp,
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
} from 'lucide-react'
import Link from 'next/link'
import { PATHWAYS, PATHWAY_COLOR_MAP, CENTERS, CENTER_COLOR_MAP, SAMPLE_ACTIVITIES } from '@/lib/sample-data'

const PATHWAY_ICONS: Record<string, React.ReactNode> = {
  health:   <Heart className="w-6 h-6" />,
  families: <GraduationCap className="w-6 h-6" />,
  hood:     <Home className="w-6 h-6" />,
  voice:    <Megaphone className="w-6 h-6" />,
  money:    <DollarSign className="w-6 h-6" />,
  planet:   <Leaf className="w-6 h-6" />,
  bigger:   <Globe className="w-6 h-6" />,
}

const CENTER_ICONS: Record<string, React.ReactNode> = {
  learning:       <BookOpen className="w-6 h-6" />,
  resource:       <Compass className="w-6 h-6" />,
  action:         <Heart className="w-6 h-6" />,
  accountability: <Scale className="w-6 h-6" />,
}

function CenterDots({ centers }: { centers: Record<string, boolean> }) {
  return (
    <div className="flex items-center gap-1.5">
      {CENTERS.map((center) => {
        const colors = CENTER_COLOR_MAP[center.color]
        return (
          <div
            key={center.id}
            className={`w-3 h-3 rounded-full border-2 ${
              centers[center.id] ? `${colors.bg} ${colors.border}` : 'bg-transparent border-rule'
            }`}
            title={`${center.name}${centers[center.id] ? '' : ' (coming soon)'}`}
          />
        )
      })}
    </div>
  )
}

export default function SplashPage() {
  const featured = SAMPLE_ACTIVITIES.slice(0, 3)

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      {/* Header */}
      <header className="bg-white border-b-2 border-ink shadow-header px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-bold tracking-tight text-ink">
            Community Exchange
          </Link>
          <nav className="flex gap-6 text-sm font-medium text-muted">
            <Link href="/activities" className="hover:text-ink transition-colors">Activities</Link>
            <Link href="/login" className="hover:text-ink transition-colors">Sign In</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* ─── Hero ─── */}
        <section className="relative overflow-hidden bg-ink text-white">
          <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-health via-voice to-bigger" />
          <div className="relative max-w-6xl mx-auto px-6 py-28 md:py-36">
            <h1 className="font-display text-display font-bold leading-tight mb-6 max-w-3xl">
              Exchange Ideas.<br />
              Build Power.<br />
              Transform Community.
            </h1>
            <p className="text-lg text-white/80 max-w-xl mb-10 leading-relaxed">
              Discover activities that connect you to the people, resources, and
              civic opportunities in your neighborhood. Go as deep as you want.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/activities"
                className="inline-flex items-center gap-2 bg-white text-ink px-7 py-3.5 font-bold text-sm hover:bg-paper transition-colors"
              >
                Explore Activities <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 border-2 border-white/60 text-white px-7 py-3.5 font-semibold text-sm hover:border-white hover:bg-white/10 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </section>

        {/* ─── How It Works ─── */}
        <section id="how-it-works" className="bg-white border-b-2 border-rule">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <h2 className="font-display text-headline font-bold text-ink mb-4 text-center">
              How It Works
            </h2>
            <p className="text-muted text-center mb-14 max-w-xl mx-auto">
              Community Exchange is a wayfinder. Pick an issue, choose your depth, and go.
            </p>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  icon: <Search className="w-8 h-8" />,
                  title: 'Discover',
                  description:
                    'Browse activities across 7 pathways that cover every dimension of community life — health, education, neighborhood, voice, money, planet, and connection.',
                },
                {
                  icon: <Layers className="w-8 h-8" />,
                  title: 'Engage',
                  description:
                    'Each activity connects to 4 centers of engagement: learn about an issue, find resources, take action, or hold decision-makers accountable.',
                },
                {
                  icon: <TrendingUp className="w-8 h-8" />,
                  title: 'Deepen',
                  description:
                    'Go as deep as you want. Come back anytime to pick up where you left off, try a new pathway, or level up your engagement.',
                },
              ].map((step, i) => (
                <div key={i} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-paper border-2 border-ink text-ink mb-5">
                    {step.icon}
                  </div>
                  <h3 className="font-display text-title font-bold text-ink mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 4 Centers ─── */}
        <section className="bg-paper border-b-2 border-rule">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <h2 className="font-display text-headline font-bold text-ink mb-4 text-center">
              4 Centers of Engagement
            </h2>
            <p className="text-muted text-center mb-14 max-w-xl mx-auto">
              Every activity connects to one or more centers. Each center answers a different question.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CENTERS.map((center) => {
                const colors = CENTER_COLOR_MAP[center.color]
                return (
                  <div
                    key={center.id}
                    className="bg-white border-2 border-rule shadow-card p-6 text-center"
                  >
                    <div
                      className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4"
                      style={{ background: colors.hex + '14', color: colors.hex }}
                    >
                      {CENTER_ICONS[center.id]}
                    </div>
                    <h3 className="font-display text-base font-bold text-ink mb-2">
                      {center.name}
                    </h3>
                    <p className="text-sm text-muted italic">
                      &ldquo;{center.question}&rdquo;
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── 7 Pathways ─── */}
        <section className="bg-white">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <h2 className="font-display text-headline font-bold text-ink mb-4 text-center">
              7 Pathways
            </h2>
            <p className="text-muted text-center mb-14 max-w-xl mx-auto">
              Every part of community life, organized so you can find what matters to you.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {PATHWAYS.map((pathway) => {
                const colors = PATHWAY_COLOR_MAP[pathway.id]
                return (
                  <Link
                    key={pathway.id}
                    href={`/activities?pathway=${pathway.id}`}
                    className={`group bg-white border-2 border-rule ${colors.borderLeft} border-l-4 shadow-card hover:shadow-card-hover transition-shadow p-5`}
                  >
                    <div className={`${colors.text} mb-3`}>
                      {PATHWAY_ICONS[pathway.id]}
                    </div>
                    <h3 className="font-display text-base font-bold text-ink mb-1 group-hover:underline">
                      {pathway.name}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {pathway.description}
                    </p>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── Featured Activities ─── */}
        <section className="bg-paper border-t-2 border-rule">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="font-display text-headline font-bold text-ink mb-2">
                  Featured Activities
                </h2>
                <p className="text-muted">A sample of what you can explore.</p>
              </div>
              <Link
                href="/activities"
                className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-blue hover:text-blue-lt transition-colors"
              >
                View All Activities <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featured.map((activity) => {
                const pathway = PATHWAYS.find((p) => p.id === activity.pathway)!
                const colors = PATHWAY_COLOR_MAP[activity.pathway]
                return (
                  <div
                    key={activity.id}
                    className={`bg-white border-2 border-rule ${colors.borderTop} border-t-4 shadow-card p-6`}
                  >
                    <span
                      className={`inline-block text-xs font-bold uppercase tracking-wider ${colors.text} mb-3`}
                    >
                      {pathway.name}
                    </span>
                    <h3 className="font-display text-lg font-bold text-ink mb-1">
                      {activity.title}
                    </h3>
                    <p className="text-sm text-faint mb-3">{activity.org}</p>
                    <div className="mb-4">
                      <CenterDots centers={activity.centers} />
                    </div>
                    <p className="text-sm text-muted leading-relaxed">
                      {activity.description}
                    </p>
                  </div>
                )
              })}
            </div>
            <div className="mt-8 sm:hidden text-center">
              <Link
                href="/activities"
                className="inline-flex items-center gap-1 text-sm font-semibold text-blue hover:text-blue-lt transition-colors"
              >
                View All Activities <ArrowRight className="w-4 h-4" />
              </Link>
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
            <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
