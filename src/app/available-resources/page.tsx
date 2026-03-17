'use client'
// src/app/available-resources/page.tsx
//
// Design philosophy:
// ─ Julia Minson: receptive language, curiosity first, no deficit labels
// ─ Asset-based: every label describes a goal, never a lack
// ─ Progressive disclosure: one question at a time, no overwhelm
// ─ Warm, consistent, kind — every empty state is encouraging

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Phone, Globe, MapPin, ChevronDown, ChevronUp, ArrowLeft, Search, X, Sparkles } from 'lucide-react'

// ── Taxonomy — goals not deficits ─────────────────────────────
const PATHWAYS = [
  {
    id: 'food',
    label: 'Feeding Your\nFamily Well',
    shortLabel: 'Food & Meals',
    emoji: '🥗',
    color: '#B45309',
    bg: '#FFFBEB',
    border: '#FDE68A',
    // Minson: acknowledge before directing
    prompt: 'Whether you\'re stretching a budget, stocking a pantry, or helping a neighbor — here\'s what\'s available in Houston.',
    assetLabel: 'places with food and meals',
    tags: ['food','hunger','pantry','snap','meal'],
  },
  {
    id: 'housing',
    label: 'Finding a Place\nto Call Home',
    shortLabel: 'Housing',
    emoji: '🏠',
    color: '#1D4ED8',
    bg: '#EFF6FF',
    border: '#BFDBFE',
    prompt: 'From emergency shelter to buying a home — every step toward stability is worth taking.',
    assetLabel: 'places that help with housing',
    tags: ['housing','shelter','homeless','rent','eviction'],
  },
  {
    id: 'health',
    label: 'Taking Care of\nYour Health',
    shortLabel: 'Health',
    emoji: '💚',
    color: '#047857',
    bg: '#ECFDF5',
    border: '#A7F3D0',
    prompt: 'Clinics, counseling, dental care, and more. You deserve to feel well.',
    assetLabel: 'places that support health',
    tags: ['health','medical','mental','dental','clinic','wellness'],
  },
  {
    id: 'jobs',
    label: 'Building\nYour Future',
    shortLabel: 'Jobs & Income',
    emoji: '🌱',
    color: '#6D28D9',
    bg: '#F5F3FF',
    border: '#DDD6FE',
    prompt: 'Skills, opportunities, and support — wherever you are in your work life.',
    assetLabel: 'places that support work and income',
    tags: ['job','employ','work','career','income','training'],
  },
  {
    id: 'education',
    label: 'Growing\nYour Skills',
    shortLabel: 'Education',
    emoji: '📚',
    color: '#BE185D',
    bg: '#FDF2F8',
    border: '#FBCFE8',
    prompt: 'From early learning to adult education — every new skill opens a door.',
    assetLabel: 'places that support learning',
    tags: ['education','school','literacy','tutor','learn','skill'],
  },
  {
    id: 'family',
    label: 'Supporting\nYour Family',
    shortLabel: 'Family',
    emoji: '👨‍👩‍👧',
    color: '#C2410C',
    bg: '#FFF7ED',
    border: '#FED7AA',
    prompt: 'Childcare, parenting support, youth programs — strong families build strong communities.',
    assetLabel: 'places that support families',
    tags: ['child','family','youth','foster','parent','kid'],
  },
  {
    id: 'community',
    label: 'Getting\nConnected',
    shortLabel: 'Community',
    emoji: '🤝',
    color: '#0E7490',
    bg: '#ECFEFF',
    border: '#A5F3FC',
    prompt: 'Volunteer, advocate, or simply belong — Houston is stronger when we show up for each other.',
    assetLabel: 'places to connect and get involved',
    tags: ['community','civic','legal','volunteer','advocacy'],
  },
]

interface Org {
  org_id: string; org_name: string
  summary_6th_grade: string | null; description_full: string | null
  tags: string[] | null; city: string | null; state: string | null
  phone: string | null; website: string | null; is_verified: string | null
  latitude: number | null; longitude: number | null
}

