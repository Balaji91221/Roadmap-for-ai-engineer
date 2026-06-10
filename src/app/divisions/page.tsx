import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Topbar from '@/components/layout/Topbar'
import PageWrapper from '@/components/layout/PageWrapper'
import SectionEyebrow from '@/components/shared/SectionEyebrow'
import { DIVISIONS } from '@/lib/data/divisions'
import { WEEKS } from '@/lib/data/weeks'
import { ANIM } from '@/lib/anim'

export const metadata: Metadata = {
  title: 'Divisions',
  description: 'The 8 divisions of the AI engineering curriculum, each with an animated concept explainer.',
}

export default function DivisionsPage() {
  return (
    <>
      <Topbar
        title="Divisions"
        subtitle="Eight stages — each with an animated explainer"
        chips={[
          { label: `${DIVISIONS.length} divisions`, variant: 'purple' },
          { label: `${WEEKS.length} weeks`, variant: 'teal' },
        ]}
      />
      <PageWrapper>
        <div className="mb-6">
          <SectionEyebrow text="The journey, in eight parts" />
          <h1 className="heading-display text-3xl md:text-4xl text-txt mt-2 text-balance">
            Pick a division to explore.
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {DIVISIONS.map((d) => (
            <Link
              key={d.id}
              href={`/divisions/${d.id}`}
              className="group relative overflow-hidden rounded-xl border border-border bg-surface card-elevated p-5 hover:border-border2 hover:-translate-y-0.5 transition-all"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${d.color}, transparent)` }} />
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-widest text-txt3">Div 0{d.id}</p>
                <span className="font-mono text-[10px] text-txt3 tabular-nums">{d.topics} wks</span>
              </div>
              <p className="font-syne font-bold text-[15px] tracking-tight mt-3" style={{ color: d.color }}>
                {d.name}
              </p>
              <p className="text-[11.5px] text-txt2 mt-1.5 leading-relaxed line-clamp-2">{d.use}</p>
              <p className="text-[10.5px] text-txt3 mt-3 font-mono">▶ {ANIM[d.id]?.title}</p>
              <div className="flex items-center gap-1 mt-3 text-[11px] text-txt3 group-hover:text-accent2 transition-colors">
                <span>Open division</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>
      </PageWrapper>
    </>
  )
}
