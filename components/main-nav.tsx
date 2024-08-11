"use client"

import * as React from "react"

import { NavItem } from "@/types/nav"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Link } from "@/components/link"

interface MainNavProps {
  title: string
  items?: NavItem[]
}

export function MainNav({ title, items }: MainNavProps) {
  const base = typeof window !== "undefined" ? window.location.host : ""
  const isLocalhost = base.includes("localhost")
  const prefix = isLocalhost ? "/swifties.social" : ""

  return (
    <div className="flex gap-6 lg:gap-10">
      <Link href={prefix + "/"} className="flex items-center space-x-2">
        <Icons.logo className="size-6" />
        <span className="inline-block font-bold">{title}</span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-4 md:flex lg:gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={prefix + item.href}
                  className={cn(
                    "flex items-center text-lg font-semibold text-muted-foreground sm:text-sm",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  )
}
