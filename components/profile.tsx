/* eslint-disable @next/next/no-img-element */
import { AppBskyActorDefs } from "@atproto/api"

import { cn } from "@/lib/utils"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

interface Props {
  profile: AppBskyActorDefs.ProfileView
  className?: string
}

export function Profile({ profile, className }: Props) {
  return (
    <div className={cn("flex items-center space-x-4", className)}>
      <Avatar>
        <AvatarImage src={profile.avatar} alt={`${profile.handle}'s avatar`} />
        <AvatarFallback>
          {profile.handle.toLocaleUpperCase().at(0)}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <p className="text-lg font-semibold leading-5">{profile.displayName}</p>
        <p className="text-sm text-muted-foreground">@{profile.handle}</p>
      </div>
    </div>
  )
}
