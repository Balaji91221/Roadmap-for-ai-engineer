'use client'

import { useEffect, useRef, useState } from 'react'
import { Play, Pause, RotateCcw, Gauge } from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { AnimSpec } from '@/lib/anim/types'
import { ANIM_W, ANIM_H } from '@/lib/anim/types'

const FPS_INTERVAL = 1000 / 30
const SPEEDS = [0.5, 1, 2]

/**
 * Interactive visualization player: an AnimSpec rendered as a scrubbable, speed-adjustable
 * simulation. Deterministic (frame = f(t)), reduced-motion aware, offscreen/hidden gated.
 */
export default function VisualLab({
  anim,
  color,
  durationMs = 7000,
}: {
  anim: AnimSpec
  color: string
  durationMs?: number
}) {
  const reduced = useReducedMotion()
  const [t, setT] = useState(0.16)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [scrubbing, setScrubbing] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const visibleRef = useRef(true)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)
  const lastRef = useRef(0)
  const tRef = useRef(t)
  tRef.current = t

  useEffect(() => {
    setPlaying(!reduced)
  }, [reduced])

  useEffect(() => {
    const el = containerRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver((e) => (visibleRef.current = e[0]?.isIntersecting ?? true), { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!playing || scrubbing) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      startRef.current = null
      return
    }
    const frame = (now: number) => {
      rafRef.current = requestAnimationFrame(frame)
      if (startRef.current == null) {
        // resume from current t so play/pause doesn't jump
        startRef.current = now - tRef.current * (durationMs / speed)
        lastRef.current = now
      }
      if (document.hidden || !visibleRef.current) {
        startRef.current += now - lastRef.current
        lastRef.current = now
        return
      }
      if (now - lastRef.current < FPS_INTERVAL) return
      lastRef.current = now
      const phase = (((now - startRef.current) / (durationMs / speed)) % 1 + 1) % 1
      setT(phase)
    }
    rafRef.current = requestAnimationFrame(frame)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [playing, scrubbing, durationMs, speed])

  const pct = Math.round(t * 100)

  return (
    <div ref={containerRef} className="rounded-2xl border border-border2 glass overflow-hidden">
      <div className="relative bg-gradient-to-b from-white/[0.02] to-transparent">
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
      </div>

      {/* control bar */}
      <div className="flex items-center gap-3 px-3 py-2.5 border-t border-border bg-surface/60">
        <button
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? 'Pause' : 'Play'}
          className="w-8 h-8 shrink-0 inline-flex items-center justify-center rounded-lg text-white"
          style={{ background: color, boxShadow: `0 6px 18px -8px ${color}` }}
        >
          {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <button
          onClick={() => {
            setPlaying(false)
            setT(0)
          }}
          aria-label="Restart"
          className="w-8 h-8 shrink-0 inline-flex items-center justify-center rounded-lg border border-border text-txt2 hover:text-txt hover:border-border2 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* scrubber */}
        <input
          type="range"
          min={0}
          max={1000}
          value={Math.round(t * 1000)}
          onPointerDown={() => setScrubbing(true)}
          onPointerUp={() => setScrubbing(false)}
          onChange={(e) => {
            setPlaying(false)
            setT(Number(e.target.value) / 1000)
          }}
          aria-label="Scrub animation"
          className="flex-1 h-1 accent-current cursor-pointer"
          style={{ accentColor: color }}
        />
        <span className="font-mono text-[11px] text-txt3 tabular-nums w-9 text-right">{pct}%</span>

        {/* speed */}
        <div className="hidden sm:flex items-center gap-1 pl-2 border-l border-border">
          <Gauge className="w-3.5 h-3.5 text-txt3" />
          {SPEEDS.map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`font-mono text-[11px] px-1.5 py-0.5 rounded transition-colors ${
                speed === s ? 'text-txt bg-surface3' : 'text-txt3 hover:text-txt2'
              }`}
            >
              {s}×
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
