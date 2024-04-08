import { LoaderIcon } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <LoaderIcon className="h-8 w-8 animate-spin text-primary" />
    </div>
  )
}
