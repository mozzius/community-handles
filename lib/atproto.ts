import { BskyAgent, jsonToLex, stringifyLex } from "@atproto/api"

BskyAgent.configure({
  fetch: async (reqUri, reqMethod, reqHeaders, reqBody) => {
    const reqMimeType = reqHeaders["Content-Type"] || reqHeaders["content-type"]
    if (reqMimeType && reqMimeType.startsWith("application/json")) {
      reqBody = stringifyLex(reqBody)
    }
    const res = await fetch(reqUri, {
      method: reqMethod,
      headers: reqHeaders,
      body: reqBody,
      cache: "no-cache",
    })

    const resStatus = res.status
    const resHeaders: Record<string, string> = {}
    res.headers.forEach((value: string, key: string) => {
      resHeaders[key] = value
    })
    const resMimeType = resHeaders["Content-Type"] || resHeaders["content-type"]
    let resBody
    if (resMimeType) {
      if (resMimeType.startsWith("application/json")) {
        resBody = jsonToLex(await res.json())
      } else if (resMimeType.startsWith("text/")) {
        resBody = await res.text()
      } else {
        throw new Error("TODO: non-textual response body")
      }
    }

    return {
      status: resStatus,
      headers: resHeaders,
      body: resBody,
    }
  },
})

export const agent = new BskyAgent({
  service: "https://public.api.bsky.app",
})
