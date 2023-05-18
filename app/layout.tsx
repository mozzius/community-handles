import "@/styles/globals.css"
import { Metadata } from "next"
import { cookies } from "next/headers"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

import { LocaleProvider } from "./_i18n/context"

export async function generateMetadata(): Promise<Metadata> {
  const lang = cookies().get("lang")?.value

  return {
    title:
      lang === "pt"
        ? `${siteConfig.name} - Obtenha seu identificador de comunidade para Bluesky`
        : `${siteConfig.name} - get your community handle for Bluesky`,
    description: siteConfig.description,
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "white" },
      { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
  }
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  let lang = cookies().get("lang")?.value

  if (!lang || !["en", "pt"].includes(lang)) {
    lang = "en"
  }

  return (
    <LocaleProvider value={lang as "en" | "pt"}>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <div className="flex flex-1 flex-col">{children}</div>
            </div>
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </LocaleProvider>
  )
}
