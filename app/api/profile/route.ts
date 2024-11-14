import { NextResponse } from "next/server"
import { AppBskyActorDefs } from "@atproto/api"

import { agent } from "@/lib/atproto"
import { verifyReCaptcha } from "@/lib/service"

export async function POST(req: Request) {
  const { token, handle } = await req.json()

  let success = await verifyReCaptcha(token)

  let profile: AppBskyActorDefs.ProfileView | undefined
  let followers = 0
  let followers_fellas = 0

  const actor = handle.includes(".") ? handle : `${handle}.bsky.social`

  if (success) {
    const res1 = await agent.getProfile({ actor })
    success = res1.success
    profile = res1.data
    const res2 = await agent.getFollowers({
      actor,
    })
    followers = res2.data.followers.length
    followers_fellas = res2.data.followers.filter((el) =>
      el.handle.endsWith(".fellas.social")
    ).length
  }

  return NextResponse.json({
    success,
    data: { profile, followers, followers_fellas },
  })
}
