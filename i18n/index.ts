import { getRequestConfig } from "next-intl/server"

import { defaultLocale, locales } from "@/config/constants"
import { getUserLocale } from "@/lib/locale"

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await getUserLocale()

  // Ensure that a valid locale is used
  if (!locale || !locales.includes(locale)) {
    locale = defaultLocale
  }
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  }
})
