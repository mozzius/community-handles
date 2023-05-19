import { Metadata } from "next"
import { cookies } from "next/headers"
import { kv } from "@vercel/kv"

import { getAgent } from "@/lib/atproto"
import { Profile } from "@/components/profile"

interface Props {
  params: { handle: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const domain = cookies().get("domain")?.value
  if (!domain) throw new Error("no domain cookie")
  const value = await kv.get(params.handle + "." + domain)
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
  return {
    title: `${profile.data.displayName} - @${profile.data.handle}`,
    description: profile.data.description,
  }
}

export default async function HandlePage({ params }: Props) {
  const domain = cookies().get("domain")?.value
  if (!domain) throw new Error("no domain cookie")

  try {
    const value = await kv.get(params.handle + "." + domain)
    if (!value || typeof value !== "string")
      throw new Error(`not in kv - ${params.handle}`)
    const agent = await getAgent()
    const profile = await agent.getProfile({
      actor: value,
    })
    return (
      <div className="grid flex-1 place-items-center">
        <a href={`https://bsky.app/profile/${profile.data.handle}`}>
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
