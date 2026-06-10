'use client'

import type { ReactNode } from 'react'

type Props = {
  pct: number
  size?: number
  stroke?: number
  color?: string
  track?: string
  children?: ReactNode
}

/** Theme-token SVG donut. Used for overall % and per-division progress. */
export default function ProgressRing({
  pct,
  size = 76,
  stroke = 6,
  color = 'var(--color-accent)',
  track = 'var(--color-surface3)',
  children,
}: Props) {
  const clamped = Math.max(0, Math.min(100, pct))
  const r = (size - stroke) / 2
  const circumference = 2 * Math.PI * r
  const offset = circumference * (1 - clamped / 100)

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 600ms cubic-bezier(0.2, 0, 0, 1)' }}
        />
      </svg>
      {children && <div className="absolute inset-0 flex items-center justify-center text-center">{children}</div>}
    </div>
  )
}
