"use client"

import NextLink, { type LinkProps } from "next/link"

import { getDomain } from "@/lib/utils"

interface Props
  extends LinkProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> {}

export function Link({ href, ...props }: Props) {
  if (typeof href === "string" && typeof window !== "undefined") {
    const { subdomain, domain } = getDomain(window.location.hostname)
    if (!!subdomain) {
      return <NextLink href={`https://${domain}${href}`} {...props} />
    } else {
      return <NextLink href={href} {...props} />
    }
  } else {
    return <NextLink href={href} {...props} />
  }
}
