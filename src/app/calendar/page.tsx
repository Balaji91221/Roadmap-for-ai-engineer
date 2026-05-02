import type { Metadata } from 'next'
import RoadmapClient from '@/components/pages/RoadmapClient'
import { WEEKS } from '@/lib/data/weeks'

export const metadata: Metadata = {
  title: 'Calendar | Learn Everything',
  description: `${WEEKS.length}-week LinkedIn content calendar`,
}

export default function CalendarPage() {
  return <RoadmapClient calendar />
}
