'use client'

import { use } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  BookOpen, Compass, Heart, Users,
  MapPin, Calendar, Sparkles,
  FileText, Shield,
} from 'lucide-react'
import {
  PATHWAYS,
  PATHWAY_COLOR_MAP,
  CENTER_COLOR_MAP,
  SAMPLE_ACTIVITIES,
} from '@/lib/sample-data'
import type { Activity } from '@/lib/sample-data'

function getActivity(id: string): Activity | undefined {
  return SAMPLE_ACTIVITIES.find((a) => a.id === id)
}

/** Section wrapper — each wayfinder section is a chapter of the adventure */
function Chapter({
  icon,
  label,
  color,
  question,
  children,
}: {
  icon: React.ReactNode
  label: string
  color: string
  question: string
  children: React.ReactNode
}) {
  return (
    <section className="border-t-2 border-rule">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: color + '14', color }}
          >
            {icon}
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-ink">{label}</h2>
            <p className="text-sm text-faint italic">{question}</p>
          </div>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  )
}

/** Card for a linked resource/object */
function ObjectCard({
  icon,
  title,
  meta,
  description,
  color,
}: {
  icon: React.ReactNode
  title: string
  meta?: string
  description?: string
  color: string
}) {
  return (
    <div className="bg-white border-2 border-rule hover:border-ink transition-colors p-5 cursor-pointer group">
      <div className="flex items-start gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: color + '14', color }}
        >
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold text-ink group-hover:underline leading-snug">
            {title}
          </h3>
          {meta && (
            <p className="text-xs text-faint mt-0.5">{meta}</p>
          )}
          {description && (
            <p className="text-xs text-muted leading-relaxed mt-1.5">{description}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ActivityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const activity = getActivity(id)

  if (!activity) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-ink mb-2">Activity not found</h1>
          <Link href="/activities" className="text-sm text-muted hover:text-ink">
            <ArrowLeft className="w-3.5 h-3.5 inline mr-1" /> Back to Activities
          </Link>
        </div>
      </div>
    )
  }

  const pathway = PATHWAYS.find((p) => p.id === activity.pathway)!
  const colors = PATHWAY_COLOR_MAP[activity.pathway]
  const cc = activity.centerContent



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
            <Link href="/about" className="hover:text-ink transition-colors">How It Works</Link>
            <Link href="/login" className="hover:text-ink transition-colors">Sign In</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* ─── Hero ─── */}
        <section className={`${colors.borderTop} border-t-4 bg-white border-b-2 border-rule`}>
          <div className="max-w-4xl mx-auto px-6 py-10">
            <Link
              href="/activities"
              className="inline-flex items-center gap-1 text-sm text-muted hover:text-ink transition-colors mb-6"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> All Activities
            </Link>

            {/* Pathway badge */}
            <span className={`inline-block text-xs font-bold uppercase tracking-wider ${colors.text} mb-3`}>
              {pathway.name}
            </span>

            <h1 className="font-display text-3xl md:text-4xl font-bold text-ink mb-3 leading-tight">
              {activity.title}
            </h1>

            {/* Org anchor */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-full bg-paper flex items-center justify-center border border-rule">
                <Users size={12} className="text-faint" />
              </div>
              <span className="text-sm font-semibold text-ink">{activity.org}</span>
            </div>

            <p className="text-muted leading-relaxed max-w-2xl mb-6">
              {activity.description}
            </p>

            {/* Journey map — shows which chapters are available */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-faint">Your journey:</span>
              {activity.centers.learning && (
                <a href="#explore" className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 border-2 border-rule hover:border-ink transition-colors" style={{ color: CENTER_COLOR_MAP.learning.hex }}>
                  <BookOpen size={12} /> Explore
                </a>
              )}
              {(activity.centers.resource || activity.centers.action) && (
                <a href="#take-action" className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 border-2 border-rule hover:border-ink transition-colors" style={{ color: CENTER_COLOR_MAP.action.hex }}>
                  <Heart size={12} /> Take Action
                </a>
              )}
              {activity.centers.accountability && cc.accountability && cc.accountability.length > 0 && (
                <>
                  <a href="#laws-policy" className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 border-2 border-rule hover:border-ink transition-colors" style={{ color: CENTER_COLOR_MAP.accountability.hex }}>
                    <FileText size={12} /> Laws & Policy
                  </a>
                  <a href="#whos-responsible" className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 border-2 border-rule hover:border-ink transition-colors" style={{ color: '#6b21a8' }}>
                    <Shield size={12} /> Who&rsquo;s Responsible
                  </a>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ─── CHAPTER 1: Explore ─── */}
        {activity.centers.learning && cc.learning && cc.learning.length > 0 && (
          <div id="explore">
            <Chapter
              icon={<BookOpen size={20} />}
              label="Explore"
              color={CENTER_COLOR_MAP.learning.hex}
              question="How can I understand this issue?"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                {cc.learning.map((item, i) => (
                  <ObjectCard
                    key={i}
                    icon={<BookOpen size={16} />}
                    title={item.title}
                    description={item.description}
                    color={CENTER_COLOR_MAP.learning.hex}
                  />
                ))}
              </div>
            </Chapter>
          </div>
        )}

        {/* ─── CHAPTER 2: Take Action ─── */}
        {(cc.resource || cc.action) && (
          <div id="take-action">
            <Chapter
              icon={<Heart size={20} />}
              label="Take Action"
              color={CENTER_COLOR_MAP.action.hex}
              question="What can I do right now?"
            >
              <div className="space-y-6">
                {/* Resources */}
                {cc.resource && cc.resource.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-resource mb-3">
                      Resources Available
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {cc.resource.map((item, i) => (
                        <ObjectCard
                          key={i}
                          icon={<MapPin size={16} />}
                          title={item.title}
                          meta={item.org}
                          color={CENTER_COLOR_MAP.resource.hex}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                {cc.action && cc.action.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-action mb-3">
                      Ways to Participate
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {cc.action.map((item, i) => {
                        const iconMap = {
                          volunteer: <Sparkles size={16} />,
                          event: <Calendar size={16} />,
                          service: <Compass size={16} />,
                        }
                        return (
                          <ObjectCard
                            key={i}
                            icon={iconMap[item.type]}
                            title={item.title}
                            description={item.description}
                            meta={item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                            color={CENTER_COLOR_MAP.action.hex}
                          />
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            </Chapter>
          </div>
        )}

        {/* ─── CHAPTER 3: Laws & Policy ─── */}
        {activity.centers.accountability && cc.accountability && cc.accountability.length > 0 && (
          <div id="laws-policy">
            <Chapter
              icon={<FileText size={20} />}
              label="Laws & Policy"
              color={CENTER_COLOR_MAP.accountability.hex}
              question="What are the rules that shape this?"
            >
              <div className="bg-white border-2 border-rule p-6">
                <p className="text-sm text-muted leading-relaxed">
                  Policy information for this area is being compiled. Check back soon for relevant
                  legislation, ordinances, and regulations that affect this issue.
                </p>
              </div>
            </Chapter>
          </div>
        )}

        {/* ─── CHAPTER 4: Who's Responsible ─── */}
        {activity.centers.accountability && cc.accountability && cc.accountability.length > 0 && (
          <div id="whos-responsible">
            <Chapter
              icon={<Shield size={20} />}
              label="Who's Responsible"
              color="#6b21a8"
              question="Who makes decisions about this?"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                {cc.accountability.map((item, i) => (
                  <ObjectCard
                    key={i}
                    icon={<Users size={16} />}
                    title={item.title}
                    meta={`${item.level} · ${item.role}`}
                    color="#6b21a8"
                  />
                ))}
              </div>
            </Chapter>
          </div>
        )}

        {/* ─── Continue Your Journey ─── */}
        <section className="bg-white border-t-2 border-rule">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <h2 className="font-display text-xl font-bold text-ink mb-2">
              Continue Your Journey
            </h2>
            <p className="text-sm text-muted mb-6">
              Explore more in the {pathway.name} pathway, or try a different direction.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SAMPLE_ACTIVITIES
                .filter((a) => a.id !== activity.id && a.pathway === activity.pathway)
                .slice(0, 3)
                .map((related) => {
                  const relColors = PATHWAY_COLOR_MAP[related.pathway]
                  return (
                    <Link
                      key={related.id}
                      href={`/activities/${related.id}`}
                      className={`bg-paper border-2 border-rule ${relColors.borderTop} border-t-4 p-5 hover:shadow-card-hover transition-shadow group`}
                    >
                      <h3 className="text-sm font-bold text-ink group-hover:underline leading-snug">
                        {related.title}
                      </h3>
                      <p className="text-xs text-faint mt-1">{related.org}</p>
                    </Link>
                  )
                })}
              {/* If no same-pathway activities, show cross-pathway */}
              {SAMPLE_ACTIVITIES.filter((a) => a.id !== activity.id && a.pathway === activity.pathway).length === 0 &&
                SAMPLE_ACTIVITIES
                  .filter((a) => a.id !== activity.id)
                  .slice(0, 3)
                  .map((related) => {
                    const relColors = PATHWAY_COLOR_MAP[related.pathway]
                    return (
                      <Link
                        key={related.id}
                        href={`/activities/${related.id}`}
                        className={`bg-paper border-2 border-rule ${relColors.borderTop} border-t-4 p-5 hover:shadow-card-hover transition-shadow group`}
                      >
                        <h3 className="text-sm font-bold text-ink group-hover:underline leading-snug">
                          {related.title}
                        </h3>
                        <p className="text-xs text-faint mt-1">{related.org}</p>
                      </Link>
                    )
                  })}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
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
