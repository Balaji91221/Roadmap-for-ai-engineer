import type { Metadata } from 'next'
import Topbar from '@/components/layout/Topbar'
import PageWrapper from '@/components/layout/PageWrapper'
import RoadmapMap from '@/components/shared/RoadmapMap'
import { WEEKS } from '@/lib/data/weeks'
import { DIVISIONS } from '@/lib/data/divisions'

export const metadata: Metadata = {
  title: 'Roadmap Map',
  description: 'An interactive, pannable map of all 84 weeks across 8 divisions with prerequisite links and progress.',
}

export default function MapPage() {
  return (
    <>
      <Topbar
        title="Roadmap Map"
        subtitle="The whole journey at a glance — pan, zoom, and open any week"
        chips={[
          { label: `${WEEKS.length} weeks`, variant: 'purple' },
          { label: `${DIVISIONS.length} divisions`, variant: 'teal' },
          { label: 'interactive', variant: 'amber' },
        ]}
      />
      <PageWrapper>
        <RoadmapMap />
      </PageWrapper>
    </>
  )
}
