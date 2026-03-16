'use client'

import { CENTERS, CENTER_COLOR_MAP } from '@/lib/sample-data'
import type { CenterId } from '@/lib/sample-data'
import { useState } from 'react'

interface WayfinderProps {
  centers: Record<CenterId, boolean>
  size?: 'sm' | 'md'
}

/** Compact 4-dot indicator showing which centers are active for an activity */
export default function Wayfinder({ centers, size = 'sm' }: WayfinderProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const dotSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'

  return (
    <div className="flex items-center gap-1.5 relative">
      {CENTERS.map((center, i) => {
        const colors = CENTER_COLOR_MAP[center.color]
        const isActive = centers[center.id]

        return (
          <div
            key={center.id}
            className="relative"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className={`${dotSize} rounded-full border-2 transition-colors ${
                isActive
                  ? `${colors.bg} ${colors.border}`
                  : `bg-transparent border-rule`
              }`}
            />
            {hoveredIndex === i && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-ink text-white text-xs font-medium whitespace-nowrap rounded z-10">
                {center.name}
                {isActive ? '' : ' (coming soon)'}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-ink" />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
