'use client'

import { useProgress } from '@/contexts/ProgressContext'
import AnimationFrame from '@/components/shared/AnimationFrame'
import ProgressRing from '@/components/shared/ProgressRing'
import SectionEyebrow from '@/components/shared/SectionEyebrow'
import { ANIM } from '@/lib/anim'
import { DIVISIONS } from '@/lib/data/divisions'

/** Animated header for a dedicated division page: explainer + live progress ring. */
export default function DivisionOverview({ divId }: { divId: number }) {
  const { hydrated, divisionProgress } = useProgress()
  const division = DIVISIONS.find((d) => d.id === divId)
  const anim = ANIM[divId]
  if (!division || !anim) return null
  const p = divisionProgress(divId)

  return (
    <section className="rounded-2xl border border-border bg-surface card-elevated p-5 md:p-6 mb-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,440px)] gap-6 items-center">
        <div>
          <SectionEyebrow text={`Division ${division.id}`} />
          <h1 className="heading-display text-3xl md:text-4xl mt-2" style={{ color: division.color }}>
            {division.name}
          </h1>
          <p className="text-[14px] text-txt2 mt-2.5 leading-relaxed">{division.use}</p>
          <p className="text-[12.5px] text-txt3 mt-3 leading-relaxed">
            {anim.title} — {anim.caption}
          </p>

          <div className="flex items-center gap-4 mt-5">
            <ProgressRing pct={hydrated ? p.pct : 0} size={64} stroke={6} color={division.color}>
              <span className="font-syne font-bold text-[13px] tabular-nums" style={{ color: division.color }}>
                {hydrated ? `${p.pct}%` : '—'}
              </span>
            </ProgressRing>
            <div>
              <p className="font-syne font-bold text-[15px] text-txt tabular-nums">
                {hydrated ? `${p.done} / ${p.total}` : `${division.topics}`} weeks
              </p>
              <p className="text-[11.5px] text-txt3 mt-0.5">{hydrated ? 'completed in this division' : 'in this division'}</p>
            </div>
          </div>
        </div>
        <AnimationFrame anim={anim} color={division.color} />
      </div>
    </section>
  )
}
