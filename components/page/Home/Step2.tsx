"use client"

import { FC, PropsWithChildren, useEffect, useMemo, useState } from "react"
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation"
import { AppBskyActorDefs } from "@atproto/api"
import { Check } from "lucide-react"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"

import { RESERVED } from "@/lib/constant"
import { hasExplicitSlur } from "@/lib/slurs"

import Loading from "../../loading"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"

export type ButtonProps = PropsWithChildren<{
  profile?: AppBskyActorDefs.ProfileView
  onUpdated?: (v: string) => void
}>

const Step2: FC<ButtonProps> = ({ profile, onUpdated }) => {
  const params = useParams()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const handle = useMemo(
    () => profile?.handle?.replace(".bsky.social", ""),
    [profile]
  )

  const { executeRecaptcha } = useGoogleReCaptcha()

  // let newHandle = query["new-handle"]
  const [newHandle, setNewHandle] = useState(
    searchParams.get("new-handle") || ""
  )
  const [error, setError] = useState("")
  const [created, setCreated] = useState(false)
  const [loading, setLoading] = useState(false)

  const domain = params.domain

  const handleFormSubmit = async (e: any) => {
    e.preventDefault()

    if (executeRecaptcha && newHandle && profile) {
      let newHandleText = newHandle.trim().toLowerCase()
      const validHandle = newHandleText.match(new RegExp(`^[a-zA-Z0-9-_]+`))
      if (validHandle) {
        try {
          if (hasExplicitSlur(newHandleText)) {
            throw new Error("slur")
          }

          if (domain === "army.social" && RESERVED.includes(newHandleText)) {
            throw new Error("reserved")
          }
          setNewHandle(newHandleText)
          setError("")
          setCreated(false)
          // Recaptcha token
          setLoading(true)
          const token = await executeRecaptcha()

          const res = await fetch("/api/handle", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              token,
              handle: newHandleText,
              domain,
              did: profile.did,
            }),
          })
          const { success, error } = await res.json()
          if (error) {
            setError(error)
            setCreated(false)
          } else {
            if (success) {
              setCreated(true)
              if (onUpdated) {
                onUpdated(newHandleText)
              }
              // router.replace(
              //   `${pathname}/?handle=${handle}&new-handle=${newHandle}`
              // )
            }
          }
          setLoading(false)
        } catch (e) {
          console.error(e)
          setError((e as Error)?.message ?? "unknown error")
          setLoading(false)
        }
      } else {
        setError("invalid handle")
      }
    }
  }
  useEffect(() => {
    if (!profile) {
      setNewHandle("")
      setCreated(false)
    } else {
    }
  }, [profile])

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            name="new-handle"
            placeholder={`New handle`}
            value={newHandle}
            onChange={(e) => setNewHandle(e.target.value)}
            suffix={`.${domain}`}
          />
          <Button type="submit" disabled={loading}>
            Submit
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          Enter a new {domain} handle, not including the @<br />
          Can only contain letters, numbers, and hyphens.
          <br />
          Handles must end with .fellas.social
          <br />
          <br />
        </p>
        {loading && <Loading />}
        {error ? (
          <p className="text-sm text-red-500">
            {(() => {
              switch (error) {
                case "handle taken":
                  return "Handle already taken - please enter a different handle"
                case "invalid handle":
                case "slur":
                  return "Invalid handle - please enter a different handle"
                case "reserved":
                  return "Reserved handle - please enter a different handle"
                default:
                  return "An error occured - please try again"
              }
            })()}
          </p>
        ) : (
          <>
            {created && (
              <div className="mt-4 flex flex-row items-center gap-2 text-sm">
                <Check className="size-6 text-green-500" />
                <p className="flex-1">
                  {newHandle}.{domain} has been successfully created
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </form>
  )
}

export default Step2
