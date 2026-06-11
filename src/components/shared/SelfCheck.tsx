'use client'

import { useState } from 'react'
import { Brain, Check, RotateCw, ChevronRight, Sparkles } from 'lucide-react'

/**
 * Active-recall deck built from a topic's interview questions. No fake auto-grading — the user
 * reflects, reveals a prompt, and self-rates. Honest and interactive.
 */
export default function SelfCheck({ questions, color }: { questions: string[]; color: string }) {
  const [i, setI] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [got, setGot] = useState<Set<number>>(new Set())
  const [done, setDone] = useState(false)

  if (questions.length === 0) return null

  const rate = (ok: boolean) => {
    setGot((prev) => {
      const next = new Set(prev)
      if (ok) next.add(i)
      else next.delete(i)
      return next
    })
    if (i + 1 >= questions.length) setDone(true)
    else {
      setI(i + 1)
      setRevealed(false)
    }
  }

  if (done) {
    const score = got.size
    return (
      <div className="rounded-2xl border border-border bg-surface card-elevated p-6 text-center">
        <div className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center mb-3" style={{ background: `${color}1A`, border: `1px solid ${color}40` }}>
          <Sparkles className="w-6 h-6" style={{ color }} />
        </div>
        <p className="heading-section text-xl text-txt">Recall complete</p>
        <p className="text-[13px] text-txt2 mt-1.5">
          You felt confident on <span className="font-bold text-txt">{score}</span> of {questions.length}.
        </p>
        <button
          onClick={() => {
            setI(0)
            setRevealed(false)
            setGot(new Set())
            setDone(false)
          }}
          className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 rounded-full text-[12.5px] font-semibold text-white"
          style={{ background: color }}
        >
          <RotateCw className="w-3.5 h-3.5" /> Run again
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border bg-surface card-elevated p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4" style={{ color }} />
          <p className="eyebrow">Test yourself · active recall</p>
        </div>
        <div className="flex items-center gap-1">
          {questions.map((_, qi) => (
            <span
              key={qi}
              className="w-1.5 h-1.5 rounded-full transition-colors"
              style={{ background: qi === i ? color : got.has(qi) ? 'var(--color-green)' : 'var(--color-surface3)' }}
            />
          ))}
        </div>
      </div>

      <div className="min-h-[120px] rounded-xl border border-border bg-surface2/40 p-5 flex flex-col">
        <span className="font-mono text-[11px] mb-2.5 px-2 py-0.5 rounded self-start" style={{ background: `${color}1A`, color }}>
          Q{i + 1} / {questions.length}
        </span>
        <p className="text-txt text-[15px] font-medium leading-relaxed">{questions[i]}</p>
        {revealed && (
          <p className="text-txt3 text-[12.5px] mt-3 leading-relaxed animate-fade-in border-t border-border pt-3">
            Explain it out loud as if to an interviewer — define the term, give one concrete example, and name one
            trade-off. Then rate your recall.
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 mt-4">
        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[12.5px] font-semibold text-white"
            style={{ background: color }}
          >
            Reveal prompt <ChevronRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <>
            <button
              onClick={() => rate(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[12.5px] font-semibold bg-green/15 text-green border border-green/30 hover:bg-green/25 transition-colors"
            >
              <Check className="w-3.5 h-3.5" /> Got it
            </button>
            <button
              onClick={() => rate(false)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[12.5px] font-semibold bg-surface2 text-txt2 border border-border hover:text-txt transition-colors"
            >
              <RotateCw className="w-3.5 h-3.5" /> Review again
            </button>
          </>
        )}
      </div>
    </div>
  )
}
