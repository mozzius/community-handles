"use client"

import { FC, useState } from "react"
import { AppBskyActorDefs } from "@atproto/api"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"

import { Stage } from "../../stage"
import Step1 from "./Step1"
import Step2 from "./Step2"

const GetYourHandle: FC = () => {
  const [profile, setProfile] = useState<AppBskyActorDefs.ProfileView>()
  const [newHandle, setNewHandle] = useState("")
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
    >
      <Stage title="Enter your current handle" number={1}>
        <Step1
          onUpdatedProfile={(e) => {
            setProfile(e)
            if (!e) {
              setNewHandle("")
            }
          }}
        />
      </Stage>

      <Stage title="Choose your new handle" number={2} disabled={!profile}>
        <Step2 profile={profile} onUpdated={(v) => setNewHandle(v)} />
      </Stage>

      <Stage
        title="Change your handle within the Bluesky app"
        number={3}
        disabled={!newHandle}
        last
      >
        <div className="max-w-lg text-sm">
          Once you have submitted your chosen handle above, it will be created
          and you can now change it in the Bluesky app:
          <br />
          <div className="pl-4 pt-2">
            <ol className="list-decimal">
              <li>
                Go to Settings {">"} Advanced {">"} Change my handle.
              </li>
              <li>
                Select &quot;I have my own domain&quot; and enter{" "}
                {newHandle ? `"${newHandle}"` : "your new handle"}.<br />
              </li>
              <li>
                Leave the setting on DNS Panel and ignore the text box as this
                is all set up automatically.
              </li>
              <li>Finally, tap &quot;Verify DNS Record&quot;.</li>
            </ol>
          </div>
        </div>
      </Stage>
    </GoogleReCaptchaProvider>
  )
}

export default GetYourHandle
