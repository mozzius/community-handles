import { LoaderIcon } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <LoaderIcon className="h-12 w-12 animate-spin text-primary" />
    </div>
  )
}
