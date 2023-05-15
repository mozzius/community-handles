import { kv } from "@vercel/kv"

import { getAgent } from "@/lib/atproto"
import { Profile } from "@/components/profile"

export default async function HandlePage({
  params,
}: {
  params: { handle: string }
}) {
  try {
    const value = await kv.get(params.handle + "." + process.env.DOMAIN)
    if (!value || typeof value !== "string") throw new Error("not in kv")
    const agent = await getAgent()
    const profile = await agent.getProfile({
      actor: value,
    })
    return (
      <div className="grid flex-1 place-items-center">
        <a href={`https://staging.bsky.app/profile/${profile.data.handle}`}>
          <Profile profile={profile.data} />
        </a>
      </div>
    )
  } catch (e) {
    console.error(e)
    return (
      <div className="grid flex-1 place-items-center">
        <p className="text-center">Profile not found</p>
      </div>
    )
  }
}
