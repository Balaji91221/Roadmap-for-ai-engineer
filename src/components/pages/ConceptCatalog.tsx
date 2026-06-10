'use client'

import AnimationFrame from '@/components/shared/AnimationFrame'
import { ANIM_LIST } from '@/lib/anim'

// A varied, on-brand palette drawn from the theme + division tokens.
const PALETTE = ['#10B981', '#6366F1', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#0EA5E9', '#F97316', '#2DD4BF', '#A594FF']

/** Browsable visual glossary — every concept animation in the library. */
export default function ConceptCatalog() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {ANIM_LIST.map((anim, i) => (
        <div key={anim.id} className="rounded-2xl border border-border bg-surface card-elevated p-4">
          <h3 className="heading-section text-[15px] text-txt mb-3" style={{ color: PALETTE[i % PALETTE.length] }}>
            {anim.title}
          </h3>
          <AnimationFrame anim={anim} color={PALETTE[i % PALETTE.length]} />
        </div>
      ))}
    </div>
  )
}
