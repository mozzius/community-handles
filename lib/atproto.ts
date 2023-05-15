import { BskyAgent } from "@atproto/api"

export const agent = new BskyAgent({
  service: "https://bsky.social",
})

export const getAgent = async () => {
  await agent.login({
    identifier: process.env.BSKY_USERNAME!,
    password: process.env.BSKY_PASSWORD!,
  })

  return agent
}
