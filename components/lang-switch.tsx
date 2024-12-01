"use client"

import React, { useEffect, useRef, useState, useTransition } from "react"
import { useLocale } from "next-intl"

import { languages } from "@/config/constants"
import { setUserLocale } from "@/lib/locale"

export function LangSwitch() {
  const [isPending, startTransition] = useTransition()
  const locale = useLocale()

  const [isOpen, setIsOpen] = useState(false)

  const dropdownRef = useRef(null)

  const changeLang = (lang: string) => {
    setIsOpen(false)
    if (lang !== locale) {
      startTransition(() => {
        setUserLocale(lang)
      })
    }
  }

  const handleClickOutside = (event: any) => {
    // @ts-ignore
    if (dropdownRef.current && !dropdownRef.current?.contains(event.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className={`inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground shadow-sm ring-inset hover:text-black dark:hover:text-white ${isPending && "pointer-events-none opacity-60"}`}
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          {languages.find((el) => el.code === locale)?.name}
          <svg
            className="-mr-1 size-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md border border-neutral-600 bg-neutral-900 shadow-lg ring-1 ring-black/5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {languages.map((el) => (
              <div
                key={el.code}
                className={`cursor-pointer px-4 py-2 text-sm hover:text-blue-200 ${el.code === locale ? "!text-white" : "text-gray-300"}`}
                role="menuitem"
                tabIndex={-1}
                id="menu-item-0"
                data-value={el.code}
                onClick={() => changeLang(el.code)}
              >
                {el.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
