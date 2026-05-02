import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Flame } from 'lucide-react'
import Topbar from '@/components/layout/Topbar'
import PageWrapper from '@/components/layout/PageWrapper'
import Callout from '@/components/shared/Callout'
import SectionEyebrow from '@/components/shared/SectionEyebrow'
import { TRENDING } from '@/lib/data/trending'

export function generateStaticParams() {
  return TRENDING.map((t) => ({ id: t.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const topic = TRENDING.find((t) => t.id === id)
  if (!topic) return { title: 'Trending topic not found' }
  return { title: topic.label, description: topic.tagline }
}

export default async function TrendingTopicPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const topic = TRENDING.find((t) => t.id === id)
  if (!topic) notFound()

  const idx = TRENDING.findIndex((t) => t.id === id)
  const prev = idx > 0 ? TRENDING[idx - 1] : null
  const next = idx < TRENDING.length - 1 ? TRENDING[idx + 1] : null

  return (
    <>
      <Topbar
        title={topic.label}
        subtitle={topic.tagline}
        chips={[{ label: `vs ${topic.vs}`, variant: 'pink' }]}
      />
      <PageWrapper>
        <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
          <Link href="/trending" className="inline-flex items-center gap-1.5 text-[12.5px] text-txt2 hover:text-txt transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to trending
          </Link>
          <span className="text-[11px] font-mono text-txt3 tabular-nums">
            Topic {idx + 1} of {TRENDING.length}
          </span>
        </div>

        <section className="relative overflow-hidden rounded-2xl border border-border bg-surface card-elevated p-6 md:p-8 mb-6">
          <div className="absolute -right-20 -top-20 w-[300px] h-[300px] rounded-full opacity-[0.1] blur-3xl pointer-events-none" style={{ background: topic.color }} />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: `${topic.color}15`, border: `1px solid ${topic.color}30` }}
              >
                {topic.icon}
              </div>
              <SectionEyebrow text={`Trending · ${topic.id}`} />
            </div>
            <h1 className="heading-display text-3xl md:text-5xl text-txt text-balance" style={{ color: topic.color }}>
              {topic.label}
            </h1>
            <p className="text-[14px] md:text-[15px] text-txt2 mt-3 leading-relaxed max-w-3xl">{topic.tagline}</p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="space-y-4">
            <div
              className="rounded-2xl border bg-surface card-elevated p-5"
              style={{ borderColor: `${topic.color}33` }}
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-txt3 mb-2">What it is</p>
              <p className="text-[13.5px] text-txt2 leading-relaxed">{topic.what}</p>
            </div>
            <div className="rounded-2xl border border-border bg-surface card-elevated p-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-txt3 mb-2">
                {topic.label} vs {topic.vs}
              </p>
              <p className="text-[13.5px] text-txt2 leading-relaxed">{topic.vsDetail}</p>
            </div>
            <Callout variant="teal">{topic.postIdea}</Callout>
            <div className="rounded-2xl border border-border bg-surface card-elevated p-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-txt3 mb-3">Hashtags</p>
              <p className="font-mono text-[12.5px] text-accent2 leading-relaxed">{topic.hashtags}</p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <SectionEyebrow text="Hooks" />
              <h3 className="heading-section text-xl text-txt mt-2 mb-3 flex items-center gap-2">
                <Flame className="w-4 h-4 text-pink" strokeWidth={1.75} />
                Plug-and-play openers
              </h3>
              <div className="space-y-2">
                {topic.hooks.map((h) => (
                  <blockquote
                    key={h}
                    className="text-[13.5px] italic text-txt2 bg-accent/8 border-l-2 border-accent/40 rounded-r-lg px-4 py-3"
                  >
                    &ldquo;{h}&rdquo;
                  </blockquote>
                ))}
              </div>
            </div>

            <div>
              <SectionEyebrow text="Resources" />
              <h3 className="heading-section text-xl text-txt mt-2 mb-3">Where to learn more</h3>
              <ul className="space-y-2">
                {topic.resources.map((r) => (
                  <li
                    key={r}
                    className="flex items-center gap-2.5 text-[13px] text-txt2 bg-surface card-elevated border border-border rounded-lg px-3.5 py-2.5"
                  >
                    <ArrowRight className="w-3 h-3 text-txt3 shrink-0" /> {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-3">
          {prev ? (
            <Link
              href={`/trending/${prev.id}`}
              className="group rounded-xl border border-border bg-surface card-elevated p-4 hover:border-border2 hover:-translate-y-0.5 transition-all"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-txt3 flex items-center gap-1.5">
                <ArrowLeft className="w-3 h-3" /> Previous topic
              </p>
              <p className="font-syne font-bold text-[14px] tracking-tight text-txt mt-1.5 group-hover:text-accent2 transition-colors">
                {prev.icon} {prev.label}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/trending/${next.id}`}
              className="group rounded-xl border border-border bg-surface card-elevated p-4 hover:border-border2 hover:-translate-y-0.5 transition-all md:text-right"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-txt3 flex items-center gap-1.5 md:justify-end">
                Next topic <ArrowRight className="w-3 h-3" />
              </p>
              <p className="font-syne font-bold text-[14px] tracking-tight text-txt mt-1.5 group-hover:text-accent2 transition-colors">
                {next.icon} {next.label}
              </p>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </PageWrapper>
    </>
  )
}
