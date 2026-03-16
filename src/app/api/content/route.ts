import { NextResponse } from 'next/server'
import { getContent } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const center = searchParams.get('center') || undefined
  const pathway = searchParams.get('pathway') || undefined
  const limit = Math.min(parseInt(searchParams.get('limit') || '30'), 50)

  const items = await getContent({ limit, center, pathway })

  return NextResponse.json({
    items: items.map(item => ({
      id: item.id,
      title: item.title,
      description: item.description,
      source_url: item.source_url,
      org_name: item.org_name,
      content_type: item.content_type,
      center: item.center,
      pathway: item.pathway,
    })),
    count: items.length,
  })
}
