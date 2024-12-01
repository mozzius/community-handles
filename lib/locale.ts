"use server"

import { cookies } from "next/headers"

import { COOKIE_LANG, defaultLocale } from "@/config/constants"

export async function getUserLocale() {
  return cookies().get(COOKIE_LANG)?.value || defaultLocale
}

export async function setUserLocale(locale: string) {
  cookies().set(COOKIE_LANG, locale)
}
