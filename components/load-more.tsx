"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface Props {
  children: React.ReactNode
  domain: string
  initialOffset: number | null
  loadMoreAction: (
    domain: string,
    offset: number
  ) => Promise<readonly [React.JSX.Element, number | null]>
  className?: string
}

export function LoadMore({
  children,
  domain,
  initialOffset,
  loadMoreAction,
  className,
}: Props) {
  const ref = React.useRef<HTMLButtonElement>(null)
  const [loadMoreNodes, setLoadMoreNodes] = React.useState<
    React.ReactElement[]
  >([])

  const [disabled, setDisabled] = React.useState(initialOffset === null)
  const currentOffsetRef = React.useRef<number | null>(initialOffset)
  const [loading, setLoading] = React.useState(false)

  const loadMore = React.useCallback(
    async (abortController?: AbortController) => {
      if (currentOffsetRef.current === null) {
        setDisabled(true)
        return
      }

      setLoading(true)

      try {
        const [nodes, next] = await loadMoreAction(
          domain,
          currentOffsetRef.current
        )
        if (abortController?.signal.aborted) return

        currentOffsetRef.current = next
        setLoadMoreNodes((prev) => [...prev, nodes])
        if (next === null) {
          setDisabled(true)
          return
        }
      } finally {
        setLoading(false)
      }
    },
    [domain, loadMoreAction]
  )

  React.useEffect(() => {
    const signal = new AbortController()

    const element = ref.current

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && element?.disabled === false) {
        loadMore(signal)
      }
    })

    if (element) {
      observer.observe(element)
    }

    return () => {
      signal.abort()
      observer.disconnect()
    }
  }, [loadMore])

  return (
    <>
      <div className={className}>
        {children}
        {loadMoreNodes}
      </div>
      <Button
        className={cn("mx-auto mt-8", disabled && "invisible")}
        variant="outline"
        size="lg"
        ref={ref}
        disabled={disabled || loading}
        onClick={() => loadMore()}
      >
        {loading ? "Loading..." : "Load More"}
      </Button>
    </>
  )
}
