import { NextRequest, NextResponse } from 'next/server'
import { WEEKS } from '@/lib/data/weeks'

export function GET(req: NextRequest) {
  const div = req.nextUrl.searchParams.get('div')
  const data = div ? WEEKS.filter((w) => String(w.div) === div) : WEEKS
  return NextResponse.json(data)
}
