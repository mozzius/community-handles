import Link from "next/link"
import { kv } from "@vercel/kv"

import { getAgent } from "@/lib/atproto"
import { Profile } from "@/components/profile"

export const metadata = {
  title: `The ${process.env.DOMAIN} Community`,
  description: `See all the members of the ${process.env.DOMAIN} community.`,
}

export default async function CommunityPage() {
  const keys = await kv.keys("*")

  // split into groups of 25
  const groups = []
  for (let i = 0; i < keys.length; i += 25) {
    const group = keys.slice(i, i + 25)
    groups.push(group)
  }

  const agent = await getAgent()

  // fetch all members
  const members = (
    await Promise.all(
      groups.map(async (group) => {
        const profiles = await agent.getProfiles({
          actors: group,
        })
        return profiles.data.profiles
      })
    )
  ).flat()

  return (
    <main className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-4">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          The {process.env.DOMAIN} <br className="hidden sm:inline" />
          community
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          Want to join the {process.env.DOMAIN} community? Get your own <wbr />
          <Link href="/" className="underline">
            {process.env.DOMAIN} handle
          </Link>
          .
        </p>
        <div className="mt-8 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {members
            .filter((member) => !!member)
            .map((member) => (
              <a
                href={`https://bsky.app/profile/${member.handle}`}
                key={member.did}
              >
                <Profile profile={member} />
              </a>
            ))}
        </div>
      </div>
    </main>
  )
}
