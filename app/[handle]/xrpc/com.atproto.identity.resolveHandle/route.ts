import { NextResponse, type NextRequest } from "next/server"
import { kv } from "@vercel/kv"

export const GET = async (
  request: NextRequest,
  { params }: { params: { handle: string } }
) => {
  const value = await kv.get(params.handle + "." + process.env.DOMAIN)
  if (!value || typeof value !== "string") throw new Error("not in kv")

  return NextResponse.json({
    did: value,
  })
}
