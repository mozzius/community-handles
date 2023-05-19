import { clsx, type ClassValue } from "clsx"
import psl from "psl"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDomain(host: string) {
  const domain = psl.parse(host)
  if (domain.error) throw new Error(domain.error.message)
  return domain
}
