import { NextResponse } from 'next/server'
import { WEEKS } from '@/lib/data/weeks'

export async function GET(_: Request, { params }: { params: Promise<{ week: string }> }) {
  const { week } = await params
  const weekNum = Number(week)
  const weekItem = WEEKS.find((w) => w.week === weekNum)
  if (!weekItem) return NextResponse.json({ message: 'Week not found' }, { status: 404 })
  return NextResponse.json(weekItem)
}
