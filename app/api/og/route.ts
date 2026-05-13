import { NextRequest, NextResponse } from "next/server"

function getMeta(html: string, property: string): string {
  // property="og:xxx" content="..."  or  content="..." property="og:xxx"
  const patterns = [
    new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']*)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+property=["']${property}["']`, "i"),
    new RegExp(`<meta[^>]+name=["']${property}["'][^>]+content=["']([^"']*)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+name=["']${property}["']`, "i"),
  ]
  for (const re of patterns) {
    const m = html.match(re)
    if (m?.[1]) return m[1].trim()
  }
  return ""
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url")
  if (!url) {
    return NextResponse.json({ error: "url 파라미터가 필요합니다" }, { status: 400 })
  }

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; OnebiteLink/1.0; +https://onebite-link.vercel.app)",
      },
      signal: AbortSignal.timeout(8000),
    })

    if (!res.ok) {
      return NextResponse.json({ error: `페이지를 불러올 수 없습니다 (${res.status})` }, { status: 502 })
    }

    const html = await res.text()

    const title =
      getMeta(html, "og:title") ||
      html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ||
      new URL(url).hostname

    const description = getMeta(html, "og:description") || getMeta(html, "description")
    const image = getMeta(html, "og:image")

    // Resolve relative image URLs
    let thumbnail = ""
    if (image) {
      try {
        thumbnail = new URL(image, url).href
      } catch {
        thumbnail = image
      }
    }

    return NextResponse.json({ title, description, thumbnail, url })
  } catch (err) {
    const message = err instanceof Error ? err.message : "알 수 없는 오류"
    return NextResponse.json({ error: `OG 정보를 가져오지 못했습니다: ${message}` }, { status: 500 })
  }
}
