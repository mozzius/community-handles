import { NextResponse, type NextRequest } from "next/server"
import { kv } from "@vercel/kv"

export const GET = async (
  _req: NextRequest,
  { params }: { params: { domain: string; handle: string } }
) => {
  const value = await kv.get(params.handle + "." + params.domain)
  if (!value || typeof value !== "string")
    throw new Error(`not in kv - ${params.handle}.${params.domain}`)

  return NextResponse.json({
    did: value,
  })
}
