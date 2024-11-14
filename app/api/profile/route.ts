import { NextResponse } from "next/server"
import { AppBskyActorDefs } from "@atproto/api"

import { agent } from "@/lib/atproto"
import { verifyReCaptcha } from "@/lib/service"

export async function POST(req: Request) {
  const { token, handle } = await req.json()

  let success = await verifyReCaptcha(token)
  let data: AppBskyActorDefs.ProfileView | undefined
  if (success) {
    const actor = await agent.getProfile({
      actor: handle.includes(".") ? handle : `${handle}.bsky.social`,
    })
    success = actor.success
    data = actor.data
  }

  return NextResponse.json({ success, data })
}
