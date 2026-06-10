'use client'

import type { ReactNode } from 'react'

// Shared SVG building blocks so every division explainer reads consistently and professionally.
// Structural colors use theme tokens; the accent is always the passed division `color`.

export function Title({ text, color }: { text: string; color: string }) {
  return (
    <text x={20} y={28} fontFamily="var(--font-syne)" fontWeight={700} fontSize={15} fill={color}>
      {text}
    </text>
  )
}

export function Box({
  x,
  y,
  w,
  h,
  label,
  sub,
  color,
  active = false,
}: {
  x: number
  y: number
  w: number
  h: number
  label?: string
  sub?: string
  color: string
  active?: boolean
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        fill={active ? `${color}1A` : 'var(--color-surface2)'}
        stroke={active ? color : 'var(--color-border2)'}
        strokeWidth={active ? 2 : 1.2}
      />
      {label && (
        <text
          x={x + w / 2}
          y={y + h / 2 + (sub ? -4 : 1)}
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="var(--font-mono)"
          fontSize={12}
          fontWeight={500}
          fill="var(--color-txt)"
        >
          {label}
        </text>
      )}
      {sub && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 13}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize={8.5}
          fill="var(--color-txt3)"
        >
          {sub}
        </text>
      )}
    </g>
  )
}

export function Label({
  x,
  y,
  text,
  color = 'var(--color-txt3)',
  anchor = 'middle',
  size = 10,
  weight = 400,
}: {
  x: number
  y: number
  text: string
  color?: string
  anchor?: 'start' | 'middle' | 'end'
  size?: number
  weight?: number
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily="var(--font-mono)"
      fontSize={size}
      fontWeight={weight}
      fill={color}
    >
      {text}
    </text>
  )
}

export function Edge({
  x1,
  y1,
  x2,
  y2,
  color = 'var(--color-border3)',
  width = 1.4,
  dash,
  opacity = 1,
  arrow = false,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  color?: string
  width?: number
  dash?: string
  opacity?: number
  arrow?: boolean
}) {
  const node: ReactNode[] = [
    <line key="l" x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width} strokeDasharray={dash} opacity={opacity} />,
  ]
  if (arrow) {
    const a = Math.atan2(y2 - y1, x2 - x1)
    const s = 6
    node.push(
      <polygon
        key="a"
        points={`${x2},${y2} ${x2 - s * Math.cos(a - 0.4)},${y2 - s * Math.sin(a - 0.4)} ${x2 - s * Math.cos(a + 0.4)},${y2 - s * Math.sin(a + 0.4)}`}
        fill={color}
        opacity={opacity}
      />,
    )
  }
  return <g>{node}</g>
}

export function Dot({
  x,
  y,
  r = 5,
  color,
  glow = false,
}: {
  x: number
  y: number
  r?: number
  color: string
  glow?: boolean
}) {
  return <circle cx={x} cy={y} r={r} fill={color} opacity={glow ? 1 : 0.95} style={glow ? { filter: 'url(#animGlow)' } : undefined} />
}
