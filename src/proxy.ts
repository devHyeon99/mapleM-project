import { NextRequest, NextResponse } from 'next/server'

const ALLOWED_BOTS = [
  'googlebot',
  'bingbot',
  'slurp',
  'duckduckbot',
  'yandexbot',
  'sogou',
  'facebookexternalhit',
  'twitterbot',
  'linkedinbot',
  'kakaotalk-scrap',
  'naverbot',
  'yeti',
  'applebot',
  'discordbot',
  'slackbot',
  'telegrambot',
  'whatsapp',
  'line-poker',
]

const BLOCKED_BOT_PATTERNS = [
  /baiduspider/i,
  /bingsapphire/i,
  /serankingbacklinksbot/i,
  /Chrome\/[1-9][0-9]\./, // Chrome 99 이하 차단
  /scrapy/i,
  /python-requests/i,
  /python-urllib/i,
  /curl\//i,
  /wget\//i,
  /go-http-client/i,
  /java\//i,
  /libwww/i,
  /httpclient/i,
  /okhttp/i,
  /axios/i,
  /node-fetch/i,
  /got\//i,
  /php\//i,
  /ruby/i,
  /perl/i,
  /masscan/i,
  /zgrab/i,
  /nikto/i,
  /sqlmap/i,
]

export function proxy(req: NextRequest) {
  const ua = req.headers.get('user-agent') ?? ''

  if (!ua) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  const uaLower = ua.toLowerCase()

  const isAllowedBot = ALLOWED_BOTS.some((bot) => uaLower.includes(bot))
  if (isAllowedBot) return NextResponse.next()

  const isBlockedBot = BLOCKED_BOT_PATTERNS.some((pattern) => pattern.test(ua))
  if (isBlockedBot) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.ico).*)'],
}
