import type { AnimSpec } from './types'
import { easeInOut, onCircle, segment } from './util'

// A content-driven fallback visualization: it renders THIS topic's own subtopics as a labelled
// node graph, so any topic — even one with no dedicated archetype — shows a relevant, self-
// explanatory diagram. Deterministic function of t.

const LEVEL_RE = /\s*\((Beginner|Intermediate|Advanced|Expert)\)/

function shorten(s: string, max: number): string {
  let out = s.replace(LEVEL_RE, '').trim()
  out = out.split(/[:—–]| - | — /)[0].trim() // keep the headline part
  if (out.length <= max) return out
  // trim on a word boundary
  const words = out.split(' ')
  let acc = ''
  for (const w of words) {
    if ((acc + ' ' + w).trim().length > max) break
    acc = (acc + ' ' + w).trim()
  }
  return (acc || out.slice(0, max)).replace(/[,.;]$/, '') + '…'
}

export function conceptWebAnim(opts: {
  id: string
  title: string
  nodes: string[]
  caption: string
  highlight?: number
}): AnimSpec {
  const labels = (opts.nodes.length ? opts.nodes : [opts.title]).slice(0, 6).map((n) => shorten(n, 18))
  const n = labels.length
  const hl = opts.highlight ?? -1

  return {
    id: opts.id,
    title: opts.title,
    caption: opts.caption,
    draw: (t, { color }) => {
      const cx = 265
      const cy = 138
      const R = 92
      const { index: active, local } = segment(t, n)
      const lp = easeInOut(local)
      const ap = onCircle(active / n, cx, cy, R)
      const pulse = { x: cx + (ap.x - cx) * lp, y: cy + (ap.y - cy) * lp }

      return (
        <>
          <text x={20} y={26} fontFamily="var(--font-syne)" fontWeight={700} fontSize={14} fill={color}>
            {shorten(opts.title, 44)}
          </text>

          {/* edges */}
          {labels.map((_, i) => {
            const p = onCircle(i / n, cx, cy, R)
            const on = i === active || i === hl
            return (
              <line
                key={`e${i}`}
                x1={cx}
                y1={cy}
                x2={p.x}
                y2={p.y}
                stroke={on ? color : 'var(--color-border2)'}
                strokeWidth={on ? 2 : 1}
                opacity={on ? 0.9 : 0.45}
              />
            )
          })}

          {/* center */}
          <circle cx={cx} cy={cy} r={26} fill={`${color}1A`} stroke={color} strokeWidth={2} />
          <text x={cx} y={cy + 4} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={10} fill="var(--color-txt)">
            {shorten(opts.title, 10)}
          </text>

          {/* nodes */}
          {labels.map((label, i) => {
            const p = onCircle(i / n, cx, cy, R)
            const on = i === active || i === hl
            return (
              <g key={i}>
                <rect
                  x={p.x - 46}
                  y={p.y - 14}
                  width={92}
                  height={28}
                  rx={8}
                  fill={on ? `${color}1A` : 'var(--color-surface2)'}
                  stroke={i === hl ? color : on ? color : 'var(--color-border2)'}
                  strokeWidth={i === hl ? 2.5 : on ? 2 : 1.2}
                />
                <text x={p.x} y={p.y + 3.5} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={9.5} fill="var(--color-txt)">
                  {label}
                </text>
              </g>
            )
          })}

          {/* travelling pulse */}
          <circle cx={pulse.x} cy={pulse.y} r={5} fill={color} style={{ filter: 'url(#animGlow)' }} />
        </>
      )
    },
  }
}
