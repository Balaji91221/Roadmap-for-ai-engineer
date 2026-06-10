'use client'

import { useRef, useState } from 'react'
import { Download, Upload, RotateCcw, Check, AlertCircle } from 'lucide-react'
import { useProgress } from '@/contexts/ProgressContext'

export default function ProgressControls() {
  const { exportJSON, importJSON, reset, completedCount } = useProgress()
  const fileRef = useRef<HTMLInputElement>(null)
  const [msg, setMsg] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null)

  function flash(kind: 'ok' | 'err', text: string) {
    setMsg({ kind, text })
    window.setTimeout(() => setMsg(null), 3000)
  }

  function handleExport() {
    const blob = new Blob([exportJSON()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ai-roadmap-progress-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    flash('ok', 'Progress exported')
  }

  async function handleImportFile(file: File) {
    try {
      importJSON(await file.text())
      flash('ok', 'Progress imported')
    } catch {
      flash('err', 'Invalid progress file')
    }
  }

  function handleReset() {
    if (completedCount === 0) return
    if (window.confirm(`Reset all progress? This clears ${completedCount} completed week(s).`)) {
      reset()
      flash('ok', 'Progress reset')
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={handleExport}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface text-[12px] font-medium text-txt2 hover:text-txt hover:border-border2 transition-all"
      >
        <Download className="w-3.5 h-3.5" strokeWidth={1.75} /> Export
      </button>
      <button
        onClick={() => fileRef.current?.click()}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface text-[12px] font-medium text-txt2 hover:text-txt hover:border-border2 transition-all"
      >
        <Upload className="w-3.5 h-3.5" strokeWidth={1.75} /> Import
      </button>
      <button
        onClick={handleReset}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface text-[12px] font-medium text-txt3 hover:text-rose hover:border-rose/30 transition-all"
      >
        <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.75} /> Reset
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="application/json,.json"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) handleImportFile(f)
          e.target.value = ''
        }}
      />
      {msg && (
        <span
          className={`inline-flex items-center gap-1.5 text-[11.5px] font-medium ${
            msg.kind === 'ok' ? 'text-green' : 'text-rose'
          }`}
        >
          {msg.kind === 'ok' ? <Check className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
          {msg.text}
        </span>
      )}
    </div>
  )
}
