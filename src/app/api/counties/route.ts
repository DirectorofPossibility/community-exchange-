import { NextResponse } from 'next/server'
import { getCounties } from '@/lib/getData'

export async function GET() {
  const counties = await getCounties()
  return NextResponse.json(counties)
}
