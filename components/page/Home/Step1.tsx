"use client"

import { FC, PropsWithChildren, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { AppBskyActorDefs } from "@atproto/api"
import { Check, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"

import Loading from "../../loading"
import { Profile } from "../../profile"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"

export type ButtonProps = PropsWithChildren<{
  onUpdatedProfile?: (v?: AppBskyActorDefs.ProfileView) => void
  totalUsers: number
}>

const Step1: FC<ButtonProps> = ({ onUpdatedProfile, totalUsers }) => {
  const searchParams = useSearchParams()
  const tc = useTranslations()
  const t = useTranslations("Step1")

  const { executeRecaptcha } = useGoogleReCaptcha()

  const CREATE_HANDLE_ALLOW_FOLLOWS = useMemo(
    () => Math.min(Math.abs(Math.floor((totalUsers - 1) / 100)), 9),
    [totalUsers]
  )

  const [handle, setHandle] = useState(searchParams.get("handle") || "")
  const [profile, setProfile] = useState<AppBskyActorDefs.ProfileView>()
  const [followers, setFollowers] = useState(0)
  const [followersF, setFollowersF] = useState(0)

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const getProfile = async () => {
    if (executeRecaptcha && handle) {
      try {
        setLoading(true)
        setProfile(undefined)
        setFollowers(0)
        setFollowersF(0)
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
        setError(success ? "" : "404")
        if (data.profile) {
          setProfile(data.profile)
        }
        setFollowers(data?.followers)
        setFollowersF(data?.followers_fellas)
        if (data?.followers_fellas < CREATE_HANDLE_ALLOW_FOLLOWS) {
          setError("no_follows")
        } else {
          if (data.profile) {
            if (onUpdatedProfile) {
              onUpdatedProfile(data.profile)
            }
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

  const errorMsg = useMemo(() => {
    switch (error) {
      case "404":
        return t("Handle not found - please try again")
      case "no_follows":
        return t("You must be followed by at least", {
          count: CREATE_HANDLE_ALLOW_FOLLOWS,
        })
      default:
        return tc("Something is wrong")
    }
  }, [error, CREATE_HANDLE_ALLOW_FOLLOWS, t, tc])

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="grid w-full max-w-md items-center gap-1.5">
        <div className="flex w-full max-w-md items-center space-x-2">
          <Input
            type="text"
            name="handle"
            placeholder="example.bsky.social"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading}>
            {tc("Submit")}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          {t("Enter your current Bluesky handle, not including the @")}
          <br />
          {t("Please note that your handle is case-sensitive")}
        </p>
        {loading && <Loading />}
        {error && (
          <p className="flex flex-row items-center gap-2 text-sm text-red-500">
            <div>
              <X className="size-4" />
            </div>
            <span>{errorMsg}</span>
          </p>
        )}
        {profile && (
          <>
            <p className="text-muted-forground mt-4 flex flex-row items-center gap-2 text-sm">
              <Check className="size-6 text-green-500" /> {t("Account found")}
            </p>
            <Profile profile={profile} className="mt-4" />
            {/* <div className="grid grid-cols-2 gap-1">
              <p>
                <span className="text-xs">Followers:</span> {followers}
              </p>
              <p>
                <span className="text-xs">Fellas Followers:</span>&nbsp;
                {followersF}
              </p>
            </div> */}
          </>
        )}
      </div>
    </form>
  )
}

export default Step1
