"use client"

import { FC, useState } from "react"
import { AppBskyActorDefs } from "@atproto/api"
import { useTranslations } from "next-intl"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"

import { Stage } from "../../stage"
import Step1 from "./Step1"
import Step2 from "./Step2"

const GetYourHandle: FC<{ totalUsers: number }> = ({ totalUsers }) => {
  const t = useTranslations("Handle")
  const [profile, setProfile] = useState<AppBskyActorDefs.ProfileView>()
  const [newHandle, setNewHandle] = useState("")
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
    >
      <Stage title={t("Enter your current handle")} number={1}>
        <Step1
          totalUsers={totalUsers}
          onUpdatedProfile={(e) => {
            setProfile(e)
            if (!e) {
              setNewHandle("")
            }
          }}
        />
      </Stage>

      <Stage title={t("Choose your new handle")} number={2} disabled={!profile}>
        <Step2 profile={profile} onUpdated={(v) => setNewHandle(v)} />
      </Stage>

      <Stage
        title={t("Change your handle within the Bluesky app")}
        number={3}
        disabled={!newHandle}
        last
      >
        <div className="max-w-lg text-sm">
          {t("Once you have submitted")}
          <br />
          <div className="pl-4 pt-2">
            <ol className="list-decimal">
              <li>{t("step1")}</li>
              <li>{t("step2", { handle: newHandle || "no" })}</li>
              <li>{t("step3")}</li>
              <li>{t("step4")}</li>
            </ol>
          </div>
        </div>
      </Stage>
    </GoogleReCaptchaProvider>
  )
}

export default GetYourHandle
