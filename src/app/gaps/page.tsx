import type { Metadata } from 'next'
import { Target, ArrowRight } from 'lucide-react'
import Topbar from '@/components/layout/Topbar'
import PageWrapper from '@/components/layout/PageWrapper'
import SectionEyebrow from '@/components/shared/SectionEyebrow'
import { GAPS } from '@/lib/data/gaps'
import { getPriorityColor } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Gap Analysis',
  description: 'The fastest path to close critical AI learning gaps',
}

const TIMELINE = [
  { range: 'Weeks 1–2', title: 'Python foundations', desc: 'Environment setup, language fluency, baseline tooling.', color: '#7C6AF7' },
  { range: 'Weeks 3–6', title: 'Math intuition + baseline ML', desc: 'Linear algebra, stats, classical ML loop.', color: '#22C55E' },
  { range: 'Weeks 7–12', title: 'Core ML projects', desc: 'Real datasets, evaluation rigour, feature engineering.', color: '#F59E0B' },
  { range: 'Weeks 13–18', title: 'Deep learning + transformers', desc: 'PyTorch, attention, transfer learning.', color: '#EC4899' },
  { range: 'Weeks 19–26', title: 'GenAI, RAG, agents', desc: 'LLM apps, retrieval, multi-agent orchestration.', color: '#F97316' },
  { range: 'Weeks 27–32', title: 'MLOps + production', desc: 'Serving, scaling, observability, security.', color: '#2DD4BF' },
]

export default function GapsPage() {
  return (
    <>
      <Topbar
        title="Gap Analysis"
        subtitle="What to learn next and in what order"
        chips={[{ label: `${GAPS.length} gaps`, variant: 'coral' }]}
      />
      <PageWrapper>
        <div className="mb-6">
          <SectionEyebrow text="Identify, prioritize, close" />
          <h1 className="heading-display text-3xl md:text-4xl text-txt mt-2 text-balance">
            The shortest path between you and shipping AI.
          </h1>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {GAPS.map((gap) => {
            const priorityColor = getPriorityColor(gap.priority)
            return (
              <article
                key={gap.area}
                className="relative overflow-hidden rounded-xl border border-border bg-surface card-elevated p-5 hover:border-border2 hover:-translate-y-0.5 transition-all"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: gap.color }} />
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${gap.color}15`, border: `1px solid ${gap.color}30` }}>
                      <Target className="w-3.5 h-3.5" style={{ color: gap.color }} strokeWidth={2} />
                    </div>
                    <h3 className="font-syne font-bold text-[14px] tracking-tight text-txt">{gap.area}</h3>
                  </div>
                  <span
                    className="chip"
                    style={{ background: `${priorityColor}10`, borderColor: `${priorityColor}40`, color: priorityColor }}
                  >
                    {gap.priority}
                  </span>
                </div>
                <p className="text-[11px] text-txt3 font-mono">{gap.time}</p>
                <ul className="mt-3.5 space-y-1.5">
                  {gap.items.map((item, idx) => {
                    const last = idx === gap.items.length - 1
                    return (
                      <li
                        key={item}
                        className={`text-[12.5px] leading-relaxed flex items-start gap-2 ${last ? 'italic text-txt3 pt-2 mt-1 border-t border-border' : 'text-txt2'}`}
                      >
                        {!last && <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: gap.color }} />}
                        <span>{item}</span>
                      </li>
                    )
                  })}
                </ul>
              </article>
            )
          })}
        </section>

        <section className="mt-10">
          <div className="mb-5">
            <SectionEyebrow text="Realistic timeline · Six bands" />
            <h3 className="heading-section text-2xl text-txt mt-2">A pragmatic 32-week ramp.</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {TIMELINE.map((t, i) => (
              <div
                key={t.range}
                className="relative overflow-hidden rounded-xl border border-border bg-surface card-elevated p-4 hover:border-border2 transition-all"
              >
                <div className="absolute top-0 left-0 bottom-0 w-[3px]" style={{ background: t.color }} />
                <div className="pl-3">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: t.color }}>{t.range}</p>
                    <span className="font-mono text-[10px] text-txt3 tabular-nums">0{i + 1}</span>
                  </div>
                  <p className="font-syne font-bold text-[14px] tracking-tight text-txt mt-2">{t.title}</p>
                  <p className="text-[12px] text-txt2 mt-1.5 leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-accent/25 bg-gradient-to-br from-accent/8 via-surface to-teal/5 p-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-syne font-bold text-base tracking-tight text-txt">Next step</p>
            <p className="text-[13px] text-txt2 mt-1.5 max-w-xl leading-relaxed">
              Open the roadmap, filter by Beginner, and pick the first division. Block 8 hours this week.
            </p>
          </div>
          <a href="/roadmap" className="btn-primary shrink-0">
            Open the roadmap
            <ArrowRight className="w-4 h-4" />
          </a>
        </section>
      </PageWrapper>
    </>
  )
}
