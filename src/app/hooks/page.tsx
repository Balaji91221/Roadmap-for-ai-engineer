import type { Metadata } from 'next'
import { Lightbulb, Zap } from 'lucide-react'
import Topbar from '@/components/layout/Topbar'
import PageWrapper from '@/components/layout/PageWrapper'
import SectionEyebrow from '@/components/shared/SectionEyebrow'
import { HOOKS, QUICKFIRE } from '@/lib/data/content'

export const metadata: Metadata = {
  title: 'Hook Templates',
  description: 'Reusable hook patterns and quick-fire post ideas',
}

export default function HooksPage() {
  return (
    <>
      <Topbar
        title="Hook Templates"
        subtitle="Pattern-based openers that increase engagement"
        chips={[{ label: `${HOOKS.length} templates`, variant: 'pink' }]}
      />
      <PageWrapper>
        <div className="mb-6">
          <SectionEyebrow text="Pattern-based openers" />
          <h1 className="heading-display text-3xl md:text-4xl text-txt mt-2 text-balance">
            Steal the shape. Bring your own substance.
          </h1>
          <p className="text-[14px] text-txt2 mt-2 max-w-2xl">
            Eight reusable patterns proven to lift engagement. Drop in your truth — keep the structure.
          </p>
        </div>

        <section className="grid grid-cols-1 xl:grid-cols-2 gap-3">
          {HOOKS.map((h, i) => (
            <article
              key={h.pattern}
              className="relative overflow-hidden rounded-xl border border-border bg-surface card-elevated p-5 hover:border-border2 hover:-translate-y-0.5 transition-all"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-pink to-transparent" />
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-pink/10 border border-pink/30 flex items-center justify-center">
                    <Lightbulb className="w-3.5 h-3.5 text-pink" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-syne font-bold text-[15px] tracking-tight text-pink">{h.pattern}</h3>
                </div>
                <span className="font-mono text-[10px] text-txt3 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <p className="font-mono text-[12px] bg-surface2/60 border border-border rounded-lg px-3 py-2.5 text-accent2 leading-relaxed">
                {h.template}
              </p>
              <div className="space-y-2 mt-3">
                {h.examples.slice(0, 2).map((e) => (
                  <blockquote
                    key={e}
                    className="italic text-[13px] text-txt2 bg-accent/8 border-l-2 border-accent/40 rounded-r-lg px-4 py-2.5"
                  >
                    &ldquo;{e}&rdquo;
                  </blockquote>
                ))}
              </div>
              <p className="text-[11.5px] text-txt3 border-t border-border mt-4 pt-3 leading-relaxed">{h.why}</p>
            </article>
          ))}
        </section>

        <section className="mt-10">
          <div className="flex items-end justify-between mb-5">
            <div>
              <SectionEyebrow text="When you need ideas fast" />
              <h3 className="heading-section text-2xl text-txt mt-2 flex items-center gap-2.5">
                <Zap className="w-5 h-5 text-amber" strokeWidth={1.75} />
                {QUICKFIRE.length} quick-fire ideas
              </h3>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
            {QUICKFIRE.map((q, i) => (
              <div
                key={q}
                className="flex items-start gap-2.5 rounded-lg border border-border bg-surface card-elevated px-3.5 py-2.5 hover:border-border2 transition-all"
              >
                <span className="font-mono font-bold text-accent2 text-[11px] tabular-nums shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[12.5px] text-txt2 leading-relaxed">{q}</span>
              </div>
            ))}
          </div>
        </section>
      </PageWrapper>
    </>
  )
}
