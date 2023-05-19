import { type Metadata } from "next"
import { kv } from "@vercel/kv"

import { getAgent } from "@/lib/atproto"
import { Link } from "@/components/link"
import { Profile } from "@/components/profile"

interface Props {
  params: { domain: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const domain = params.domain

  return {
    title: `The ${domain} Community`,
    description: `See all the members of the ${domain} community.`,
  }
}
export default async function CommunityPage({ params }: Props) {
  const domain = params.domain

  const keys = await kv.keys(`*.${domain}`)

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
  )
    .flat()
    .filter((member) => !!member)

  return (
    <main className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-4">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          The {domain} <br className="hidden sm:inline" />
          community
        </h1>
        <p className="max-w-[500px] text-lg text-muted-foreground sm:text-xl">
          Want to join the {domain} community? Get your own{" "}
          <Link href="/" className="underline">
            {domain} handle
          </Link>
          .
        </p>
        <div className="mt-8 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {members.map((member) => (
            <a
              href={`https://bsky.app/profile/${member.handle}`}
              key={member.did}
            >
              <Profile profile={member} />
            </a>
          ))}
        </div>
        {/* <Tabs defaultValue="domain">
          <TabsList>
            <TabsTrigger value="domain">{domain}</TabsTrigger>
            <TabsTrigger value="all">all</TabsTrigger>
          </TabsList>
          <TabsContent value="domain">
          </TabsContent>
          <TabsContent value="all">
          </TabsContent>
        </Tabs> */}
      </div>
    </main>
  )
}
