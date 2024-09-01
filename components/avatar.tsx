/* eslint-disable @next/next/no-img-element */
"use client"

import * as React from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"

export function Avatar({
  src,
  alt,
  fallback,
  className,
}: {
  src?: string
  alt: string
  fallback?: string
  className?: string
}) {
  const [loaded, setLoaded] = React.useState(false)
  return (
    <div
      className={cn(
        "relative flex size-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
    >
      {src && (
        <img
          className="aspect-square size-full"
          src={src.replace("avatar", "avatar_thumbnail")}
          alt={alt}
          onLoad={() => setLoaded(true)}
        />
      )}
      {!loaded && (
        <div className="absolute inset-0 flex size-full items-center justify-center rounded-full border bg-muted text-[120%]">
          {fallback}
        </div>
      )}
    </div>
  )
}
