import { Metadata } from "next"

import { agent } from "@/lib/atproto"
import { prisma } from "@/lib/db"
import { Profile } from "@/components/profile"

interface Props {
  params: { handle: string; domain: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const domain = params.domain
  const user = await prisma.user.findFirst({
    where: { handle: params.handle, domain: { name: domain } },
  })
  if (!user) {
    return {
      title: "Profile not found",
      description: ":(",
    }
  }

  const profile = await agent.getProfile({
    actor: user.did,
  })
  return {
    title: `${profile.data.displayName} - @${profile.data.handle}`,
    description: profile.data.description,
  }
}

export default async function HandlePage({ params }: Props) {
  const { domain, handle } = params

  try {
    const user = await prisma.user.findFirstOrThrow({
      where: { handle, domain: { name: domain } },
    })

    const profile = await agent.getProfile({
      actor: user.did,
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
