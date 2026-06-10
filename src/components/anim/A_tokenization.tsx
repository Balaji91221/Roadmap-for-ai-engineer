'use client'

import type { AnimSpec } from '@/lib/anim/types'
import { clamp01 } from '@/lib/anim/util'
import { Label, Title } from './_primitives'

// Concept · Tokenization — text is split into tokens, each mapped to an integer id.
const TOKENS = ['Trans', 'former', 's', ' are', ' power', 'ful']
const IDS = [1207, 671, 82, 553, 1809, 1043]
const X0 = 40
const TW = 78

export const A_tokenization: AnimSpec = {
  id: 'A_tokenization',
  title: 'Tokenization',
  caption: 'Raw text is broken into sub-word tokens, then each token is mapped to a numeric id the model reads.',
  draw: (t, { color }) => {
    const revealed = clamp01(t / 0.85) * TOKENS.length

    return (
      <>
        <Title text="Tokenization" color={color} />
        <Label x={40} y={70} text='"Transformers are powerful"' anchor="start" color="var(--color-txt2)" size={12} />

        {TOKENS.map((tok, i) => {
          const show = revealed > i
          const idShow = revealed > i + 0.5
          const x = X0 + i * TW
          return (
            <g key={i} opacity={show ? 1 : 0.18}>
              <rect x={x} y={110} width={TW - 8} height={34} rx={7} fill={show ? `${color}1A` : 'var(--color-surface2)'} stroke={show ? color : 'var(--color-border2)'} strokeWidth={show ? 1.6 : 1} />
              <text x={x + (TW - 8) / 2} y={131} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={11} fill="var(--color-txt)">
                {tok.trim() || '␣'}
              </text>
              <rect x={x} y={158} width={TW - 8} height={26} rx={6} fill="var(--color-surface3)" opacity={idShow ? 1 : 0.2} />
              <text x={x + (TW - 8) / 2} y={175} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={10} fill={idShow ? color : 'var(--color-txt3)'}>
                {IDS[i]}
              </text>
            </g>
          )
        })}
        <Label x={40} y={205} text="token ids →" anchor="start" />
      </>
    )
  },
}

export default A_tokenization
