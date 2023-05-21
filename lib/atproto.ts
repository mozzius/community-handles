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

export const getAgent = async () => {
  const agent = new BskyAgent({
    service: "https://bsky.social",
  })

  await agent.login({
    identifier: process.env.BSKY_USERNAME!,
    password: process.env.BSKY_PASSWORD!,
  })

  return agent
}
