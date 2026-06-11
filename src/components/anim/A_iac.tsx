'use client'

import type { AnimSpec } from '@/lib/anim/types'
import { segment } from '@/lib/anim/util'
import { Box, Edge, Label, Title } from './_primitives'

// Concept · Infrastructure as Code — a declarative file provisions real cloud resources, in order.
const RESOURCES = [
  { label: 'VPC', x: 330, y: 70 },
  { label: 'K8s', x: 450, y: 70 },
  { label: 'RDS', x: 330, y: 145 },
  { label: 'S3', x: 450, y: 145 },
]

export const A_iac: AnimSpec = {
  id: 'A_iac',
  title: 'Infrastructure as Code',
  caption: 'A declarative config (Terraform) is applied to provision and version real cloud infrastructure.',
  draw: (t, { color }) => {
    const { index } = segment(t, RESOURCES.length + 1)

    return (
      <>
        <Title text="Infrastructure as Code" color={color} />
        {/* config file */}
        <rect x={50} y={70} width={150} height={120} rx={10} fill="var(--color-surface2)" stroke={color} strokeWidth={1.4} />
        <Label x={125} y={64} text="main.tf" color="var(--color-txt2)" size={10} weight={600} />
        {Array.from({ length: 5 }).map((_, i) => (
          <rect key={i} x={66} y={88 + i * 18} width={i % 2 ? 90 : 118} height={7} rx={2} fill={color} opacity={0.25 + (i % 3) * 0.15} />
        ))}

        <Edge x1={205} y1={130} x2={300} y2={108} color="var(--color-border3)" arrow />
        <Label x={250} y={100} text="apply" color="var(--color-txt3)" size={9} />

        {/* provisioned resources appear in order */}
        {RESOURCES.map((r, i) => (
          <Box key={i} x={r.x - 42} y={r.y - 20} w={84} h={40} label={r.label} color={color} active={index > i} />
        ))}
      </>
    )
  },
}

export default A_iac
