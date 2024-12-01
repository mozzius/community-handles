import { NextResponse } from "next/server"
import { AppBskyActorDefs } from "@atproto/api"

import { agent } from "@/lib/atproto"
import { prisma } from "@/lib/db"
import { verifyReCaptcha } from "@/lib/service"

export async function POST(req: Request) {
  const { token, handle, domain } = await req.json()

  let success = await verifyReCaptcha(token)

  let profile: AppBskyActorDefs.ProfileView | undefined
  let followers: string[] = []

  const actor = handle.includes(".") ? handle : `${handle}.bsky.social`
  const totalUsers = await prisma.user.count({
    where: { domain: { name: domain } },
  })

  const limit = Math.min(Math.abs(Math.floor((totalUsers - 1) / 100)), 9)

  if (success) {
    const res1 = await agent.getProfile({ actor })
    success = res1.success
    profile = res1.data
    const pages = Math.ceil((res1.data.followersCount || 0) / 100)
    let cursor = ""
    for (let page = 1; page < pages; page++) {
      const res2 = await agent.getFollowers({
        actor,
        limit: 100,
        cursor,
      })
      followers.push(
        ...(res2.data?.followers
          ?.map((el) => el.handle)
          ?.filter((el) => el.endsWith(".fellas.social")) || [])
      )
      cursor = res2.data.cursor || ""
      if (followers.length >= limit) {
        break
      }
    }
    // console.log(followers)
  }

  return NextResponse.json({
    success,
    data: { profile, invalid: followers.length < limit, limit },
  })
}
