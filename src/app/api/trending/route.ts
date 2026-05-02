import { NextResponse } from 'next/server'
import { TRENDING } from '@/lib/data/trending'

export function GET() {
  return NextResponse.json(TRENDING)
}
