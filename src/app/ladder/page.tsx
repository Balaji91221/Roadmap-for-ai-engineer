import type { Metadata } from 'next'
import { TrendingUp, IndianRupee } from 'lucide-react'
import Topbar from '@/components/layout/Topbar'
import PageWrapper from '@/components/layout/PageWrapper'
import SectionEyebrow from '@/components/shared/SectionEyebrow'
import { LADDER } from '@/lib/data/ladder'

export const metadata: Metadata = {
  title: 'Career Ladder',
  description: 'Career progression and salary bands for AI roles in India',
}

const PREMIUM_DRIVERS = [
  { title: 'Full-stack execution', desc: 'You can ship complete AI products rather than isolated model demos.' },
  { title: 'Product intuition', desc: 'You understand UX, velocity, and user adoption constraints.' },
  { title: 'Systems thinking', desc: 'Your backend experience maps to agent orchestration and MLOps.' },
  { title: 'Communication leverage', desc: 'You can explain complex AI systems with clarity.' },
]

export default function LadderPage() {
  return (
    <>
      <Topbar
        title="Career Ladder"
        subtitle="From engineer to senior AI engineer"
        chips={[{ label: `${LADDER.length} steps`, variant: 'green' }]}
      />
      <PageWrapper className="max-w-4xl">
        <div className="mb-6">
          <SectionEyebrow text="Career bands · India CTC" />
          <h1 className="heading-display text-3xl md:text-4xl text-txt mt-2 text-balance">
            From your first AI role to architect.
          </h1>
          <p className="text-[14px] text-txt2 mt-2 max-w-2xl">
            Six steps, real salary bands, and the signal each level demands. Use this to target — not to copy.
          </p>
        </div>

        <ol className="relative">
          {LADDER.map((step, i) => (
            <li key={step.title} className="flex gap-4 items-stretch pb-3 last:pb-0">
              <div className="w-10 flex-shrink-0 flex flex-col items-center pt-5 relative">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0 z-10 ring-4"
                  style={{ background: step.color, boxShadow: `0 0 0 4px ${step.color}20` }}
                />
                {i < LADDER.length - 1 && <div className="w-px flex-1 bg-border mt-2" />}
              </div>
              <div className="flex-1 relative overflow-hidden rounded-xl border border-border bg-surface card-elevated p-5 flex justify-between items-center gap-4 flex-wrap hover:border-border2 hover:-translate-y-0.5 transition-all">
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${step.color}, transparent)` }} />
                <div className="min-w-0">
                  <p
                    className="font-mono text-[10px] uppercase tracking-widest font-medium"
                    style={{ color: step.color }}
                  >
                    {step.years}
                  </p>
                  <h3 className="font-syne font-bold text-[16px] tracking-tight text-txt mt-1.5">{step.title}</h3>
                  <p className="text-[12.5px] text-txt2 italic mt-1">{step.note}</p>
                </div>
                <div
                  className="px-4 py-3 rounded-xl text-center flex-shrink-0 border"
                  style={{ background: `${step.color}10`, borderColor: `${step.color}30` }}
                >
                  <div className="flex items-center gap-1 justify-center">
                    <IndianRupee className="w-3 h-3" style={{ color: step.color }} />
                    <p className="font-syne font-extrabold text-[15px] tracking-tight tabular-nums" style={{ color: step.color }}>
                      {step.salary}
                    </p>
                  </div>
                  <p className="font-mono text-[9px] tracking-widest text-txt3 mt-1">INDIA CTC</p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <section className="mt-10 rounded-2xl border border-border bg-surface card-elevated p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-lg bg-accent/15 border border-accent/25 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-accent2" strokeWidth={1.75} />
            </div>
            <h3 className="heading-section text-xl text-txt">Why your profile commands premium.</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PREMIUM_DRIVERS.map((d) => (
              <div key={d.title} className="rounded-xl border border-border bg-surface2/40 p-4 hover:border-border2 transition-all">
                <p className="font-syne font-bold text-[13.5px] tracking-tight text-txt">{d.title}</p>
                <p className="text-[12.5px] text-txt2 mt-1.5 leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </PageWrapper>
    </>
  )
}
