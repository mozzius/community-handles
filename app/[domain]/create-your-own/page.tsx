import { ArrowRight } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Stage } from "@/components/stage"

export const metadata = {
  title: "Create a Community Handle for your community",
  description: "Host your own tool",
}

export default function CommunityPage() {
  return (
    <main className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-4">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Create a Community Handle <br className="hidden sm:inline" />
          for your community
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          Want a custom community handle for your community, like
          @alex.bsky.london, @jay.swifties.social, or @jane.bsky.paris? Follow
          these steps to get one.
        </p>
      </div>
      <div>
        <Stage title="Buy a domain" number={1}>
          <p className="max-w-lg">
            Buy a domain from a domain registrar. We use{" "}
            <a
              href="https://namecheap.com"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Namecheap
            </a>
            , but it doesn&apos;t matter which one you use. Just make sure you
            are able to change where you point the nameservers.
          </p>
        </Stage>
        <Stage title="Host the Community Handles tool" number={2} last>
          <p className="max-w-lg">You then need to host the tool.</p>
          <p className="mt-4 max-w-lg">
            If you want to host it yourself,{" "}
            <a
              href="https://github.com/mozzius/community-handles"
              className="underline"
            >
              fork the project on GitHub
            </a>
            . It{"'"}s a Next.js project, so you can deploy it however you like.
            Check out the README for the recommended solution, using Vercel and
            Railway.
          </p>
          <p className="mt-8 max-w-lg text-sm text-muted-foreground">
            Using the hosted version? (no longer available){" "}
            <a
              href="https://billing.stripe.com/p/login/6oEbJccQOh2Rdji4gg"
              className="underline"
            >
              Go to the billing portal
            </a>
            .
          </p>
        </Stage>
      </div>
    </main>
  )
}
