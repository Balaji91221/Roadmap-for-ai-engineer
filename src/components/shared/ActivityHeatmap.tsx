'use client'

import { isoDay } from '@/lib/progress'

type Props = {
  /** ISO-day -> completions on that day. */
  data: Record<string, number>
  /** Number of week columns to show (most recent). */
  weeks?: number
}

const CELL = 13
const GAP = 3
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', '']
const ACCENT_RGB = '124, 106, 247' // --color-accent

function level(count: number): number {
  if (count <= 0) return 0
  if (count === 1) return 1
  if (count === 2) return 2
  return 3
}

const LEVEL_FILL = [
  'var(--color-surface3)',
  `rgba(${ACCENT_RGB}, 0.35)`,
  `rgba(${ACCENT_RGB}, 0.65)`,
  `rgba(${ACCENT_RGB}, 1)`,
]

/** GitHub-style contribution grid rendered as inline SVG (no images). */
export default function ActivityHeatmap({ data, weeks = 26 }: Props) {
  // Anchor the grid to the start of the current week (Sunday), then walk back `weeks` columns.
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const start = new Date(today)
  start.setDate(start.getDate() - today.getDay() - (weeks - 1) * 7)

  const labelW = 28
  const monthH = 16
  const gridW = weeks * (CELL + GAP)
  const gridH = 7 * (CELL + GAP)
  const width = labelW + gridW
  const height = monthH + gridH

  const cells: { x: number; y: number; fill: string; title: string }[] = []
  const monthMarks: { x: number; label: string }[] = []
  let lastMonth = -1

  for (let w = 0; w < weeks; w++) {
    for (let d = 0; d < 7; d++) {
      const date = new Date(start)
      date.setDate(start.getDate() + w * 7 + d)
      if (date > today) continue
      const key = isoDay(date)
      const count = data[key] ?? 0
      const x = labelW + w * (CELL + GAP)
      const y = monthH + d * (CELL + GAP)
      cells.push({
        x,
        y,
        fill: LEVEL_FILL[level(count)],
        title: count > 0 ? `${count} completed · ${key}` : key,
      })
      if (d === 0) {
        const m = date.getMonth()
        if (m !== lastMonth) {
          monthMarks.push({ x, label: date.toLocaleString('en-US', { month: 'short' }) })
          lastMonth = m
        }
      }
    }
  }

  return (
    <div className="overflow-x-auto">
      <svg
        width="100%"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Completion activity over the last six months"
        style={{ minWidth: width / 1.4, maxWidth: width }}
      >
        {monthMarks.map((m, i) => (
          <text key={i} x={m.x} y={11} fontSize={9} fill="var(--color-txt3)" fontFamily="var(--font-mono)">
            {m.label}
          </text>
        ))}
        {DAY_LABELS.map((label, d) =>
          label ? (
            <text
              key={d}
              x={0}
              y={monthH + d * (CELL + GAP) + CELL - 2}
              fontSize={9}
              fill="var(--color-txt3)"
              fontFamily="var(--font-mono)"
            >
              {label}
            </text>
          ) : null,
        )}
        {cells.map((c, i) => (
          <rect key={i} x={c.x} y={c.y} width={CELL} height={CELL} rx={3} fill={c.fill}>
            <title>{c.title}</title>
          </rect>
        ))}
      </svg>
      <div className="flex items-center gap-1.5 mt-2 text-[10px] font-mono text-txt3">
        <span>Less</span>
        {LEVEL_FILL.map((fill, i) => (
          <span key={i} className="inline-block rounded-[3px]" style={{ width: CELL, height: CELL, background: fill }} />
        ))}
        <span>More</span>
      </div>
    </div>
  )
}
