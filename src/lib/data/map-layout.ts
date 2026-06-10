import { WEEKS } from '@/lib/data/weeks'
import { DIVISIONS } from '@/lib/data/divisions'

// Deterministic geometry for the roadmap map. Pure module — identical on server & client,
// derived entirely from existing data (no schema changes).

const WIDTH = 1440
const PAD_X = 130
const MARGIN_TOP = 70
const BAND_H = 165
const WAVE_AMP = 26
const NODE_R = 13

export type MapNode = {
  week: number
  div: number
  topic: string
  icon: string
  order: number // draw order along the spine (0-based)
  x: number
  y: number
}

export type MapRegion = {
  div: number
  name: string
  use: string
  color: string
  x: number
  y: number
  w: number
  h: number
  labelX: number
  labelY: number
  reversed: boolean
}

export type MapEdge = {
  fromWeek: number
  toWeek: number
  from: { x: number; y: number }
  to: { x: number; y: number }
}

// One horizontal band per division (in division-id order); weeks placed evenly across the band,
// direction alternating so the connecting spine snakes (boustrophedon).
const ORDERED_DIVS = [...DIVISIONS].sort((a, b) => a.id - b.id)

const nodes: MapNode[] = []
const regions: MapRegion[] = []
let order = 0

ORDERED_DIVS.forEach((division, bandIdx) => {
  const reversed = bandIdx % 2 === 1
  const bandTop = MARGIN_TOP + bandIdx * BAND_H
  const bandCenter = bandTop + BAND_H / 2
  const members = WEEKS.filter((w) => w.div === division.id).sort((a, b) => a.week - b.week)
  const n = members.length

  members.forEach((w, j) => {
    const f = n <= 1 ? 0.5 : j / (n - 1)
    const fx = reversed ? 1 - f : f
    const x = PAD_X + fx * (WIDTH - 2 * PAD_X)
    const y = bandCenter + WAVE_AMP * Math.sin(f * Math.PI * 2)
    nodes.push({ week: w.week, div: w.div, topic: w.topic, icon: w.icon, order: order++, x, y })
  })

  regions.push({
    div: division.id,
    name: division.name,
    use: division.use,
    color: division.color,
    x: PAD_X - 70,
    y: bandTop + 8,
    w: WIDTH - 2 * (PAD_X - 70),
    h: BAND_H - 16,
    labelX: reversed ? WIDTH - PAD_X + 56 : PAD_X - 56,
    labelY: bandTop + 30,
    reversed,
  })
})

/** Nodes in spine draw order (division-id bands, serpentine within). */
export const MAP_NODES: MapNode[] = nodes
export const MAP_REGIONS: MapRegion[] = regions
export const NODE_RADIUS = NODE_R

const nodeByWeek = new Map<number, MapNode>(nodes.map((nd) => [nd.week, nd]))
export function getMapNode(week: number): MapNode | undefined {
  return nodeByWeek.get(week)
}

/** Catmull-Rom spline through the ordered nodes, emitted as cubic beziers. */
function spinePath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return pts.length === 1 ? `M ${pts[0].x} ${pts[0].y}` : ''
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] ?? p2
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
  }
  return d
}

export const SPINE_PATH = spinePath(nodes)

/** Normalized path length used as the `pathLength` attribute, so dashoffset maps to node order. */
export const SPINE_PATH_LENGTH = 1000

/** Fraction (0..1) of the spine up to a completed week's node, for the "lit" overlay. */
export function spineFractionToWeek(week: number): number {
  const node = nodeByWeek.get(week)
  if (!node || nodes.length < 2) return 0
  return node.order / (nodes.length - 1)
}

export const PREREQ_EDGES: MapEdge[] = WEEKS.flatMap((w) =>
  w.prereqs
    .map((p) => {
      const from = nodeByWeek.get(p)
      const to = nodeByWeek.get(w.week)
      if (!from || !to) return null
      return { fromWeek: p, toWeek: w.week, from: { x: from.x, y: from.y }, to: { x: to.x, y: to.y } }
    })
    .filter((e): e is MapEdge => e !== null),
)

export const VIEWBOX = {
  w: WIDTH,
  h: MARGIN_TOP * 2 + ORDERED_DIVS.length * BAND_H,
}
