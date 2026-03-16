'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import {
  PATHWAYS,
  PATHWAY_COLOR_MAP,
  CENTERS,
  CENTER_COLOR_MAP,
  SAMPLE_ACTIVITIES,
  type PathwayId,
  type Activity,
} from '@/lib/sample-data'
import Wayfinder from '@/components/Wayfinder'
import WayfinderSidebar from '@/components/WayfinderSidebar'
import PathwayFilter from '@/components/PathwayFilter'

export default function ActivitiesPage() {
  const [selectedPathway, setSelectedPathway] = useState<PathwayId | null>(null)
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)

  const filtered = selectedPathway
    ? SAMPLE_ACTIVITIES.filter((a) => a.pathway === selectedPathway)
    : SAMPLE_ACTIVITIES

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      {/* Header */}
      <header className="bg-white border-b-2 border-ink shadow-header px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-bold tracking-tight text-ink">
            Community Exchange
          </Link>
          <nav className="flex gap-6 text-sm font-medium text-muted">
            <Link href="/" className="hover:text-ink transition-colors">Home</Link>
            <Link href="/login" className="hover:text-ink transition-colors">Sign In</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Page Title */}
        <section className="bg-white border-b-2 border-rule px-6 py-10">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-muted hover:text-ink transition-colors mb-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
            </Link>
            <h1 className="font-display text-headline font-bold text-ink mb-2">
              Activities
            </h1>
            <p className="text-muted max-w-xl">
              Browse community activities across all 7 pathways. Each activity
              connects to 4 centers of engagement — go as deep as you want.
            </p>
          </div>
        </section>

        {/* Center Legend */}
        <section className="bg-white border-b border-rule px-6 py-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted">
              <span className="font-semibold text-ink">4 Centers:</span>
              {CENTERS.map((center) => {
                const colors = CENTER_COLOR_MAP[center.color]
                return (
                  <span key={center.id} className="inline-flex items-center gap-1.5">
                    <span className={`w-3 h-3 rounded-full border-2 ${colors.bg} ${colors.border}`} />
                    <span>{center.name}</span>
                    <span className="text-faint">— {center.question}</span>
                  </span>
                )
              })}
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full border-2 bg-transparent border-rule" />
                Coming soon
              </span>
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="bg-white border-b border-rule px-6 py-4 sticky top-0 z-20 shadow-header">
          <div className="max-w-6xl mx-auto">
            <PathwayFilter selected={selectedPathway} onSelect={setSelectedPathway} />
          </div>
        </section>

        {/* Content: Grid + Sidebar */}
        <section className="px-6 py-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex gap-8">
              {/* Activity Grid */}
              <div className="flex-1 min-w-0">
                {filtered.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-muted text-lg">
                      No activities yet for this pathway. Check back soon.
                    </p>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-6">
                    {filtered.map((activity) => {
                      const pathway = PATHWAYS.find((p) => p.id === activity.pathway)!
                      const colors = PATHWAY_COLOR_MAP[activity.pathway]
                      const centerCount = Object.values(activity.centers).filter(Boolean).length
                      const isSelected = selectedActivity?.id === activity.id

                      return (
                        <article
                          key={activity.id}
                          onClick={() => setSelectedActivity(isSelected ? null : activity)}
                          className={`bg-white border-2 ${
                            isSelected ? 'border-ink' : 'border-rule'
                          } ${colors.borderTop} border-t-4 shadow-card hover:shadow-card-hover transition-all flex flex-col cursor-pointer`}
                        >
                          <div className="p-6 flex-1 flex flex-col">
                            {/* Pathway badge */}
                            <span
                              className={`inline-block self-start text-xs font-bold uppercase tracking-wider ${colors.text} mb-3`}
                            >
                              {pathway.name}
                            </span>

                            {/* Title */}
                            <h2 className="font-display text-lg font-bold text-ink mb-1">
                              {activity.title}
                            </h2>

                            {/* Org */}
                            <p className="text-sm text-faint mb-3">{activity.org}</p>

                            {/* Center indicator */}
                            <div className="mb-4 flex items-center gap-3">
                              <Wayfinder centers={activity.centers} />
                              <span className="text-xs text-faint">
                                {centerCount} of 4 centers
                              </span>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-muted leading-relaxed mb-6 flex-1">
                              {activity.description}
                            </p>

                            {/* CTA */}
                            <div>
                              <button
                                className={`inline-flex items-center gap-1.5 text-sm font-bold ${colors.text} hover:underline`}
                              >
                                {isSelected ? 'Close' : 'Explore'}{' '}
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </article>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Wayfinder Sidebar */}
              <div className="hidden lg:block w-80 flex-shrink-0">
                {selectedActivity ? (
                  <div className="sticky top-24">
                    <WayfinderSidebar activity={selectedActivity} />
                  </div>
                ) : (
                  <div className="sticky top-24">
                    <div className="bg-white border-2 border-rule p-6 text-center">
                      <p className="text-sm text-muted mb-2 font-display font-bold">
                        Select an activity
                      </p>
                      <p className="text-xs text-faint leading-relaxed">
                        Click any activity card to see its wayfinder — the
                        connected resources, actions, and decision-makers
                        available to you.
                      </p>
                    </div>
                  </div>
                )}
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
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
