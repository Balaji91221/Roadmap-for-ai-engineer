'use client'

import AnimationFrame from '@/components/shared/AnimationFrame'
import SectionEyebrow from '@/components/shared/SectionEyebrow'
import { ANIM } from '@/lib/anim'
import { DIVISIONS } from '@/lib/data/divisions'

/** The animated explainer header for a single division (shown when the roadmap is filtered to one). */
export default function DivisionHeader({ divId }: { divId: number }) {
  const division = DIVISIONS.find((d) => d.id === divId)
  const anim = ANIM[divId]
  if (!division || !anim) return null

  return (
    <section className="mb-6 rounded-2xl border border-border bg-surface card-elevated p-5 md:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,440px)] gap-6 items-center">
        <div>
          <SectionEyebrow text={`Division ${division.id} · explainer`} />
          <h2 className="heading-section text-2xl md:text-3xl text-txt mt-2" style={{ color: division.color }}>
            {division.name}
          </h2>
          <p className="text-[14px] text-txt2 mt-2 leading-relaxed">{division.use}</p>
          <p className="text-[12.5px] text-txt3 mt-3 leading-relaxed">
            {anim.title} — {anim.caption}
          </p>
          <p className="font-mono text-[11px] text-txt3 mt-4 tabular-nums">{division.topics} weeks in this division</p>
        </div>
        <AnimationFrame anim={anim} color={division.color} />
      </div>
    </section>
  )
}
