import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Compass,
  Heart,
  Scale,
  Search,
  MapPin,
  Heart as HeartIcon,
  GraduationCap,
  Home,
  Megaphone,
  DollarSign,
  Leaf,
  Globe,
} from 'lucide-react'
import {
  PATHWAYS,
  PATHWAY_COLOR_MAP,
  CENTER_COLOR_MAP,
} from '@/lib/sample-data'
import type { Activity } from '@/lib/sample-data'
import { getAvailableResources } from '@/lib/available-resources'
import Wayfinder from '@/components/Wayfinder'

export const dynamic = 'force-dynamic'

const PATHWAY_ICONS: Record<string, React.ReactNode> = {
  health: <HeartIcon className="w-4 h-4" />,
  families: <GraduationCap className="w-4 h-4" />,
  hood: <Home className="w-4 h-4" />,
  voice: <Megaphone className="w-4 h-4" />,
  money: <DollarSign className="w-4 h-4" />,
  planet: <Leaf className="w-4 h-4" />,
  bigger: <Globe className="w-4 h-4" />,
}

const CENTER_ICONS: Record<string, React.ReactNode> = {
  learning: <BookOpen size={14} />,
  resource: <Compass size={14} />,
  action: <Heart size={14} />,
  accountability: <Scale size={14} />,
}

const CENTER_NAMES: Record<string, string> = {
  learning: 'Explore',
  resource: 'Resources',
  action: 'Action',
  accountability: 'Accountability',
}

