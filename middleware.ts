import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get('host') || ''

  // Define the canonical hostname
  const canonicalHostname = 'www.trystereos.com'

  // Check if we need to redirect to canonical URL
  // This handles: atelierlogos.studio -> www.trystereos.com
  if (hostname !== canonicalHostname && hostname !== 'localhost' && !hostname.startsWith('localhost:')) {
    url.hostname = canonicalHostname
    url.protocol = 'https'
    url.port = ''
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all paths except static files
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)).*)',
  ],
}
