import { AppBskyActorDefs } from "@atproto/api"
import { kv } from "@vercel/kv"
import { Check, X } from "lucide-react"

import { getAgent } from "@/lib/atproto"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Profile } from "@/components/profile"

export default async function IndexPage({
  searchParams,
}: {
  searchParams: {
    handle?: string
    "new-handle"?: string
  }
}) {
  let handle = searchParams.handle
  let newHandle = searchParams["new-handle"]
  let profile: AppBskyActorDefs.ProfileView | undefined
  let error1: string | undefined
  let error2: string | undefined

  if (handle) {
    try {
      const agent = await getAgent()
      if (!handle.includes(".")) {
        handle += ".bsky.social"
      }
      const actor = await agent.getProfile({
        actor: handle,
      })
      if (!actor.success) throw new Error("fetch was not a success")
      profile = actor.data
    } catch (e) {
      console.error(e)
      error1 = (e as Error)?.message ?? "unknown error"
    }

    if (newHandle && profile) {
      newHandle = newHandle.trim().toLowerCase()
      if (!newHandle.includes(".")) {
        newHandle += "." + process.env.DOMAIN
      }
      if (!error1) {
        // regex: (alphanumeric, -, _).(process.env.DOMAIN)
        const validHandle = newHandle.match(
          new RegExp(`^[a-zA-Z0-9-_]+.${process.env.DOMAIN}$`)
        )
        if (validHandle) {
          try {
            const existing = await kv.get(newHandle)
            if (existing) {
              if (existing !== profile.did) {
                error2 = "handle taken"
              }
            } else {
              await kv.set(newHandle, profile.did)
            }
          } catch (e) {
            console.error(e)
            error2 = (e as Error)?.message ?? "unknown error"
          }
        } else {
          error2 = "invalid handle"
        }
      }
    }
  }

  return (
    <main className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-4">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Get your own {process.env.DOMAIN} <br className="hidden sm:inline" />
          handle for Bluesky
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          Follow the instructions below to get your own {process.env.DOMAIN}{" "}
          handle
        </p>
      </div>
      <div>
        <section>
          <div className="flex flex-row items-center">
            <div className="mr-4 grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-center">
              1
            </div>
            <h2 className="font-semibold">Enter your current handle</h2>
          </div>
          <div className="border-l-1 ml-4 border-l py-6 pl-8">
            <form>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input
                    type="text"
                    name="handle"
                    placeholder="example.bsky.social"
                    defaultValue={handle}
                    required
                  />
                  <Button type="submit" disabled={!!profile}>
                    Submit
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Enter your current handle, not including the @
                </p>
                {error1 && (
                  <p className="flex flex-row items-center gap-2 text-sm text-red-500">
                    <X className="h-4 w-4" /> Handle not found - please try
                    again
                  </p>
                )}
                {profile && (
                  <>
                    <p className="text-muted-forground mt-4 flex flex-row items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" /> Account found
                    </p>
                    <Profile profile={profile} className="mt-4" />
                  </>
                )}
              </div>
            </form>
          </div>
        </section>
        <section className={cn(!profile && "opacity-50")}>
          <div className="flex flex-row items-center">
            <div className="mr-4 grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-center">
              2
            </div>
            <h2 className="font-semibold">Choose your new handle</h2>
          </div>
          <div className="border-l-1 ml-4 border-l py-6 pl-8">
            <form>
              <input type="hidden" name="handle" value={handle} />
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input
                    type="text"
                    name="new-handle"
                    placeholder={`example.${process.env.DOMAIN}`}
                  />
                  <Button type="submit">Submit</Button>
                </div>
                <p className="text-sm text-muted-foreground ">
                  Enter the {process.env.DOMAIN} handle that you would like to
                  have, not including the @
                </p>
                {error2 && (
                  <p className="text-sm text-red-500">
                    {(() => {
                      switch (error2) {
                        case "handle taken":
                          return "Handle already taken - please enter a different handle"
                        case "invalid handle":
                          return "Invalid handle - please enter a different handle"
                        default:
                          return "An error occured - please try again"
                      }
                    })()}
                  </p>
                )}
              </div>
            </form>
          </div>
        </section>
        <section className={cn((!newHandle || error2) && "opacity-50")}>
          <div className="flex flex-row items-center">
            <div className="mr-4 grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-center">
              3
            </div>
            <h2 className="font-semibold">
              Change your handle within the Bluesky app
            </h2>
          </div>
          <div className="border-l-1 ml-4 border-l border-transparent py-6 pl-8">
            <p className="max-w-lg text-sm">
              Go to Settings {">"} Advanced {">"} Change my handle. Select
              &quot;I have my own domain&quot; and enter{" "}
              {newHandle ? `"${newHandle}"` : "your new handle"}. Finally, tap
              &quot;Verify DNS Record&quot;.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
