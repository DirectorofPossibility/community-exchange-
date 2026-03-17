import { NextRequest, NextResponse } from 'next/server'
import { getAvailableResources } from '@/lib/getData'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const pathway = searchParams.get('pathway') || undefined
  const county = searchParams.get('county') || undefined

  const data = await getAvailableResources({ pathway, county })
  return NextResponse.json(data)
}
