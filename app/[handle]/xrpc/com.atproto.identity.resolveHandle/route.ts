import { NextResponse, type NextRequest } from "next/server"
import { kv } from "@vercel/kv"

export const GET = async (
  request: NextRequest,
  { params }: { params: { handle: string } }
) => {
  const domain = request.cookies.get("domain")?.value
  if (!domain) throw new Error("no domain cookie")
  const value = await kv.get(params.handle + "." + domain)
  if (!value || typeof value !== "string")
    throw new Error(`not in kv - ${params.handle}`)

  return NextResponse.json({
    did: value,
  })
}
