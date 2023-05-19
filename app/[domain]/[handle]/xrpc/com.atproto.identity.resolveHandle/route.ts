import { NextResponse, type NextRequest } from "next/server"
import { kv } from "@vercel/kv"

import { prisma } from "@/lib/db"

export const GET = async (
  _req: NextRequest,
  { params }: { params: { domain: string; handle: string } }
) => {
  const user = await prisma.user.findFirstOrThrow({
    where: { handle: params.handle, domain: { name: params.domain } },
  })
  return NextResponse.json({
    did: user.did,
  })
}
