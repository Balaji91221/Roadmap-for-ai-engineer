'use client'

import type { AnimSpec } from '@/lib/anim/types'
import { clamp01, segment } from '@/lib/anim/util'
import { Box, Edge, Title } from './_primitives'

// Concept · CI/CD — a commit flows through build → test → deploy, each gate passing in turn.
const STAGES = ['Commit', 'Build', 'Test', 'Deploy']
const BW = 108
const GAP = 24
const X0 = 22
const CY = 124

export const A_cicd: AnimSpec = {
  id: 'A_cicd',
  title: 'CI/CD Pipeline',
  caption: 'Every commit is automatically built, tested, and deployed — each stage gating the next.',
  draw: (t, { color }) => {
    const { index } = segment(clamp01(t / 0.92), STAGES.length)

    return (
      <>
        <Title text="CI/CD Pipeline" color={color} />
        {STAGES.slice(0, -1).map((_, i) => (
          <Edge
            key={i}
            x1={X0 + i * (BW + GAP) + BW}
            y1={CY}
            x2={X0 + (i + 1) * (BW + GAP)}
            y2={CY}
            color={index > i ? 'var(--color-green)' : 'var(--color-border3)'}
            width={index > i ? 2 : 1.2}
            arrow
          />
        ))}
        {STAGES.map((s, i) => {
          const passed = index > i
          const current = index === i
          return (
            <g key={i}>
              <Box x={X0 + i * (BW + GAP)} y={CY - 28} w={BW} h={56} label={s} color={current ? color : passed ? 'var(--color-green)' : color} active={current || passed} />
              {passed && (
                <text x={X0 + i * (BW + GAP) + BW - 14} y={CY - 14} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={13} fill="var(--color-green)">
                  ✓
                </text>
              )}
            </g>
          )
        })}
      </>
    )
  },
}

export default A_cicd
