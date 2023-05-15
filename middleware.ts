import { NextResponse, type NextRequest } from "next/server"

const domain = process.env.DOMAIN as string

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const url = new URL(request.url)
  console.log(url.hostname, domain)
  if (url.hostname !== domain) {
    const subdomain = url.hostname.slice(0, -domain.length - 1)
    return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, url))
  }
}
