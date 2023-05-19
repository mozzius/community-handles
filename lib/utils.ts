import { type NextRequest } from "next/server"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDomain(request: NextRequest) {
  const domain =
    request.headers.get("x-forwarded-host") || request.headers.get("host")
  if (!domain) throw new Error("No domain found")
  return domain
}
