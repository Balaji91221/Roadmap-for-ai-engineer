'use client'

import { useMemo, useRef, useState } from 'react'
import { Plus, Minus, Maximize2, Info } from 'lucide-react'
import { useProgress } from '@/contexts/ProgressContext'
import { getDivisionColor } from '@/lib/utils'
import { usePanZoom } from '@/hooks/usePanZoom'
import {
  MAP_NODES,
  MAP_REGIONS,
  PREREQ_EDGES,
  SPINE_PATH,
  SPINE_PATH_LENGTH,
  VIEWBOX,
  NODE_RADIUS,
  getMapNode,
  spineFractionToWeek,
} from '@/lib/data/map-layout'
import WeekDetailOverlay from '@/components/shared/WeekDetailOverlay'

export default function RoadmapMap() {
  const { isCompleted, furthestWeek } = useProgress()
  const { viewBox, bind, zoomBy, reset, centerOn } = usePanZoom(VIEWBOX.w, VIEWBOX.h)
  const [selected, setSelected] = useState<number | null>(null)
  const [focused, setFocused] = useState<number | null>(null)
  const nodeRefs = useRef<Map<number, SVGGElement>>(new Map())

  const litFraction = furthestWeek ? spineFractionToWeek(furthestWeek) : 0
  const nextWeek = furthestWeek > 0 ? furthestWeek + 1 : 1

  // Only draw prereq links that aren't already implied by the consecutive spine.
  const crossEdges = useMemo(
    () => PREREQ_EDGES.filter((e) => Math.abs(e.toWeek - e.fromWeek) > 1),
    [],
  )

  function focusWeek(week: number) {
    const node = getMapNode(week)
    if (!node) return
    nodeRefs.current.get(week)?.focus()
    centerOn(node.x, node.y)
  }

  function onNodeKeyDown(e: React.KeyboardEvent, week: number) {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault()
      setSelected(week)
      return
    }
    let target: number | null = null
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') target = week + 1
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') target = week - 1
    if (target != null && getMapNode(target)) {
      e.preventDefault()
      e.stopPropagation()
      focusWeek(target)
    }
  }

  return (
    <div className="relative rounded-2xl border border-border bg-surface card-elevated overflow-hidden">
      {/* Toolbar */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
        <ToolBtn label="Zoom in" onClick={() => zoomBy(1.25)}>
          <Plus className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn label="Zoom out" onClick={() => zoomBy(1 / 1.25)}>
          <Minus className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn label="Reset view" onClick={reset}>
          <Maximize2 className="w-4 h-4" />
        </ToolBtn>
      </div>

      {/* Legend / hint */}
      <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-x-4 gap-y-1.5 rounded-lg bg-surface/80 backdrop-blur-md border border-border px-3 py-2 text-[11px] text-txt2 max-w-[min(92%,520px)]">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-accent" /> Completed
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full border-2 border-accent2" /> Up next
        </span>
        <span className="inline-flex items-center gap-1.5 text-txt3">
          <Info className="w-3 h-3" /> Drag to pan · scroll to zoom · click a node
        </span>
      </div>

      <svg
        viewBox={viewBox}
        {...bind}
        role="application"
        aria-label="Interactive roadmap map of all 84 weeks across 8 divisions"
        tabIndex={0}
        className="w-full h-[64vh] min-h-[420px] select-none touch-none focus:outline-none"
      >
        <defs>
          <filter id="nodeGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="litSpine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-accent3)" />
            <stop offset="50%" stopColor="var(--color-accent)" />
            <stop offset="100%" stopColor="var(--color-accent2)" />
          </linearGradient>
        </defs>

        {/* Division regions */}
        {MAP_REGIONS.map((r) => (
          <g key={r.div}>
            <rect
              x={r.x}
              y={r.y}
              width={r.w}
              height={r.h}
              rx={26}
              fill={`${r.color}0D`}
              stroke={`${r.color}33`}
              strokeWidth={1.5}
            />
            <text
              x={r.reversed ? r.x + r.w - 20 : r.x + 20}
              y={r.y + 30}
              textAnchor={r.reversed ? 'end' : 'start'}
              fontFamily="var(--font-syne)"
              fontWeight={700}
              fontSize={20}
              fill={r.color}
            >
              {r.div}. {r.name}
            </text>
            <text
              x={r.reversed ? r.x + r.w - 20 : r.x + 20}
              y={r.y + 50}
              textAnchor={r.reversed ? 'end' : 'start'}
              fontFamily="var(--font-mono)"
              fontSize={11}
              fill="var(--color-txt3)"
            >
              {r.use}
            </text>
          </g>
        ))}

        {/* Prerequisite cross-links */}
        <g fill="none" stroke="var(--color-border3)" strokeWidth={1.5} strokeDasharray="4 5" opacity={0.7}>
          {crossEdges.map((e, i) => {
            const mx = (e.from.x + e.to.x) / 2
            const my = (e.from.y + e.to.y) / 2 - 40
            return <path key={i} d={`M ${e.from.x} ${e.from.y} Q ${mx} ${my} ${e.to.x} ${e.to.y}`} />
          })}
        </g>

        {/* Spine: dim base + lit overlay up to furthest completed week */}
        <path d={SPINE_PATH} fill="none" stroke="var(--color-surface3)" strokeWidth={7} strokeLinecap="round" />
        <path
          d={SPINE_PATH}
          pathLength={SPINE_PATH_LENGTH}
          fill="none"
          stroke="url(#litSpine)"
          strokeWidth={7}
          strokeLinecap="round"
          strokeDasharray={SPINE_PATH_LENGTH}
          strokeDashoffset={SPINE_PATH_LENGTH * (1 - litFraction)}
          style={{ transition: 'stroke-dashoffset 800ms cubic-bezier(0.2, 0, 0, 1)' }}
        />

        {/* Week nodes */}
        {MAP_NODES.map((n) => {
          const done = isCompleted(n.week)
          const isNext = !done && n.week === nextWeek
          const divColor = getDivisionColor(n.div)
          return (
            <g
              key={n.week}
              ref={(el) => {
                if (el) nodeRefs.current.set(n.week, el)
                else nodeRefs.current.delete(n.week)
              }}
              transform={`translate(${n.x}, ${n.y})`}
              role="button"
              tabIndex={0}
              aria-label={`Week ${n.week}: ${n.topic}${done ? ' (completed)' : ''}. Press Enter to open.`}
              onClick={() => setSelected(n.week)}
              onKeyDown={(e) => onNodeKeyDown(e, n.week)}
              onFocus={() => setFocused(n.week)}
              onBlur={() => setFocused((f) => (f === n.week ? null : f))}
              className="cursor-pointer focus:outline-none"
              style={{ outline: 'none' }}
            >
              {focused === n.week && (
                <circle r={NODE_RADIUS + 7} fill="none" stroke="var(--color-accent2)" strokeWidth={2.5} strokeDasharray="3 3" />
              )}
              {isNext && <circle r={NODE_RADIUS + 6} fill="none" stroke="var(--color-accent2)" strokeWidth={2} opacity={0.85} />}
              <circle
                r={NODE_RADIUS}
                fill={done ? divColor : 'var(--color-surface2)'}
                stroke={done ? divColor : 'var(--color-border3)'}
                strokeWidth={done ? 2 : 1.5}
                filter={done ? 'url(#nodeGlow)' : undefined}
                className="transition-[fill,stroke] duration-300"
              />
              <text
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="var(--font-mono)"
                fontSize={11}
                fontWeight={600}
                fill={done ? '#fff' : 'var(--color-txt2)'}
                pointerEvents="none"
              >
                {n.week}
              </text>
              <title>{`Week ${n.week} · ${n.topic}`}</title>
            </g>
          )
        })}
      </svg>

      {selected != null && <WeekDetailOverlay week={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

function ToolBtn({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="w-8 h-8 inline-flex items-center justify-center rounded-lg border border-border bg-surface/80 backdrop-blur-md text-txt2 hover:text-txt hover:border-border2 transition-all"
    >
      {children}
    </button>
  )
}
