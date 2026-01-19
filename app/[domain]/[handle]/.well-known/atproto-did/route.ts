import { type NextRequest } from "next/server"

import { prisma } from "@/lib/db"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "*",
}

export const OPTIONS = async () => {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  })
}

export const GET = async (
  _req: NextRequest,
  { params }: { params: { domain: string; handle: string } }
) => {
  const { did } = await prisma.user.findFirstOrThrow({
    where: { handle: params.handle, domain: { name: params.domain } },
  })
  return new Response(did, {
    headers: {
      "content-type": "text/plain",
      ...corsHeaders,
    },
  })
}