function ResourceCard({ resource }: { resource: Activity }) {
  const pathway = PATHWAYS.find(p => p.id === resource.pathway)!
  const colors = PATHWAY_COLOR_MAP[resource.pathway]
  const centerCount = Object.values(resource.centers).filter(Boolean).length

  return (
    <Link
      href={`/available-resources/${resource.id}`}
      className={`bg-white border-2 border-rule ${colors.borderTop} border-t-4 shadow-card hover:shadow-card-hover transition-all flex flex-col group`}
    >
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs font-bold uppercase tracking-wider ${colors.text}`}>
            {pathway.name}
          </span>
        </div>
        <h2 className="font-display text-base font-bold text-ink mb-1 group-hover:underline leading-snug">
          {resource.title}
        </h2>
        <p className="text-xs text-faint mb-1">{resource.org}</p>
        <p className="text-[10px] text-faint mb-2">
          <MapPin size={10} className="inline mr-0.5" />
          {resource.location.city}, {resource.location.county} County
        </p>
        <div className="flex items-center gap-2 mb-2">
          <Wayfinder centers={resource.centers} />
          <span className="text-[10px] text-faint">{centerCount} of 4 centers</span>
        </div>
        <p className="text-xs text-muted leading-relaxed mb-3 flex-1 line-clamp-3">
          {resource.description}
        </p>
        <span className={`inline-flex items-center gap-1 text-xs font-bold ${colors.text}`}>
          Start this journey <ArrowRight size={12} />
        </span>
      </div>
    </Link>
  )
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; center?: string; pathway?: string; county?: string }>
}) {
  const params = await searchParams
  const query = params.q || ''
  const center = params.center || undefined
  const pathway = params.pathway || undefined
  const county = params.county || undefined

  // Fetch all available resources
  let resources = await getAvailableResources(pathway)

  // Filter by text query
  if (query) {
    const q = query.toLowerCase()
    resources = resources.filter(r =>
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.org.toLowerCase().includes(q) ||
      r.location.city.toLowerCase().includes(q) ||
      r.location.county.toLowerCase().includes(q) ||
      r.location.address.toLowerCase().includes(q)
    )
  }

  // Filter by center
  if (center) {
    resources = resources.filter(r => {
      if (center === 'learning') return r.centers.learning
      if (center === 'resource') return r.centers.resource
      if (center === 'action') return r.centers.action
      if (center === 'accountability') return r.centers.accountability
      return true
    })
  }

  // Filter by county
  if (county) {
    resources = resources.filter(r => r.location.county.toLowerCase() === county.toLowerCase())
  }

  // Build heading
  const parts: string[] = []
  if (query) parts.push(`"${query}"`)
  if (pathway) {
    const p = PATHWAYS.find(pw => pw.id === pathway)
    if (p) parts.push(p.name)
  }
  if (center) parts.push(CENTER_NAMES[center] || center)
  if (county) parts.push(`${county} County`)
  const heading = parts.length > 0 ? parts.join(' · ') : 'Search All Resources'

  // Get unique counties for filter
  const allResources = await getAvailableResources()
  const counties = Array.from(new Set(allResources.map(r => r.location.county))).sort()

  // Build query string helper
  function buildUrl(overrides: Record<string, string | undefined>) {
    const p = new URLSearchParams()
    const merged = { q: query || undefined, center, pathway, county, ...overrides }
    for (const [k, v] of Object.entries(merged)) {
      if (v) p.set(k, v)
    }
    const qs = p.toString()
    return qs ? `/search?${qs}` : '/search'
  }

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <header className="bg-white border-b-2 border-ink shadow-header px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-bold tracking-tight text-ink">
            Community Exchange
          </Link>
          <nav className="flex gap-6 text-sm font-medium text-muted">
            <Link href="/available-resources" className="hover:text-ink transition-colors">Available Resources</Link>
            <Link href="/search" className="hover:text-ink transition-colors font-bold text-ink">Search</Link>
            <Link href="/about" className="hover:text-ink transition-colors">How It Works</Link>
            <Link href="/login" className="hover:text-ink transition-colors">Sign In</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Search Header */}
        <section className="bg-white border-b-2 border-rule px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-muted hover:text-ink transition-colors mb-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </Link>

            {/* Search Input */}
            <form action="/search" method="GET" className="mb-4">
              <div className="flex gap-2 max-w-xl">
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
                  <input
                    type="text"
                    name="q"
                    defaultValue={query}
                    placeholder="Search resources, organizations, neighborhoods..."
                    className="w-full pl-10 pr-4 py-2.5 border-2 border-rule focus:border-ink text-sm outline-none transition-colors bg-paper"
                  />
                </div>
                {/* Preserve active filters */}
                {pathway && <input type="hidden" name="pathway" value={pathway} />}
                {center && <input type="hidden" name="center" value={center} />}
                {county && <input type="hidden" name="county" value={county} />}
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-ink text-white text-sm font-bold hover:bg-ink/90 transition-colors"
                >
                  Search
                </button>
              </div>
            </form>

            <h1 className="font-display text-xl font-bold text-ink">
              {heading}
            </h1>
            <p className="text-sm text-muted mt-1">
              {resources.length} result{resources.length !== 1 ? 's' : ''}
            </p>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="bg-white border-b border-rule px-6 py-4 sticky top-0 z-20 shadow-header">
          <div className="max-w-6xl mx-auto space-y-3">
            {/* Pathway filters */}
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-bold text-faint uppercase tracking-wider py-1.5">Pathway:</span>
              <Link
                href={buildUrl({ pathway: undefined })}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider border-2 transition-colors ${
                  !pathway ? 'bg-ink text-white border-ink' : 'bg-white text-muted border-rule hover:border-ink'
                }`}
              >
                All
              </Link>
              {PATHWAYS.map(p => {
                const colors = PATHWAY_COLOR_MAP[p.id]
                const isActive = pathway === p.id
                return (
                  <Link
                    key={p.id}
                    href={buildUrl({ pathway: p.id })}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold uppercase tracking-wider border-2 transition-colors ${
                      isActive
                        ? 'bg-ink text-white border-ink'
                        : `bg-white ${colors.text} border-rule hover:border-ink`
                    }`}
                  >
                    {PATHWAY_ICONS[p.id]} {p.name}
                  </Link>
                )
              })}
            </div>

            {/* Center filters */}
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-bold text-faint uppercase tracking-wider py-1.5">Center:</span>
              <Link
                href={buildUrl({ center: undefined })}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider border-2 transition-colors ${
                  !center ? 'bg-ink text-white border-ink' : 'bg-white text-muted border-rule hover:border-ink'
                }`}
              >
                All
              </Link>
              {(['learning', 'resource', 'action', 'accountability'] as const).map(c => {
                const cc = CENTER_COLOR_MAP[c]
                const isActive = center === c
                return (
                  <Link
                    key={c}
                    href={buildUrl({ center: c })}
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

            {/* County filters */}
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-bold text-faint uppercase tracking-wider py-1.5">County:</span>
              <Link
                href={buildUrl({ county: undefined })}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider border-2 transition-colors ${
                  !county ? 'bg-ink text-white border-ink' : 'bg-white text-muted border-rule hover:border-ink'
                }`}
              >
                All
              </Link>
              {counties.map(c => (
                <Link
                  key={c}
                  href={buildUrl({ county: c })}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider border-2 transition-colors ${
                    county === c ? 'bg-ink text-white border-ink' : 'bg-white text-muted border-rule hover:border-ink'
                  }`}
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="px-6 py-10">
          <div className="max-w-6xl mx-auto">
            {resources.length === 0 ? (
              <div className="text-center py-20">
                <Search size={32} className="mx-auto text-faint mb-4" />
                <p className="text-muted text-lg mb-2">No results found</p>
                <p className="text-sm text-faint">
                  Try a different search term or adjust the filters above.
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map(resource => (
                  <ResourceCard key={resource.id} resource={resource} />
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
            <Link href="/available-resources" className="hover:text-white transition-colors">Available Resources</Link>
            <Link href="/about" className="hover:text-white transition-colors">How It Works</Link>
            <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
