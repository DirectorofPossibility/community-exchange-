import Link from 'next/link'
import { ArrowLeft, Search, Layers, TrendingUp, BookOpen, Compass, Heart, Scale } from 'lucide-react'
import { CENTERS, CENTER_COLOR_MAP } from '@/lib/sample-data'

const CENTER_ICONS: Record<string, React.ReactNode> = {
  learning: <BookOpen className="w-6 h-6" />,
  resource: <Compass className="w-6 h-6" />,
  action: <Heart className="w-6 h-6" />,
  accountability: <Scale className="w-6 h-6" />,
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <header className="bg-white border-b-2 border-ink shadow-header px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-bold tracking-tight text-ink">
            Community Exchange
          </Link>
          <nav className="flex gap-6 text-sm font-medium text-muted">
            <Link href="/available-resources" className="hover:text-ink transition-colors">Available Resources</Link>
            <Link href="/login" className="hover:text-ink transition-colors">Sign In</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="bg-white border-b-2 border-rule px-6 py-10">
          <div className="max-w-6xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted hover:text-ink transition-colors mb-4">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
            </Link>
            <h1 className="font-display text-headline font-bold text-ink mb-2">How It Works</h1>
            <p className="text-muted max-w-xl">
              Community Exchange is a wayfinder. Pick an issue, choose your depth, and go.
            </p>
          </div>
        </section>

        {/* 3-Step Process */}
        <section className="bg-white border-b-2 border-rule">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  icon: <Search className="w-8 h-8" />,
                  title: 'Discover',
                  description: 'Browse resources across 7 pathways that cover every dimension of community life — health, education, neighborhood, voice, money, planet, and connection.',
                },
                {
                  icon: <Layers className="w-8 h-8" />,
                  title: 'Engage',
                  description: 'Each resource connects to 4 centers of engagement: learn about an issue, find resources, take action, or hold decision-makers accountable.',
                },
                {
                  icon: <TrendingUp className="w-8 h-8" />,
                  title: 'Deepen',
                  description: 'Go as deep as you want. Come back anytime to pick up where you left off, try a new pathway, or level up your engagement.',
                },
              ].map((step, i) => (
                <div key={i} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-paper border-2 border-ink text-ink mb-5">
                    {step.icon}
                  </div>
                  <h3 className="font-display text-title font-bold text-ink mb-3">{step.title}</h3>
                  <p className="text-muted leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4 Centers */}
        <section className="bg-paper">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <h2 className="font-display text-headline font-bold text-ink mb-4 text-center">4 Centers of Engagement</h2>
            <p className="text-muted text-center mb-14 max-w-xl mx-auto">
              Every activity connects to one or more centers. Each center answers a different question.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CENTERS.map((center) => {
                const colors = CENTER_COLOR_MAP[center.color]
                return (
                  <div key={center.id} className="bg-white border-2 border-rule shadow-card p-6 text-center">
                    <div
                      className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4"
                      style={{ background: colors.hex + '14', color: colors.hex }}
                    >
                      {CENTER_ICONS[center.id]}
                    </div>
                    <h3 className="font-display text-base font-bold text-ink mb-2">{center.name}</h3>
                    <p className="text-sm text-muted italic">&ldquo;{center.question}&rdquo;</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-ink text-white/70 border-t-2 border-ink px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">Community Exchange &mdash; The Change Lab Inc.</p>
          <nav className="flex gap-6 text-sm">
            <Link href="/available-resources" className="hover:text-white transition-colors">Available Resources</Link>
            <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