// ════════════════════════════════════════════════════════════
// Resource Card — asset framing, progressive reveal
// Minson: validate before directing, agency over charity
// ════════════════════════════════════════════════════════════
function ResourceCard({ org, pathway }: { org: Org; pathway: typeof PATHWAYS[0] | null }) {
  const [expanded, setExpanded] = useState(false)
  const color  = pathway?.color  || '#1B4332'
  const bg     = pathway?.bg     || '#E8F0E9'
  const border = pathway?.border || '#C6D9C8'

  const description = org.summary_6th_grade || org.description_full || ''

  return (
    <div style={{
      background: 'white',
      border: expanded ? `2px solid ${color}` : '1.5px solid #EAE4DB',
      borderRadius: 18,
      overflow: 'hidden',
      transition: 'all 0.22s ease',
      boxShadow: expanded ? `0 6px 28px ${color}1A` : '0 1px 3px rgba(0,0,0,0.05)',
    }}>
      {/* ── Always visible: name + one warm sentence ── */}
      <button
        onClick={() => setExpanded(e => !e)}
        style={{ width: '100%', padding: '18px 20px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'flex-start', gap: 14 }}
        aria-expanded={expanded}
      >
        {/* Monogram avatar */}
        <div style={{
          width: 46, height: 46, borderRadius: 12,
          background: expanded ? color : bg,
          color: expanded ? 'white' : color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 800, fontSize: '1.15rem', flexShrink: 0,
          transition: 'all 0.22s ease',
          fontFamily: 'var(--font-display)',
        }}>
          {org.org_name.charAt(0)}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6, marginBottom: 5 }}>
            <span style={{ fontWeight: 700, color: '#1B2E1F', fontSize: '1rem', lineHeight: 1.25, fontFamily: 'var(--font-display)' }}>
              {org.org_name}
            </span>
            {org.is_verified === 'true' && (
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#047857', background: '#ECFDF5', padding: '2px 8px', borderRadius: 20, letterSpacing: '0.02em', flexShrink: 0 }}>
                ✓ verified
              </span>
            )}
          </div>

          {/* One warm sentence — asset framing */}
          <p style={{ fontSize: '0.875rem', color: '#6B6560', lineHeight: 1.55, margin: 0 }}>
            {description.slice(0, 110)}{description.length > 110 ? '…' : ''}
          </p>

          {/* Location — subtle */}
          {org.city && (
            <p style={{ fontSize: '0.75rem', color: color, marginTop: 7, display: 'flex', alignItems: 'center', gap: 4, opacity: 0.85 }}>
              <MapPin size={11} strokeWidth={2.5} />
              {org.city}{org.state ? `, ${org.state}` : ''}
            </p>
          )}
        </div>

        <span style={{ color: '#C5C0B8', marginTop: 4, flexShrink: 0, transition: 'transform 0.2s' }}>
          {expanded ? <ChevronUp size={17} strokeWidth={2} /> : <ChevronDown size={17} strokeWidth={2} />}
        </span>
      </button>

      {/* ── Progressive reveal: full description + actions ── */}
      {expanded && (
        <div style={{ padding: '4px 20px 20px', borderTop: `1.5px solid ${border}` }}>

          {/* Full description */}
          {description.length > 110 && (
            <p style={{ fontSize: '0.9rem', color: '#374151', lineHeight: 1.7, margin: '14px 0 16px' }}>
              {description}
            </p>
          )}

          {/* Tags as strengths — what this org OFFERS */}
          {org.tags && org.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
              {org.tags.slice(0, 5).map(tag => (
                <span key={tag} style={{
                  fontSize: '0.75rem', fontWeight: 500,
                  color: color, background: bg,
                  padding: '3px 10px', borderRadius: 20,
                  fontFamily: 'var(--font-mono)',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Action buttons — clear, large, one tap */}
          {/* Minson: don't make people work for the next step */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {org.phone && (
              <a href={`tel:${org.phone}`} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '11px 20px', background: color, color: 'white',
                borderRadius: 12, textDecoration: 'none',
                fontSize: '0.875rem', fontWeight: 700,
                letterSpacing: '0.01em',
              }}>
                <Phone size={15} strokeWidth={2.5} /> Call Now
              </a>
            )}
            {org.website && (
              <a href={org.website} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '11px 20px', background: 'white', color: color,
                border: `2px solid ${color}`, borderRadius: 12,
                textDecoration: 'none', fontSize: '0.875rem', fontWeight: 700,
              }}>
                <Globe size={15} strokeWidth={2.5} /> Visit Website
              </a>
            )}
            {org.latitude && org.longitude && (
              <a href={`https://maps.google.com/?q=${org.latitude},${org.longitude}`}
                target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '11px 20px', background: '#F9F6F1', color: '#6B6560',
                  border: '1.5px solid #EAE4DB', borderRadius: 12,
                  textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600,
                }}>
                <MapPin size={15} strokeWidth={2.5} /> Get Directions
              </a>
            )}
          </div>

          {/* Phone displayed as monospace — easy to read aloud */}
          {org.phone && (
            <p style={{ fontSize: '0.82rem', color: '#9CA3AF', marginTop: 12, fontFamily: 'var(--font-mono)' }}>
              {org.phone}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

// ════════════════════════════════════════════════════════════
// MAIN PAGE
// ════════════════════════════════════════════════════════════
export default function AvailableResourcesPage() {
  // State machine: layer 0 = welcome, layer 1 = browsing
  const [activePathway, setActivePathway]     = useState<string | null>(null)
  const [activeCounty,  setActiveCounty]      = useState('all')
  const [textFilter,    setTextFilter]        = useState('')
  const [orgs,          setOrgs]              = useState<Org[]>([])
  const [counties,      setCounties]          = useState<string[]>([])
  const [counts,        setCounts]            = useState<Record<string, number>>({})
  const [loading,       setLoading]           = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Fetch counts + counties on mount
  useEffect(() => {
    fetch('/api/counts').then(r => r.json()).then(setCounts).catch(() => {})
    fetch('/api/counties').then(r => r.json()).then(setCounties).catch(() => {})
  }, [])

  // Fetch orgs when pathway/county changes
  useEffect(() => {
    if (!activePathway) { setOrgs([]); return }
    setLoading(true)
    const p = new URLSearchParams()
    if (activePathway !== 'all') p.set('pathway', activePathway)
    if (activeCounty !== 'all') p.set('county', activeCounty)
    fetch(`/api/resources?${p}`)
      .then(r => r.json())
      .then(d => { setOrgs(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [activePathway, activeCounty])

  // Scroll to results on pathway select (mobile)
  useEffect(() => {
    if (activePathway && resultsRef.current) {
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300)
    }
  }, [activePathway])

  const activePW = activePathway ? PATHWAYS.find(p => p.id === activePathway) ?? null : null

  // Client text filter
  const filtered = orgs.filter(org => {
    if (!textFilter.trim()) return true
    const q = textFilter.toLowerCase()
    return (
      org.org_name.toLowerCase().includes(q) ||
      (org.summary_6th_grade || '').toLowerCase().includes(q) ||
      (org.description_full || '').toLowerCase().includes(q) ||
      (org.tags || []).some(t => t.toLowerCase().includes(q))
    )
  })

  return (
    <div style={{ minHeight: '100vh', background: '#FAF8F4', fontFamily: 'var(--font-display)' }}>

      {/* ── Nav ─────────────────────────────────────────────── */}
      <header style={{ background: '#1B4332', borderBottom: '3px solid #D4A853', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <span style={{ fontSize: 22 }}>🌱</span>
            <span style={{ fontWeight: 700, color: 'white', fontSize: '1.1rem' }}>CommonGround</span>
          </Link>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Link href="/available-resources" style={{ padding: '6px 14px', borderRadius: 8, fontSize: '0.875rem', fontWeight: 600, color: '#D4A853', textDecoration: 'none', background: 'rgba(212,168,83,0.12)' }}>Resources</Link>
            <Link href="/search" style={{ padding: '6px 14px', borderRadius: 8, fontSize: '0.875rem', color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>Search</Link>
            <Link href="/login" style={{ marginLeft: 4, padding: '6px 16px', borderRadius: 8, fontSize: '0.875rem', fontWeight: 700, color: '#1B4332', background: '#D4A853', textDecoration: 'none' }}>Sign In</Link>
          </nav>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════
          LAYER 0 — Welcome header
          Minson: open with curiosity, not categorization
      ════════════════════════════════════════════════════ */}
      <section style={{ background: '#1B4332', padding: activePathway ? '28px 24px 24px' : '52px 24px 44px', transition: 'padding 0.4s ease' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {!activePathway ? (
            /* Welcome state — one open question, no walls */
            <div style={{ maxWidth: 600, marginBottom: 40 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <Sparkles size={16} style={{ color: '#D4A853' }} />
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#D4A853', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Greater Houston
                </span>
              </div>
              {/* Asset-based, Minson-informed: curiosity not deficit */}
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: 'white', marginBottom: 14, lineHeight: 1.15 }}>
                What are you looking for?
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.65, maxWidth: 440 }}>
                Choose a category below and we'll show you what's available — no forms, no judgment.
              </p>
            </div>
          ) : (
            /* Browsing state — breadcrumb, shrunk header */
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <button
                onClick={() => { setActivePathway(null); setOrgs([]); setTextFilter('') }}
                style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.55)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem', padding: '4px 0', fontFamily: 'var(--font-display)' }}>
                <ArrowLeft size={14} strokeWidth={2.5} /> All categories
              </button>
              <span style={{ color: 'rgba(255,255,255,0.25)' }}>/</span>
              <span style={{ color: activePW?.color || '#D4A853', fontWeight: 600, fontSize: '0.875rem' }}>
                {activePW?.emoji} {activePW?.shortLabel}
              </span>
            </div>
          )}

          {/* ════════════════════════════════════════════════
              PATHWAY TILES
              Asset labels — goals, never deficits
          ════════════════════════════════════════════════ */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(132px, 1fr))', gap: 10 }}>
            {PATHWAYS.map(pw => {
              const isActive = activePathway === pw.id
              return (
                <button
                  key={pw.id}
                  onClick={() => { setActivePathway(pw.id); setActiveCounty('all'); setTextFilter('') }}
                  style={{
                    padding: '14px 10px 12px',
                    borderRadius: 16,
                    border: isActive ? `2px solid ${pw.color}` : '2px solid transparent',
                    background: isActive ? pw.bg : 'rgba(255,255,255,0.07)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.2s ease',
                    transform: isActive ? 'translateY(-2px)' : 'none',
                    boxShadow: isActive ? `0 4px 20px ${pw.color}33` : 'none',
                  }}
                >
                  <div style={{ fontSize: '1.8rem', marginBottom: 7, lineHeight: 1 }}>{pw.emoji}</div>
                  {/* Goal-framed label, two lines */}
                  <div style={{
                    fontSize: '0.75rem', fontWeight: 700,
                    color: isActive ? pw.color : 'rgba(255,255,255,0.82)',
                    lineHeight: 1.35, whiteSpace: 'pre-line',
                    transition: 'color 0.2s',
                  }}>
                    {pw.label}
                  </div>
                  {/* Count — "47 places" not "47 services" */}
                  {counts[pw.id] !== undefined && (
                    <div style={{
                      fontSize: '0.68rem', marginTop: 6,
                      color: isActive ? pw.color : 'rgba(255,255,255,0.35)',
                      fontFamily: 'var(--font-mono)',
                    }}>
                      {counts[pw.id]} place{counts[pw.id] !== 1 ? 's' : ''}
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          LAYER 1 — Context bar
          Minson: acknowledge before directing
          Appears only after a pathway is chosen
      ════════════════════════════════════════════════════ */}
      {activePathway && activePW && (
        <div style={{ background: activePW.bg, borderBottom: `1.5px solid ${activePW.border}`, animation: 'fadeIn 0.3s ease' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '14px 24px' }}>
            {/* The prompt — warm, receptive, non-assumptive */}
            <p style={{ fontSize: '0.9rem', color: activePW.color, lineHeight: 1.6, maxWidth: 640, fontStyle: 'italic', opacity: 0.85 }}>
              {activePW.prompt}
            </p>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════
          LAYER 2 — Filters (sticky, appear after pathway)
          Light and unobtrusive — don't gate the experience
      ════════════════════════════════════════════════════ */}
      {activePathway && (
        <div style={{ background: 'white', borderBottom: '1px solid #EAE4DB', position: 'sticky', top: 60, zIndex: 30, animation: 'fadeIn 0.25s ease' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '10px 24px', display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>

            {/* Text search */}
            <div style={{ position: 'relative', flex: '1 1 200px', minWidth: 160 }}>
              <Search size={14} strokeWidth={2.5} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
              <input
                type="text"
                value={textFilter}
                onChange={e => setTextFilter(e.target.value)}
                placeholder={`Search ${activePW?.assetLabel || 'resources'}…`}
                style={{ width: '100%', padding: '9px 30px 9px 34px', borderRadius: 10, border: '1.5px solid #EAE4DB', fontSize: '0.875rem', background: '#FAF8F4', outline: 'none', color: '#1B2E1F', fontFamily: 'var(--font-display)' }}
              />
              {textFilter && (
                <button onClick={() => setTextFilter('')} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: 2, display: 'flex' }}>
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Area filter */}
            {counties.length > 1 && (
              <select
                value={activeCounty}
                onChange={e => setActiveCounty(e.target.value)}
                style={{ padding: '9px 14px', borderRadius: 10, border: '1.5px solid #EAE4DB', fontSize: '0.875rem', background: '#FAF8F4', color: '#1B2E1F', cursor: 'pointer', outline: 'none', fontFamily: 'var(--font-display)' }}>
                <option value="all">All areas</option>
                {counties.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            )}

            {/* Count — "47 places" — abundance framing */}
            {!loading && filtered.length > 0 && (
              <span style={{ fontSize: '0.8rem', color: '#9CA3AF', marginLeft: 'auto', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>
                {filtered.length} {activePW?.assetLabel}
              </span>
            )}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════
          LAYER 3 — Results
      ════════════════════════════════════════════════════ */}
      <main ref={resultsRef} style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 24px 80px' }}>

        {/* Pre-selection state */}
        {!activePathway && (
          <div style={{ textAlign: 'center', padding: '72px 20px' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>👆</div>
            <p style={{ color: '#9CA3AF', fontSize: '1rem', lineHeight: 1.6, maxWidth: 340, margin: '0 auto' }}>
              Choose what you're looking for above — we'll show you what's available in Houston.
            </p>
          </div>
        )}

        {/* Loading — warm language */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '72px 20px' }}>
            <div style={{
              width: 38, height: 38,
              border: `3px solid ${activePW?.bg || '#E8F0E9'}`,
              borderTop: `3px solid ${activePW?.color || '#1B4332'}`,
              borderRadius: '50%',
              animation: 'spin 0.75s linear infinite',
              margin: '0 auto 18px',
            }} />
            <p style={{ color: '#9CA3AF', fontSize: '0.9rem' }}>Finding {activePW?.assetLabel}…</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } } @keyframes fadeIn { from { opacity:0 } to { opacity:1 } } @keyframes fadeUp { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:none } }`}</style>
          </div>
        )}

        {/* Results */}
        {!loading && activePathway && (
          <>
            {filtered.length === 0 ? (
              /* Empty state — encouraging, never apologetic */
              <div style={{ textAlign: 'center', padding: '64px 24px', background: 'white', borderRadius: 24, border: '1.5px solid #EAE4DB', maxWidth: 480, margin: '0 auto' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>🌱</div>
                <h3 style={{ color: '#1B2E1F', fontWeight: 700, marginBottom: 10, fontSize: '1.1rem', fontFamily: 'var(--font-display)' }}>
                  {textFilter ? `Nothing matching "${textFilter}" right now` : 'We\'re growing this section'}
                </h3>
                {/* Minson: don't end on a wall, always offer a path forward */}
                <p style={{ color: '#9CA3AF', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: 22 }}>
                  {textFilter
                    ? 'Try different words, or clear the search to see everything available.'
                    : 'New organizations are added every week. In the meantime, try searching across all categories.'}
                </p>
                {textFilter ? (
                  <button onClick={() => setTextFilter('')} style={{ padding: '11px 26px', background: activePW?.color || '#1B4332', color: 'white', border: 'none', borderRadius: 12, fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-display)' }}>
                    Show all {activePW?.shortLabel} resources
                  </button>
                ) : (
                  <Link href="/search" style={{ display: 'inline-block', padding: '11px 26px', background: '#1B4332', color: 'white', borderRadius: 12, textDecoration: 'none', fontSize: '0.9rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>
                    Search everything →
                  </Link>
                )}
              </div>
            ) : (
              <>
                {/* Warm section header */}
                <div style={{ marginBottom: 22 }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, color: '#1B2E1F', marginBottom: 5 }}>
                    {activePW?.label.replace('\n', ' ')}
                  </h2>
                  {/* Minson: lead with what exists, not what's missing */}
                  <p style={{ fontSize: '0.875rem', color: '#9CA3AF' }}>
                    Tap any card to see how to connect. Everything here is free or low-cost.
                  </p>
                </div>

                {/* Cards grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 14 }}>
                  {filtered.map((org, i) => (
                    <div key={org.org_id} style={{ animation: `fadeUp 0.3s ease ${Math.min(i, 9) * 45}ms both` }}>
                      <ResourceCard org={org} pathway={activePW} />
                    </div>
                  ))}
                </div>

                {/* Bottom — gentle next step, never a dead end */}
                <div style={{ textAlign: 'center', marginTop: 52, padding: '28px 24px', background: 'white', borderRadius: 20, border: '1.5px solid #EAE4DB', maxWidth: 480, margin: '52px auto 0' }}>
                  <p style={{ color: '#6B6560', marginBottom: 16, fontSize: '0.95rem', lineHeight: 1.55 }}>
                    Not quite what you were looking for?
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
                    <Link href="/search" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 22px', background: '#1B4332', color: 'white', borderRadius: 12, textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem' }}>
                      <Search size={15} /> Search in your own words
                    </Link>
                    <button onClick={() => { setActivePathway(null); setOrgs([]); setTextFilter('') }}
                      style={{ padding: '11px 22px', background: 'white', color: '#1B4332', border: '1.5px solid #EAE4DB', borderRadius: 12, fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', fontFamily: 'var(--font-display)' }}>
                      Try a different category
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  )
}
