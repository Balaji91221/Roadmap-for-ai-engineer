'use client'

import type { AnimSpec } from '@/lib/anim/types'
import { easeInOut, onLine, segment } from '@/lib/anim/util'
import { Box, Dot, Edge, Label, Title } from './_primitives'

// Concept · Caching — a cache hit returns instantly; a miss falls through to the slow backend.
const REQ = { x: 60, y: 125 }
const CACHE = { x: 230, y: 125 }
const BACKEND = { x: 430, y: 125 }

export const A_cache: AnimSpec = {
  id: 'A_cache',
  title: 'Caching',
  caption: 'Repeated requests are served instantly from cache; only misses pay the cost of the backend.',
  draw: (t, { color }) => {
    // alternate loops: even = hit, odd = miss. Use two sub-cycles within one loop.
    const cyc = segment(t, 2)
    const hit = cyc.index === 0
    const p = easeInOut(cyc.local)
    let dot = REQ
    if (hit) {
      // req -> cache -> back to req
      dot = p < 0.5 ? onLine(p * 2, REQ, CACHE) : onLine((p - 0.5) * 2, CACHE, REQ)
    } else {
      // req -> cache -> backend -> cache -> req
      if (p < 0.3) dot = onLine(p / 0.3, REQ, CACHE)
      else if (p < 0.55) dot = onLine((p - 0.3) / 0.25, CACHE, BACKEND)
      else if (p < 0.8) dot = onLine((p - 0.55) / 0.25, BACKEND, CACHE)
      else dot = onLine((p - 0.8) / 0.2, CACHE, REQ)
    }

    return (
      <>
        <Title text="Caching" color={color} />
        <Edge x1={REQ.x + 44} y1={REQ.y} x2={CACHE.x - 52} y2={CACHE.y} color="var(--color-border3)" />
        <Edge x1={CACHE.x + 52} y1={CACHE.y} x2={BACKEND.x - 52} y2={BACKEND.y} color="var(--color-border3)" dash="5 5" />

        <Box x={REQ.x - 44} y={REQ.y - 22} w={88} h={44} label="Request" color={color} active />
        <Box x={CACHE.x - 52} y={CACHE.y - 26} w={104} h={52} label="Cache" sub={hit ? 'HIT' : 'MISS'} color={hit ? 'var(--color-green)' : color} active />
        <Box x={BACKEND.x - 52} y={BACKEND.y - 26} w={104} h={52} label="Backend" sub="LLM / DB" color={color} active={!hit} />

        <Label x={CACHE.x} y={CACHE.y - 36} text={hit ? 'fast path' : 'slow path'} color={hit ? 'var(--color-green)' : 'var(--color-txt3)'} size={9} />
        <Dot x={dot.x} y={dot.y} r={5.5} color={hit ? 'var(--color-green)' : color} glow />
      </>
    )
  },
}

export default A_cache
