import type { Metadata } from 'next'
import RoadmapClient from '@/components/pages/RoadmapClient'
import { WEEKS } from '@/lib/data/weeks'

export const metadata: Metadata = {
  title: 'Roadmap | Learn Everything',
  description: `Interactive ${WEEKS.length}-week AI learning roadmap`,
}

export default function RoadmapPage() {
  return <RoadmapClient />
}
