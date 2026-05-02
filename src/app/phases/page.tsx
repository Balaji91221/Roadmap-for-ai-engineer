import type { Metadata } from 'next'
import PhasesClient from '@/components/pages/PhasesClient'

export const metadata: Metadata = {
  title: 'Learning Phases | Learn Everything',
  description: 'Interactive phase-based AI mastery path',
}

export default function PhasesPage() {
  return <PhasesClient />
}
