'use client'

import { AlertTriangle, RotateCcw } from 'lucide-react'

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="px-4 md:px-6 lg:px-8 py-12 max-w-[1400px] mx-auto">
      <div className="max-w-lg rounded-2xl border border-rose/30 bg-surface card-elevated p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose/15 border border-rose/30 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-rose" strokeWidth={1.75} />
          </div>
          <h2 className="font-syne font-bold text-xl tracking-tight text-txt">Something went wrong</h2>
        </div>
        <p className="text-[13.5px] text-txt2 mt-3 leading-relaxed">
          We hit an unexpected error rendering this page. Try resetting — if it persists, refresh or report it.
        </p>
        <button
          onClick={reset}
          className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/15 border border-accent/30 text-accent2 text-[12.5px] font-semibold hover:bg-accent/20 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Try again
        </button>
      </div>
    </div>
  )
}
