import { NextResponse } from 'next/server'
import { getPathwayCounts } from '@/lib/getData'

export async function GET() {
  const counts = await getPathwayCounts()
  return NextResponse.json(counts)
}
