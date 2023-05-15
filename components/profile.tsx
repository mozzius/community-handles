/* eslint-disable @next/next/no-img-element */
import { AppBskyActorDefs } from "@atproto/api"

import { cn } from "@/lib/utils"

interface Props {
  profile: AppBskyActorDefs.ProfileView
  className?: string
}

export function Profile({ profile, className }: Props) {
  return (
    <div className={cn("flex items-center space-x-4", className)}>
      <img
        src={profile.avatar}
        className="h-12 w-12 rounded-full"
        alt="profile picture"
      />
      <div className="flex flex-col">
        <p className="text-lg font-semibold">{profile.displayName}</p>
        <p className="text-sm text-muted-foreground">@{profile.handle}</p>
      </div>
    </div>
  )
}
