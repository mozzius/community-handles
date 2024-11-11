import { clsx, type ClassValue } from "clsx"
import psl from "psl"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const subdomain = "testing"

export function getDomain(host: string) {
  const domain = psl.parse(host)
  if (domain.error) throw new Error(domain.error.message)
  if (
    domain.subdomain?.endsWith(subdomain) ||
    !domain.domain?.includes("fellas.social")
  ) {
    domain.domain = subdomain + "." + domain.domain
    domain.subdomain =
      domain.subdomain === subdomain
        ? null
        : domain.subdomain?.replace(`.${subdomain}`, "") || null
  }

  return domain
}
