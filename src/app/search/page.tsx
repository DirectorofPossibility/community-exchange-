import Link from 'next/link'
import {
  ArrowLeft,
  ExternalLink,
  BookOpen,
  Compass,
  Heart,
  Scale,
  Search,
} from 'lucide-react'
import {
  PATHWAYS,
  PATHWAY_COLOR_MAP,
  CENTER_COLOR_MAP,
} from '@/lib/sample-data'
import { getContent, type ContentItem } from '@/lib/db'

export const dynamic = 'force-dynamic'

const CENTER_ICONS: Record<string, React.ReactNode> = {
  learning: <BookOpen size={14} />,
  resource: <Compass size={14} />,
  action: <Heart size={14} />,
  accountability: <Scale size={14} />,
}

const CENTER_NAMES: Record<string, string> = {
  learning: 'Library',
  resource: 'Resources',
  action: 'Action',
  accountability: 'Accountability',
}

function ContentCard({ item }: { item: ContentItem }) {
  const pathway = item.pathway ? PATHWAYS.find(p => p.id === item.pathway) : null
  const colors = item.pathway ? PATHWAY_COLOR_MAP[item.pathway] : null
  const centerColor = CENTER_COLOR_MAP[item.center as keyof typeof CENTER_COLOR_MAP]

  return (
    <Link
      href={`/content/${item.id}`}
      className={`bg-white border-2 border-rule ${colors?.borderTop || ''} border-t-4 shadow-card hover:shadow-card-hover transition-all flex flex-col group`}
    >
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          {pathway && colors && (
            <span className={`text-xs font-bold uppercase tracking-wider ${colors.text}`}>
              {pathway.name}
            </span>
          )}
          {centerColor && (
            <span
              className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm ml-auto"
              style={{ color: centerColor.hex, background: centerColor.hex + '14' }}
            >
              {CENTER_ICONS[item.center]}
              {item.center}
            </span>
          )}
        </div>
        <h2 className="font-display text-base font-bold text-ink mb-1 group-hover:underline leading-snug">
          {item.title}
        </h2>
        <p className="text-xs text-faint mb-2">{item.org_name}</p>
        {item.description && (
          <p className="text-sm text-muted leading-relaxed mb-3 flex-1 line-clamp-3">
            {item.description}
          </p>
        )}
        <div className="flex items-center justify-between mt-auto">
          <span className="inline-flex items-center gap-1 text-xs text-faint">
            <ExternalLink size={10} />
            {item.content_type?.replace(/_/g, ' ') || 'content'}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; center?: string; pathway?: string }>
}) {
  const params = await searchParams
  const query = params.q || ''
  const center = params.center || undefined
  const pathway = params.pathway || undefined

  // Fetch all content, then filter by query string
  let items = await getContent({ limit: 50, center, pathway })

  if (query) {
    const q = query.toLowerCase()
    items = items.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.org_name.toLowerCase().includes(q) ||
      item.keywords.some(kw => kw.toLowerCase().includes(q))
    )
  }

  const heading = query
    ? `Results for "${query}"`
    : center
      ? `${CENTER_NAMES[center] || center} Content`
      : pathway
        ? `${PATHWAYS.find(p => p.id === pathway)?.name || pathway} Content`
        : 'All Content'

  return (
    <div className="min-h-screen flex flex-col bg-paper">
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
        <section className="bg-white border-b-2 border-rule px-6 py-10">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-muted hover:text-ink transition-colors mb-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <Search size={20} className="text-faint" />
              <h1 className="font-display text-headline font-bold text-ink">
                {heading}
              </h1>
            </div>
            <p className="text-muted">
              {items.length} result{items.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </section>

        {/* Filter pills */}
        <section className="bg-white border-b border-rule px-6 py-4">
          <div className="max-w-6xl mx-auto flex flex-wrap gap-2">
            <Link
              href={query ? `/search?q=${encodeURIComponent(query)}` : '/search'}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider border-2 transition-colors ${
                !center ? 'bg-ink text-white border-ink' : 'bg-white text-muted border-rule hover:border-ink'
              }`}
            >
              All
            </Link>
            {(['resource', 'action', 'learning', 'accountability'] as const).map(c => {
              const cc = CENTER_COLOR_MAP[c]
              const isActive = center === c
              return (
                <Link
                  key={c}
                  href={query ? `/search?q=${encodeURIComponent(query)}&center=${c}` : `/search?center=${c}`}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold uppercase tracking-wider border-2 transition-colors ${
                    isActive ? 'text-white border-ink' : 'bg-white border-rule hover:border-ink'
                  }`}
                  style={isActive ? { background: cc.hex, borderColor: cc.hex } : { color: cc.hex }}
                >
                  {CENTER_ICONS[c]} {CENTER_NAMES[c]}
                </Link>
              )
            })}
          </div>
        </section>

        <section className="px-6 py-10">
          <div className="max-w-6xl mx-auto">
            {items.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted text-lg">No content found. Try a different search.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map(item => (
                  <ContentCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

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
