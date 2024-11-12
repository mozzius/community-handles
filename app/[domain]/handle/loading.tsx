import { LoaderIcon } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <LoaderIcon className="size-8 animate-spin text-primary" />
    </div>
  )
}
