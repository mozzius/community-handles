import { createServerContext } from "react"

export const LocaleContext = createServerContext<"en" | "pt">("locale", "en")

export const LocaleProvider = LocaleContext.Provider
