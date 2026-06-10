import type { Metadata } from 'next'
import Topbar from '@/components/layout/Topbar'
import PageWrapper from '@/components/layout/PageWrapper'
import SectionEyebrow from '@/components/shared/SectionEyebrow'
import ConceptCatalog from '@/components/pages/ConceptCatalog'
import { ANIM_LIST } from '@/lib/anim'

export const metadata: Metadata = {
  title: 'Concept Library',
  description: 'A visual glossary of core AI engineering concepts, each shown as a looping animated explainer.',
}

export default function ConceptsPage() {
  return (
    <>
      <Topbar
        title="Concept Library"
        subtitle="Core ideas, animated — a visual glossary"
        chips={[{ label: `${ANIM_LIST.length} concepts`, variant: 'purple' }, { label: 'animated', variant: 'amber' }]}
      />
      <PageWrapper>
        <div className="mb-6">
          <SectionEyebrow text="Learn by watching" />
          <h1 className="heading-display text-3xl md:text-4xl text-txt mt-2 text-balance">
            Every core concept, in motion.
          </h1>
          <p className="text-[14px] text-txt2 mt-3 max-w-2xl leading-relaxed text-pretty">
            Each animation is a deterministic loop that respects reduced-motion. They power the per-week explainers
            across the roadmap — browse them all here.
          </p>
        </div>
        <ConceptCatalog />
      </PageWrapper>
    </>
  )
}
