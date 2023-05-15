/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/server"
import { kv } from "@vercel/kv"

import { getAgent } from "@/lib/atproto"

export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"
export const runtime = "edge"

export default async function og({ params }: { params: { handle: string } }) {
  const value = await kv.get(params.handle + "." + process.env.DOMAIN)
  if (!value || typeof value !== "string") {
    return {
      title: "Profile not found",
      description: ":(",
    }
  }
  const agent = await getAgent()
  const profile = await agent.getProfile({
    actor: value,
  })
  return new ImageResponse(
    (
      <div tw="flex flex-col w-full h-full">
        <img src={profile.data.banner} tw="w-full h-1/3 object-cover" alt="" />
        
      </div>
    ),
    { ...size }
  )
}
