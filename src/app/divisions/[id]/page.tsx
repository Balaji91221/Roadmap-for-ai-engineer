import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Trophy } from 'lucide-react'
import Topbar from '@/components/layout/Topbar'
import PageWrapper from '@/components/layout/PageWrapper'
import SectionEyebrow from '@/components/shared/SectionEyebrow'
import WeekCard from '@/components/shared/WeekCard'
import DivisionOverview from '@/components/pages/DivisionOverview'
import { DIVISIONS } from '@/lib/data/divisions'
import { WEEKS } from '@/lib/data/weeks'

export function generateStaticParams() {
  return DIVISIONS.map((d) => ({ id: String(d.id) }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const division = DIVISIONS.find((d) => d.id === Number(id))
  if (!division) return { title: 'Division not found' }
  return { title: division.name, description: `Division ${division.id}: ${division.use}` }
}

export default async function DivisionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const divId = Number(id)
  const division = DIVISIONS.find((d) => d.id === divId)
  if (!division) notFound()

  const weeks = WEEKS.filter((w) => w.div === divId).sort((a, b) => a.week - b.week)

  return (
    <>
      <Topbar
        title={division.name}
        subtitle={`Division ${division.id} · ${division.use}`}
        chips={[
          { label: `${weeks.length} weeks`, variant: 'purple' },
          { label: `Division ${division.id}`, variant: 'teal' },
        ]}
      />
      <PageWrapper>
        <Link href="/divisions" className="inline-flex items-center gap-1.5 text-[12.5px] text-txt2 hover:text-txt transition-colors mb-5">
          <ArrowLeft className="w-3.5 h-3.5" />
          All divisions
        </Link>

        <DivisionOverview divId={divId} />

        <div className="flex items-end justify-between mb-4">
          <div>
            <SectionEyebrow text="Curriculum" />
            <h2 className="heading-section text-xl text-txt mt-2">{weeks.length} weeks in this division</h2>
          </div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3 stagger">
          {weeks.map((w) => (
            <WeekCard key={w.week} week={w} />
          ))}
        </div>

        {division.capstone && (
          <div className="mt-8 rounded-2xl border-2 border-dashed border-border bg-surface card-elevated p-6 md:p-8">
            <div className="flex items-center gap-2.5 mb-3">
              <Trophy className="w-5 h-5 text-amber" strokeWidth={1.75} />
              <p className="eyebrow">Division capstone</p>
            </div>
            <h3 className="heading-section text-xl text-txt">{division.capstone.name}</h3>
            <p className="text-txt2 text-[13.5px] mt-2 leading-relaxed max-w-3xl">{division.capstone.description}</p>
            <Link href="/capstones" className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-full text-white font-semibold text-[13px] hover:scale-[1.02] transition-transform" style={{ background: division.color, boxShadow: `0 8px 24px -8px ${division.color}80` }}>
              View capstone requirements
            </Link>
          </div>
        )}
      </PageWrapper>
    </>
  )
}
