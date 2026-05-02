import type { Metadata } from 'next'
import { Building2, Newspaper } from 'lucide-react'
import Topbar from '@/components/layout/Topbar'
import PageWrapper from '@/components/layout/PageWrapper'
import ProgressBar from '@/components/shared/ProgressBar'
import SectionEyebrow from '@/components/shared/SectionEyebrow'
import { PILLARS } from '@/lib/data/content'

export const metadata: Metadata = {
  title: 'Content Pillars',
  description: 'Balanced content mix for authority and consistency',
}

const SOURCES = [
  { category: 'Research', list: ['arXiv', 'Papers With Code', 'Google Research Blog'] },
  { category: 'Engineering', list: ['GitHub Trending', 'Hugging Face Blog', 'LangChain docs'] },
  { category: 'Product', list: ['OpenAI updates', 'Anthropic updates', 'Vercel AI'] },
  { category: 'Career', list: ['LinkedIn creators', 'Hiring reports', 'Newsletters'] },
]

export default function PillarsPage() {
  return (
    <>
      <Topbar
        title="Content Pillars"
        subtitle="Strategic distribution of your output"
        chips={[{ label: `${PILLARS.length} pillars`, variant: 'amber' }]}
      />
      <PageWrapper>
        <div className="mb-6">
          <SectionEyebrow text="Authority by composition" />
          <h1 className="heading-display text-3xl md:text-4xl text-txt mt-2 text-balance">
            A content mix that builds authority.
          </h1>
          <p className="text-[14px] text-txt2 mt-2 max-w-2xl">
            Five pillars, weighted by leverage. Stick to the percentages and your feed reads as senior, not sporadic.
          </p>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {PILLARS.map((p) => (
            <article
              key={p.name}
              className="relative overflow-hidden rounded-xl border border-border bg-surface card-elevated p-5 hover:border-border2 hover:-translate-y-0.5 transition-all"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: p.color }} />
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${p.color}15`, border: `1px solid ${p.color}30` }}>
                    <Building2 className="w-3.5 h-3.5" style={{ color: p.color }} strokeWidth={1.75} />
                  </div>
                  <h3 className="font-syne font-bold text-[14px] tracking-tight text-txt">{p.name}</h3>
                </div>
                <span className="font-syne font-extrabold text-xl tracking-tight tabular-nums" style={{ color: p.color }}>
                  {p.pct}%
                </span>
              </div>
              <ProgressBar value={p.pct} color={p.color} height={5} />
              <p className="text-[12.5px] text-txt2 mt-3 leading-relaxed">{p.desc}</p>
            </article>
          ))}
        </section>

        <section className="mt-10">
          <div className="mb-5">
            <SectionEyebrow text="Where to source signal" />
            <h3 className="heading-section text-2xl text-txt mt-2 flex items-center gap-2.5">
              <Newspaper className="w-5 h-5 text-teal" strokeWidth={1.75} />
              News sources
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {SOURCES.map((s) => (
              <div
                key={s.category}
                className="rounded-xl border border-border bg-surface card-elevated p-4 hover:border-border2 transition-all"
              >
                <p className="font-mono text-[10px] uppercase tracking-widest text-txt3 mb-1.5">Category</p>
                <h4 className="font-syne font-bold text-[14px] tracking-tight text-txt">{s.category}</h4>
                <ul className="mt-3 space-y-1.5 text-[12.5px] text-txt2">
                  {s.list.map((x) => (
                    <li key={x} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-teal" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </PageWrapper>
    </>
  )
}
