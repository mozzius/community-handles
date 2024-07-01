"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

import { type NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { Link } from "@/components/link"
import { ThemeToggle } from "@/components/theme-toggle"

interface Props {
  children?: React.ReactNode
  items?: NavItem[]
}

export function SiteHeader({ children }: Props) {
  const [showMenu, setShowMenu] = useState(false)

  const links = (
    <nav className="flex items-center gap-4 md:gap-1">
      <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
        <div
          className={buttonVariants({
            size: "sm",
            variant: "ghost",
          })}
        >
          <Icons.gitHub className="size-5" />
          <span className="sr-only">GitHub</span>
        </div>
      </Link>
      <ThemeToggle />
    </nav>
  )

  const MenuIcon = showMenu ? X : Menu

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between space-x-4 sm:space-x-0">
          {children}
          <div>
            <div className="block md:hidden">
              <MenuIcon
                aria-label="Menu"
                className="cursor-pointer"
                size={24}
                onClick={() => setShowMenu((m) => !m)}
              />
            </div>
            <div className="hidden flex-1 items-center justify-end space-x-4 md:flex">
              {links}
            </div>
          </div>
        </div>
      </header>
      <div
        className={cn(
          "absolute top-16 z-30 w-full border-b bg-background transition-transform duration-1000 md:hidden",
          showMenu ? "translate-y-1px" : "-translate-y-full"
        )}
        aria-hidden={!showMenu}
      >
        <div className="container flex h-full flex-col items-center justify-stretch px-4 pb-2">
          <nav className="mb-2 flex w-full flex-col items-stretch gap-1 border-b py-2">
            {siteConfig.mainNav.map(
              (item, index) =>
                item.href && (
                  <Link
                    key={index}
                    href={item.href}
                    className={buttonVariants({
                      variant: "ghost",
                      className:
                        "w-full !justify-start text-left font-semibold text-muted-foreground",
                    })}
                    onClick={() => setShowMenu(false)}
                  >
                    {item.title}
                  </Link>
                )
            )}
          </nav>
          {links}
        </div>
      </div>
    </>
  )
}
