'use client'

import {
  BookOpen, Heart, Scale, ChevronDown,
  Compass, MapPin, Sparkles, Calendar, Users,
} from 'lucide-react'
import { CENTERS, CENTER_COLOR_MAP, PATHWAYS, PATHWAY_COLOR_MAP } from '@/lib/sample-data'
import type { Activity } from '@/lib/sample-data'

/* ── Collapsible section ───────────────────────────────────────────── */
function Section({ icon, label, count, color, defaultOpen, children }: {
  icon: React.ReactNode
  label: string
  count: number
  color: string
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  if (count === 0) return null
  return (
    <details className="group" open={defaultOpen}>
      <summary className="flex items-center gap-2 px-4 py-3 cursor-pointer select-none transition-colors hover:bg-white/60 border-b border-rule">
        {icon}
        <span className="text-[11px] font-bold uppercase tracking-wider flex-1" style={{ color }}>
          {label}
        </span>
        <span
          className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
          style={{ background: color + '18', color }}
        >
          {count}
        </span>
        <ChevronDown size={12} className="transition-transform group-open:rotate-180 ml-1 text-faint" />
      </summary>
      <div className="px-4 py-3">
        {children}
      </div>
    </details>
  )
}

/* ── Row item ──────────────────────────────────────────────────────── */
function Row({ icon, label, meta }: {
  icon: React.ReactNode
  label: string
  meta?: string
}) {
  return (
    <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-md transition-colors hover:bg-paper group cursor-pointer">
      <span className="flex-shrink-0 w-6 h-6 rounded flex items-center justify-center bg-paper">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <span className="text-xs font-medium line-clamp-1 group-hover:text-health transition-colors text-ink">
          {label}
        </span>
        {meta && <span className="text-[11px] block truncate text-faint">{meta}</span>}
      </div>
    </div>
  )
}

/* ── Main sidebar ──────────────────────────────────────────────────── */
interface WayfinderSidebarProps {
  activity: Activity
}

export default function WayfinderSidebar({ activity }: WayfinderSidebarProps) {
  const pathway = PATHWAYS.find((p) => p.id === activity.pathway)!
  const pathwayColors = PATHWAY_COLOR_MAP[activity.pathway]
  const cc = activity.centerContent

  const exploreCount = (cc.learning?.length ?? 0)
  const actionCount = (cc.resource?.length ?? 0) + (cc.action?.length ?? 0)
  const accountabilityCount = (cc.accountability?.length ?? 0)
  const totalEntities = exploreCount + actionCount + accountabilityCount

  const activeCenters = CENTERS.filter((c) => activity.centers[c.id])

  return (
    <aside className="bg-paper border-2 border-rule overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-rule">
        <div className="flex items-center gap-2 mb-1">
          <Compass size={15} className={pathwayColors.text} />
          <h3 className="font-display text-sm font-bold tracking-tight text-ink">
            Wayfinder
          </h3>
        </div>
        {totalEntities > 0 && (
          <p className="text-[11px] text-faint">
            {totalEntities} connected {totalEntities === 1 ? 'resource' : 'resources'}
          </p>
        )}
      </div>

      {/* Pathway + Centers */}
      <div className="px-4 py-3 border-b border-rule">
        <span
          className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${pathwayColors.text}`}
          style={{ background: `${CENTER_COLOR_MAP.learning.hex}08` }}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${pathwayColors.bg}`} />
          {pathway.name}
        </span>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {activeCenters.map((center) => {
            const colors = CENTER_COLOR_MAP[center.color]
            return (
              <span
                key={center.id}
                className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full"
                style={{ background: colors.hex + '14', color: colors.hex }}
              >
                {center.name}
              </span>
            )
          })}
        </div>
      </div>

      {/* Organization */}
      <div className="px-4 py-3 border-b border-rule">
        <div className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center flex-shrink-0 border border-rule">
            <Users size={12} className="text-faint" />
          </div>
          <span className="text-xs font-semibold text-ink">
            {activity.org}
          </span>
        </div>
      </div>

      {/* ── EXPLORE (Learning) ── */}
      <Section
        icon={<BookOpen size={13} className="text-learning" />}
        label="Explore"
        count={exploreCount}
        color={CENTER_COLOR_MAP.learning.hex}
        defaultOpen={true}
      >
        {cc.learning && cc.learning.length > 0 && (
          <div className="space-y-1.5">
            {cc.learning.map((item, i) => (
              <div key={i} className="py-1.5 group cursor-pointer">
                <span className="text-xs font-semibold leading-tight line-clamp-2 text-ink group-hover:text-learning transition-colors">
                  {item.title}
                </span>
                <span className="text-[11px] block mt-0.5 text-faint line-clamp-1">
                  {item.description}
                </span>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* ── TAKE ACTION (Resource + Action) ── */}
      <Section
        icon={<Heart size={13} className="text-action" />}
        label="Take Action"
        count={actionCount}
        color={CENTER_COLOR_MAP.action.hex}
      >
        <div className="space-y-0.5">
          {cc.resource?.map((item, i) => (
            <Row
              key={`r-${i}`}
              icon={<MapPin size={12} className="text-resource" />}
              label={item.title}
              meta={item.org}
            />
          ))}
          {cc.action?.map((item, i) => {
            const iconMap = {
              volunteer: <Sparkles size={12} className="text-action" />,
              event: <Calendar size={12} className="text-action" />,
              service: <MapPin size={12} className="text-resource" />,
            }
            return (
              <Row
                key={`a-${i}`}
                icon={iconMap[item.type]}
                label={item.title}
                meta={item.description}
              />
            )
          })}
        </div>
      </Section>

      {/* ── ACCOUNTABILITY ── */}
      <Section
        icon={<Scale size={13} className="text-accountability" />}
        label="Accountability"
        count={accountabilityCount}
        color={CENTER_COLOR_MAP.accountability.hex}
      >
        <div className="space-y-0.5">
          {cc.accountability?.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-md hover:bg-paper transition-colors group cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0 border border-rule">
                <Users size={10} className="text-accountability" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-medium line-clamp-1 text-ink group-hover:text-accountability transition-colors">
                  {item.title}
                </span>
                <span className="text-[11px] block truncate text-faint">
                  {[item.level, item.role].filter(Boolean).join(' · ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <div className="h-1" />
    </aside>
  )
}
