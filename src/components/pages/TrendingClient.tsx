'use client'

import Link from 'next/link'
import { Flame, ArrowUpRight } from 'lucide-react'
import Topbar from '@/components/layout/Topbar'
import PageWrapper from '@/components/layout/PageWrapper'
import SectionEyebrow from '@/components/shared/SectionEyebrow'
import { TRENDING } from '@/lib/data/trending'

export default function TrendingClient() {
  return (
    <>
      <Topbar
        title="Trending Topics"
        subtitle="High-signal post opportunities"
        chips={[{ label: `${TRENDING.length} topics`, variant: 'pink' }]}
      />
      <PageWrapper>
        <div className="mb-6">
          <SectionEyebrow text="What's hot in AI right now" />
          <h1 className="heading-display text-3xl md:text-4xl text-txt mt-2 text-balance">
            Trending topics with built-in audience.
          </h1>
          <p className="text-[14px] text-txt2 mt-2 max-w-2xl">
            Click a topic to open its full breakdown — hooks, comparison framing, post ideas, and a curated resource shortlist.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3">
          {TRENDING.map((topic) => (
            <Link
              key={topic.id}
              href={`/trending/${topic.id}`}
              className="group relative overflow-hidden text-left rounded-xl border border-border bg-surface card-elevated p-5 hover:border-border2 hover:-translate-y-0.5 transition-all"
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-[0.06] blur-2xl pointer-events-none group-hover:opacity-[0.12] transition-opacity"
                style={{ background: topic.color, transform: 'translate(40%, -40%)' }}
              />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-xl"
                    style={{ background: `${topic.color}15`, border: `1px solid ${topic.color}30` }}
                  >
                    {topic.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-syne font-bold text-[14px] tracking-tight" style={{ color: topic.color }}>
                      {topic.label}
                    </h3>
                    <p className="text-[11px] text-txt3 mt-0.5 line-clamp-1">{topic.tagline}</p>
                  </div>
                </div>
                <p className="text-[12.5px] text-txt2 mt-3 leading-relaxed line-clamp-3">{topic.what}</p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                  <span
                    className="chip"
                    style={{ background: `${topic.color}10`, borderColor: `${topic.color}30`, color: topic.color }}
                  >
                    vs {topic.vs}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10.5px] font-medium text-txt3 group-hover:text-pink transition-colors">
                    <Flame className="w-3 h-3" strokeWidth={1.75} /> Open
                    <ArrowUpRight className="w-3 h-3" strokeWidth={2} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </PageWrapper>
    </>
  )
}
