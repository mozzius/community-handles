import { type Metadata } from "next"
import { kv } from "@vercel/kv"

import { getAgent } from "@/lib/atproto"
import { prisma } from "@/lib/db"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  const domain = await prisma.domain.findUniqueOrThrow({
    where: { name: params.domain },
    include: { users: true },
  })

  // split into groups of 25
  const groups = []
  for (let i = 0; i < domain.users.length; i += 25) {
    const group = domain.users.slice(i, i + 25)
    groups.push(group)
  }

  const agent = await getAgent()

  // fetch all members
  const members = (
    await Promise.all(
      groups.map(async (group) => {
        const profiles = await agent.getProfiles({
          actors: group.map((user) => user.did),
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
          The {domain.name} <br className="hidden sm:inline" />
          community
        </h1>
        <p className="max-w-[500px] text-lg text-muted-foreground sm:text-xl">
          Want to join the {domain.name} community? Get your own{" "}
          <Link href="/" className="underline">
            {domain.name} handle
          </Link>
          .
        </p>
        <Tabs defaultValue="domain" className="mb-4 mt-8">
          <TabsList>
            <TabsTrigger value="domain">{domain.name} handles</TabsTrigger>
            <TabsTrigger value="all">all</TabsTrigger>
          </TabsList>
          <TabsContent
            value="domain"
            className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
          >
            {members
              .filter((member) => member.handle.endsWith(domain.name))
              .map((member) => (
                <a
                  href={`https://bsky.app/profile/${member.handle}`}
                  key={member.did}
                >
                  <Profile profile={member} />
                </a>
              ))}
          </TabsContent>
          <TabsContent
            value="all"
            className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
          >
            {members.map((member) => (
              <a
                href={`https://bsky.app/profile/${member.handle}`}
                key={member.did}
              >
                <Profile profile={member} />
              </a>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
