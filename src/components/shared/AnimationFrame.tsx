'use client'

import { useEffect, useRef, useState } from 'react'
import { Play, Pause } from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { AnimSpec } from '@/lib/anim/types'
import { ANIM_W, ANIM_H } from '@/lib/anim/types'

const FPS_INTERVAL = 1000 / 30 // cap progression updates at ~30fps
const STATIC_FRAME = 0.16 // representative frame shown when paused / reduced-motion

export default function AnimationFrame({
  anim,
  color,
  durationMs = 7000,
}: {
  anim: AnimSpec
  color: string
  durationMs?: number
}) {
  const reduced = useReducedMotion()
  const [t, setT] = useState(STATIC_FRAME)
  const [playing, setPlaying] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const visibleRef = useRef(true)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)
  const lastRef = useRef(0)

  // Default state: play only when the user has NOT requested reduced motion.
  useEffect(() => {
    setPlaying(!reduced)
  }, [reduced])

  // Pause the loop while the frame is scrolled out of view (perf).
  useEffect(() => {
    const el = containerRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver((entries) => {
      visibleRef.current = entries[0]?.isIntersecting ?? true
    }, { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!playing) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      startRef.current = null
      return
    }

    const frame = (now: number) => {
      rafRef.current = requestAnimationFrame(frame)
      if (startRef.current == null) {
        startRef.current = now
        lastRef.current = now
      }
      // Freeze (without phase jump) while tab hidden or offscreen.
      if (document.hidden || !visibleRef.current) {
        startRef.current += now - lastRef.current
        lastRef.current = now
        return
      }
      if (now - lastRef.current < FPS_INTERVAL) return
      lastRef.current = now
      const phase = (((now - startRef.current) / durationMs) % 1 + 1) % 1
      setT(phase)
    }

    rafRef.current = requestAnimationFrame(frame)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [playing, durationMs])

  return (
    <figure ref={containerRef} className="relative m-0">
      <div className="relative rounded-xl border border-border bg-surface/60 overflow-hidden">
        <svg
          viewBox={`0 0 ${ANIM_W} ${ANIM_H}`}
          width="100%"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={`${anim.title}: ${anim.caption}`}
          className="block w-full h-auto"
        >
          <defs>
            <filter id="animGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {anim.draw(t, { color, W: ANIM_W, H: ANIM_H, reduced })}
        </svg>
        <button
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? 'Pause animation' : 'Play animation'}
          title={playing ? 'Pause' : 'Play'}
          className="absolute bottom-2.5 right-2.5 w-8 h-8 inline-flex items-center justify-center rounded-lg border border-border bg-surface/80 backdrop-blur-md text-txt2 hover:text-txt hover:border-border2 transition-all"
        >
          {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
      </div>
      <figcaption className="text-[11.5px] text-txt3 mt-2 leading-relaxed">
        {anim.caption}
        {reduced && !playing && <span className="text-txt2"> · Motion paused — press play to animate.</span>}
      </figcaption>
    </figure>
  )
}
