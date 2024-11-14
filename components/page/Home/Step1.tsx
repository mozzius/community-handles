"use client"

import { FC, PropsWithChildren, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { AppBskyActorDefs } from "@atproto/api"
import { Check, X } from "lucide-react"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"

import Loading from "../../loading"
import { Profile } from "../../profile"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"

export type ButtonProps = PropsWithChildren<{
  onUpdatedProfile?: (v?: AppBskyActorDefs.ProfileView) => void
}>

const Step1: FC<ButtonProps> = ({ onUpdatedProfile }) => {
  const searchParams = useSearchParams()

  const { executeRecaptcha } = useGoogleReCaptcha()

  const [handle, setHandle] = useState(searchParams.get("handle") || "")
  const [profile, setProfile] = useState<AppBskyActorDefs.ProfileView>()

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const getProfile = async () => {
    if (executeRecaptcha && handle) {
      try {
        setLoading(true)
        if (onUpdatedProfile) {
          onUpdatedProfile(undefined)
        }
        // Recaptcha token
        const token = await executeRecaptcha()

        const res = await fetch("/api/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token,
            handle,
          }),
        })
        const { success, data } = await res.json()
        setError(success ? "" : "fetch was not a success")
        if (data) {
          setProfile(data)
          if (onUpdatedProfile) {
            onUpdatedProfile(data)
          }
        }
        setLoading(false)
      } catch (e) {
        console.error(e)
        setError((e as Error)?.message ?? "unknown error")
        setLoading(false)
      }
    }
  }
  const handleFormSubmit = async (e: any) => {
    e.preventDefault()
    getProfile()
  }

  useEffect(() => {
    if (executeRecaptcha && handle) {
      getProfile()
    }
  }, [executeRecaptcha])

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            name="handle"
            placeholder="example.bsky.social"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading}>
            Submit
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Enter your current Bluesky handle, not including the @<br />
          Please note that your handle is case-sensitive
        </p>
        {loading && <Loading />}
        {error && (
          <p className="flex flex-row items-center gap-2 text-sm text-red-500">
            <X className="size-4" /> Handle not found - please try again
          </p>
        )}
        {profile && (
          <>
            <p className="text-muted-forground mt-4 flex flex-row items-center gap-2 text-sm">
              <Check className="size-6 text-green-500" /> Account found
            </p>
            <Profile profile={profile} className="mt-4" />
          </>
        )}
      </div>
    </form>
  )
}

export default Step1
