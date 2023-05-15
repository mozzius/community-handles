import { BskyAgent } from "@atproto/api"

BskyAgent.configure({
  fetch: async (httpUri, httpMethod, httpHeaders, httpReqBody) => {
    const res = await fetch(httpUri, {
      method: httpMethod.toUpperCase(),
      headers: new Headers(httpHeaders),
      body:
        typeof httpReqBody === "string"
          ? httpReqBody
          : JSON.stringify(httpReqBody),
    })
    console.log(res)
    const status = res.status
    const body = await res.json()
    const headers: Record<string, string> = {}
    res.headers.forEach((value, key) => {
      headers[key] = value
    })
    return {
      body,
      headers,
      status,
    }
  },
})

const agent = new BskyAgent({
  service: "https://bsky.social",
})

export const getAgent = async () => {
  if (!agent.hasSession) {
    await agent.login({
      identifier: "mozzius.dev",
      password: process.env.BSKY_PASSWORD!,
    })
  }

  return agent
}
