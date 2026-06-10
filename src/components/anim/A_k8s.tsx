'use client'

import type { AnimSpec } from '@/lib/anim/types'
import { clamp01, easeInOut, onLine, pulse } from '@/lib/anim/util'
import { Label, Title } from './_primitives'

// Div 8 · DevOps & Infra — the scheduler places pods; a node fails and its pod is rescheduled onto a healthy node.
const SCHED = { x: 265, y: 70 }
const NODES = [
  { x: 36, label: 'node-1' },
  { x: 205, label: 'node-2' },
  { x: 374, label: 'node-3' },
]
const NODE_Y = 150
const NODE_W = 120
const NODE_H = 84
const LAND = [
  { x: 96, y: 212 },
  { x: 265, y: 212 },
  { x: 418, y: 212 },
]
const MIGRATED = { x: 450, y: 212 }

function Pod({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x={-9} y={-7} width={18} height={14} rx={3} fill={color} style={{ filter: 'url(#animGlow)' }} />
    </g>
  )
}

export const A_k8s: AnimSpec = {
  id: 'A_k8s',
  title: 'Kubernetes Self-Healing',
  caption: 'The scheduler places pods on nodes; when a node fails, its pods are automatically rescheduled elsewhere.',
  draw: (t, { color }) => {
    const failed = t >= 0.45
    const failFlash = pulse(t, 0.5, 0.12)
    const migrate = clamp01((t - 0.6) / 0.3)

    const p0 = onLine(easeInOut(clamp01((t - 0.04) / 0.22)), SCHED, LAND[0])
    const p2 = onLine(easeInOut(clamp01((t - 0.2) / 0.22)), SCHED, LAND[2])
    // pod-1: placed on node-2, then migrates to node-3 along an arc after the failure
    let p1 = onLine(easeInOut(clamp01((t - 0.12) / 0.22)), SCHED, LAND[1])
    if (t >= 0.6) {
      const m = easeInOut(migrate)
      const cx = 357
      const cy = 150
      p1 = {
        x: (1 - m) * (1 - m) * LAND[1].x + 2 * (1 - m) * m * cx + m * m * MIGRATED.x,
        y: (1 - m) * (1 - m) * LAND[1].y + 2 * (1 - m) * m * cy + m * m * MIGRATED.y,
      }
    }

    return (
      <>
        <Title text="Kubernetes Self-Healing" color={color} />

        {/* scheduler */}
        <rect x={200} y={48} width={130} height={44} rx={10} fill={`${color}1A`} stroke={color} strokeWidth={2} />
        <text x={265} y={74} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={12} fill="var(--color-txt)">
          Scheduler
        </text>

        {/* nodes */}
        {NODES.map((n, i) => {
          const isFailed = failed && i === 1
          const stroke = isFailed ? 'var(--color-rose)' : 'var(--color-border2)'
          return (
            <g key={i} opacity={isFailed ? 0.55 : 1}>
              <rect
                x={n.x}
                y={NODE_Y}
                width={NODE_W}
                height={NODE_H}
                rx={10}
                fill={isFailed ? 'rgba(244,63,94,0.12)' : 'var(--color-surface2)'}
                stroke={stroke}
                strokeWidth={isFailed ? 1.5 + failFlash * 2.5 : 1.2}
              />
              <Label x={n.x + NODE_W / 2} y={NODE_Y + 20} text={isFailed ? `${n.label} ✕` : n.label} color={isFailed ? 'var(--color-rose)' : 'var(--color-txt2)'} size={10} weight={600} />
            </g>
          )
        })}

        {/* scheduler edges */}
        {LAND.map((l, i) => (
          <line key={i} x1={SCHED.x} y1={SCHED.y + 22} x2={l.x} y2={NODE_Y} stroke="var(--color-border3)" strokeWidth={1} strokeDasharray="3 5" opacity={0.5} />
        ))}

        {/* pods */}
        <Pod x={p0.x} y={p0.y} color={color} />
        <Pod x={p2.x} y={p2.y} color={color} />
        <Pod x={p1.x} y={p1.y} color={t >= 0.6 ? 'var(--color-rose)' : color} />
      </>
    )
  },
}

export default A_k8s
