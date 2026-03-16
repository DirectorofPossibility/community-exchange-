import Link from 'next/link'
import {
  ArrowLeft,
  BookOpen,
  Compass,
  Heart,
  Scale,
  ExternalLink,
  Globe,
  Tag,
} from 'lucide-react'
import {
  PATHWAYS,
  PATHWAY_COLOR_MAP,
  CENTER_COLOR_MAP,
} from '@/lib/sample-data'
import { getContentById, getRelatedContent, getChildContent } from '@/lib/db'
import { notFound } from 'next/navigation'

const CENTER_META: Record<string, { label: string; icon: React.ReactNode; question: string }> = {
  learning: { label: 'Explore', icon: <BookOpen size={20} />, question: 'How can I understand this issue?' },
  resource: { label: 'Resource', icon: <Compass size={20} />, question: "What's available to me?" },
  action: { label: 'Take Action', icon: <Heart size={20} />, question: 'How can I help?' },
  accountability: { label: 'Accountability', icon: <Scale size={20} />, question: 'Who makes decisions about this?' },
}

export default async function ContentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const item = await getContentById(id)
  if (!item) notFound()

  const [related, children] = await Promise.all([
    getRelatedContent(id, item.pathway, item.center),
    getChildContent(id),
  ])

  const pathway = item.pathway ? PATHWAYS.find(p => p.id === item.pathway) : null
  const colors = item.pathway ? PATHWAY_COLOR_MAP[item.pathway] : null
  const centerMeta = CENTER_META[item.center] || CENTER_META.learning
  const centerColor = CENTER_COLOR_MAP[item.center as keyof typeof CENTER_COLOR_MAP]

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
        <section className={`${colors?.borderTop || ''} border-t-4 bg-white border-b-2 border-rule`}>
          <div className="max-w-4xl mx-auto px-6 py-10">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-muted hover:text-ink transition-colors mb-6"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </Link>

            {/* Center + Pathway badges */}
            <div className="flex items-center gap-3 mb-3">
              {centerColor && (
                <Link
                  href={`/search?center=${item.center}`}
                  className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm hover:opacity-80 transition-opacity"
                  style={{ color: centerColor.hex, background: centerColor.hex + '14' }}
                >
                  {centerMeta.icon && <span className="w-3 h-3">{CENTER_META[item.center]?.icon}</span>}
                  {centerMeta.label}
                </Link>
              )}
              {pathway && colors && (
                <Link
                  href={`/activities?pathway=${item.pathway}`}
                  className={`text-xs font-bold uppercase tracking-wider ${colors.text} hover:underline`}
                >
                  {pathway.name}
                </Link>
              )}
            </div>

            <h1 className="font-display text-3xl md:text-4xl font-bold text-ink mb-3 leading-tight">
              {item.title}
            </h1>

            <p className="text-sm text-faint mb-4">
              {item.org_name}
              {item.content_type && (
                <> &middot; {item.content_type.replace(/_/g, ' ')}</>
              )}
            </p>

            {item.description && (
              <p className="text-muted leading-relaxed max-w-2xl mb-6">
                {item.description}
              </p>
            )}

            {/* Action bar */}
            <div className="flex flex-wrap gap-3">
              <a
                href={item.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-ink text-white text-sm font-bold hover:bg-ink/90 transition-colors"
              >
                <ExternalLink size={14} /> Visit Source
              </a>
              {item.action_items?.donate_url && (
                <a
                  href={item.action_items.donate_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border-2 border-action text-action text-sm font-bold hover:bg-action/5 transition-colors"
                >
                  <Heart size={14} /> Donate
                </a>
              )}
              {item.action_items?.volunteer_url && (
                <a
                  href={item.action_items.volunteer_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border-2 border-action text-action text-sm font-bold hover:bg-action/5 transition-colors"
                >
                  <Heart size={14} /> Volunteer
                </a>
              )}
              {item.action_items?.register_url && (
                <a
                  href={item.action_items.register_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border-2 border-resource text-resource text-sm font-bold hover:bg-resource/5 transition-colors"
                >
                  <Globe size={14} /> Register
                </a>
              )}
            </div>
          </div>
        </section>

        {/* ─── Keywords ─── */}
        {item.keywords.length > 0 && (
          <section className="bg-white border-b border-rule px-6 py-4">
            <div className="max-w-4xl mx-auto flex flex-wrap items-center gap-2">
              <Tag size={12} className="text-faint" />
              {item.keywords.map((kw, i) => (
                <Link
                  key={i}
                  href={`/search?q=${encodeURIComponent(kw)}`}
                  className="text-xs text-muted bg-paper px-2 py-0.5 border border-rule hover:border-ink hover:text-ink transition-colors"
                >
                  {kw}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ─── Child Items (for multi-resource pages) ─── */}
        {children.length > 0 && (
          <section className="border-t-2 border-rule">
            <div className="max-w-4xl mx-auto px-6 py-12">
              <h2 className="font-display text-xl font-bold text-ink mb-2">
                Resources ({children.length})
              </h2>
              <p className="text-sm text-faint mb-6">
                Individual resources extracted from this page
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {children.map((child) => (
                  <a
                    key={child.id}
                    href={child.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white border-2 border-rule hover:border-ink transition-colors p-5 group"
                  >
                    <h3 className="text-sm font-bold text-ink group-hover:underline leading-snug">
                      {child.title}
                    </h3>
                    {child.description && (
                      <p className="text-xs text-muted mt-1.5 line-clamp-2">{child.description}</p>
                    )}
                    <span className="inline-flex items-center gap-1 text-xs text-faint mt-2">
                      <ExternalLink size={10} /> {child.source_domain}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── Related Content ─── */}
        {related.length > 0 && (
          <section className="bg-white border-t-2 border-rule">
            <div className="max-w-4xl mx-auto px-6 py-12">
              <h2 className="font-display text-xl font-bold text-ink mb-2">
                Related Content
              </h2>
              <p className="text-sm text-muted mb-6">
                More {pathway ? `in ${pathway.name}` : 'to explore'}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map((rel) => {
                  const relPathway = rel.pathway ? PATHWAYS.find(p => p.id === rel.pathway) : null
                  const relColors = rel.pathway ? PATHWAY_COLOR_MAP[rel.pathway] : null
                  return (
                    <Link
                      key={rel.id}
                      href={`/content/${rel.id}`}
                      className={`bg-paper border-2 border-rule ${relColors?.borderTop || ''} border-t-4 p-5 hover:shadow-card-hover transition-shadow group`}
                    >
                      {relPathway && relColors && (
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${relColors.text}`}>
                          {relPathway.name}
                        </span>
                      )}
                      <h3 className="text-sm font-bold text-ink group-hover:underline leading-snug mt-1">
                        {rel.title}
                      </h3>
                      <p className="text-xs text-faint mt-1">{rel.org_name}</p>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        )}
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
