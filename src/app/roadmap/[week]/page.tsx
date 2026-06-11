import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Topbar from '@/components/layout/Topbar'
import PageWrapper from '@/components/layout/PageWrapper'
import TopicLab from '@/components/pages/TopicLab'
import { WEEKS } from '@/lib/data/weeks'
import { DIVISIONS } from '@/lib/data/divisions'
import { getDifficultyColor } from '@/lib/utils'

type Variant = 'purple' | 'teal' | 'amber' | 'green' | 'coral' | 'pink' | 'sky' | 'rose'

const DIFFICULTY_VARIANT: Record<string, Variant> = {
  beginner: 'green',
  intermediate: 'sky',
  advanced: 'coral',
  expert: 'purple',
}

export function generateStaticParams() {
  return WEEKS.map((w) => ({ week: String(w.week) }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ week: string }>
}): Promise<Metadata> {
  const { week } = await params
  const weekItem = WEEKS.find((w) => w.week === Number(week))
  if (!weekItem) return { title: 'Week not found' }
  return {
    title: `Week ${weekItem.week} · ${weekItem.topic}`,
    description: weekItem.intro,
  }
}

export default async function WeekDetailPage({
  params,
}: {
  params: Promise<{ week: string }>
}) {
  const { week } = await params
  const weekNum = Number(week)
  if (Number.isNaN(weekNum)) notFound()

  const weekItem = WEEKS.find((w) => w.week === weekNum)
  if (!weekItem) notFound()

  const division = DIVISIONS.find((d) => d.id === weekItem.div)
  const diffLabel = getDifficultyColor(weekItem.difficulty).label
  const diffVariant = DIFFICULTY_VARIANT[weekItem.difficulty] ?? 'purple'

  return (
    <>
      <Topbar
        title={`Week ${weekItem.week}`}
        subtitle={`${weekItem.topic} · ${division?.name ?? 'Division'}`}
        chips={[
          { label: diffLabel, variant: diffVariant },
          { label: `~${Math.round(weekItem.effort * 8)}h`, variant: 'amber' },
          { label: `Div ${weekItem.div}`, variant: 'teal' },
        ]}
      />
      <PageWrapper>
        <TopicLab week={weekItem} />
      </PageWrapper>
    </>
  )
}
