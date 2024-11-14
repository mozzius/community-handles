"use client"

import { FC, PropsWithChildren, useState } from "react"
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation"
import { AppBskyActorDefs } from "@atproto/api"
import { Check } from "lucide-react"
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3"

import { RESERVED } from "@/lib/constant"
import { hasExplicitSlur } from "@/lib/slurs"

import { Button } from "../ui/button"
import { Input } from "../ui/input"

export type ButtonProps = PropsWithChildren<{
  handle?: string
  profile?: AppBskyActorDefs.ProfileView
}>

const CreateNewHandleMain: FC<ButtonProps> = ({ handle, profile }) => {
  const params = useParams()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { executeRecaptcha } = useGoogleReCaptcha()

  // let newHandle = query["new-handle"]
  const [newHandle, setNewHandle] = useState(
    searchParams.get("new-handle") || ""
  )
  const [error, setError] = useState("")
  const [created, setCreated] = useState(false)

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
          console.log(newHandleText, "newHandleText")
          setNewHandle(newHandleText)
          setError("")
          setCreated(false)
          // Recaptcha token
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
              router.replace(
                `${pathname}/?handle=${handle}&new-handle=${newHandle}`
              )
            }
          }
        } catch (e) {
          console.error(e)
          setError((e as Error)?.message ?? "unknown error")
        }
      } else {
        setError("invalid handle")
      }
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <input type="hidden" name="handle" value={handle} />
          <Input
            type="text"
            name="new-handle"
            placeholder={`New handle`}
            value={newHandle}
            onChange={(e) => setNewHandle(e.target.value)}
            suffix={`.${domain}`}
          />
          <Button type="submit">Submit</Button>
        </div>

        <p className="text-sm text-muted-foreground">
          Enter a new {domain} handle, not including the @<br />
          Can only contain letters, numbers, and hyphens.<br />
          Handles must end with .fellas.social<br />
          <br />
        </p>
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
const CreateNewHandle: FC<ButtonProps> = (props) => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
    >
      <CreateNewHandleMain {...props} />
    </GoogleReCaptchaProvider>
  )
}

export default CreateNewHandle
