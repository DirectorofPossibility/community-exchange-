'use client'

import { PATHWAYS, PATHWAY_COLOR_MAP, type PathwayId } from '@/lib/sample-data'

interface PathwayFilterProps {
  selected: PathwayId | null
  onSelect: (id: PathwayId | null) => void
}

export default function PathwayFilter({ selected, onSelect }: PathwayFilterProps) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-2 pb-2 min-w-max">
        <button
          onClick={() => onSelect(null)}
          className={`px-4 py-2 text-sm font-semibold border-2 transition-colors whitespace-nowrap ${
            selected === null
              ? 'bg-ink text-white border-ink'
              : 'bg-white text-ink border-rule hover:border-ink'
          }`}
        >
          All Pathways
        </button>
        {PATHWAYS.map((pathway) => {
          const colors = PATHWAY_COLOR_MAP[pathway.id]
          const isActive = selected === pathway.id
          return (
            <button
              key={pathway.id}
              onClick={() => onSelect(pathway.id)}
              className={`px-4 py-2 text-sm font-semibold border-2 transition-colors whitespace-nowrap ${
                isActive
                  ? `${colors.bg} text-white ${colors.border}`
                  : `bg-white ${colors.text} ${colors.border} hover:${colors.bg} hover:text-white`
              }`}
            >
              {pathway.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
