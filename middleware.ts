import { NextResponse, type NextRequest } from "next/server"

import { getDomain } from "./lib/utils"

export function middleware(request: NextRequest) {
  const url = new URL(request.url)

  const domain = getDomain(request)

  if (url.hostname !== domain) {
    const subdomain = url.hostname.slice(0, -domain.length - 1)
    return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, url))
  }
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. all root files inside /public (e.g. /favicon.ico)
     * 4. opengraph images (e.g. /[a-z0-9-_]/opengraph-image)
     */
    "/((?!api/|_next/|_static/|[\\w-]+\\.\\w+|[a-zA-Z0-9-_]+/opengraph-image).*)",
  ],
}
