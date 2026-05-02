import type { Metadata } from 'next'
import Topbar from '@/components/layout/Topbar'
import PageWrapper from '@/components/layout/PageWrapper'
import SectionEyebrow from '@/components/shared/SectionEyebrow'
import { DAILY_THEMES } from '@/lib/data/content'

export const metadata: Metadata = {
  title: 'Daily Themes',
  description: 'A weekly posting cadence to stay consistent',
}

const ROWS = [
  ['Monday', 'Build in Public', 'Share your current roadmap setup', 'Carousel'],
  ['Tuesday', 'Concept Deep Dive', 'Explain one agent protocol', 'Thread'],
  ['Wednesday', 'Tool Breakdown', 'Cursor feature walkthrough', 'Video'],
  ['Thursday', 'System Design', 'RAG architecture post', 'Diagram'],
  ['Friday', 'Career Signal', 'Salary ladder insight', 'Text post'],
  ['Saturday', 'Quickfire', '5 mini lessons from the week', 'Listicle'],
  ['Sunday', 'Reflection', 'Wins + misses + next sprint', 'Reflection'],
]

const DAY_COLORS = ['#7C6AF7', '#2DD4BF', '#F59E0B', '#EC4899', '#22C55E', '#F97316', '#0EA5E9']

export default function DailyPage() {
  return (
    <>
      <Topbar
        title="Daily Themes"
        subtitle="A repeatable weekly posting rhythm"
        chips={[{ label: '7 days', variant: 'teal' }]}
      />
      <PageWrapper>
        <div className="mb-6">
          <SectionEyebrow text="Consistency by design" />
          <h1 className="heading-display text-3xl md:text-4xl text-txt mt-2 text-balance">
            Show up every day. With a plan.
          </h1>
          <p className="text-[14px] text-txt2 mt-2 max-w-2xl">
            Seven themes — one per day — so you never wonder what to post. Each theme is sized for a 30-min slot.
          </p>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          {DAILY_THEMES.map((d, i) => {
            const accent = DAY_COLORS[i % DAY_COLORS.length]
            return (
              <div
                key={d.day}
                className="relative overflow-hidden rounded-xl border border-border bg-surface card-elevated p-5 hover:border-border2 hover:-translate-y-0.5 transition-all"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: accent }} />
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-txt3">{d.day}</p>
                  <span className="text-xl">{d.emoji}</span>
                </div>
                <h3 className="font-syne font-bold text-[15px] tracking-tight mt-2.5" style={{ color: accent }}>
                  {d.label}
                </h3>
                <p className="text-[12.5px] text-txt2 mt-1.5 leading-relaxed">{d.desc}</p>
              </div>
            )
          })}
        </section>

        <section className="mt-8 rounded-2xl border border-border bg-surface card-elevated overflow-hidden">
          <div className="grid grid-cols-[80px_140px_1fr_120px] text-[11px] font-mono uppercase tracking-widest text-txt3 bg-surface2/60 border-b border-border px-4 py-3">
            <p>Day</p>
            <p>Theme</p>
            <p>Post idea</p>
            <p>Format</p>
          </div>
          {ROWS.map((r, i) => (
            <div
              key={r[0]}
              className={`grid grid-cols-[80px_140px_1fr_120px] text-[12.5px] px-4 py-3 border-b border-border last:border-b-0 ${i % 2 ? 'bg-surface' : 'bg-surface2/30'}`}
            >
              <p className="text-txt2 font-medium">{r[0]}</p>
              <p className="text-accent2 font-syne font-bold">{r[1]}</p>
              <p className="text-txt2">{r[2]}</p>
              <p className="text-txt3 font-mono text-[11px]">{r[3]}</p>
            </div>
          ))}
        </section>
      </PageWrapper>
    </>
  )
}
