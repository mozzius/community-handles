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
  description: "Host your own tool or use our hosted solution",
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
          <p className="max-w-lg">
            You then need to host the tool. You have two options - either use
            our hosted version, or host it yourself.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="mt-6">
                Use our hosted solution - £3/month
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Choose a plan</DialogTitle>
              </DialogHeader>
              <div className="flex w-full flex-col gap-6 sm:flex-row">
                <div className="flex flex-1 flex-col items-stretch justify-between gap-6 rounded border p-4 transition-shadow hover:shadow-lg sm:min-h-[16rem]">
                  <div className="cursor-default">
                    <h2 className="font-bold">Monthly Plan</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      <span className="text-4xl font-bold text-foreground">
                        £3
                      </span>
                      /month
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Cancel anytime
                    </p>
                  </div>
                  <a
                    href="https://buy.stripe.com/14k8x5gMXgz91bO3cd"
                    className={buttonVariants({
                      variant: "outline",
                      className: "justify-between",
                    })}
                  >
                    Buy now
                    <ArrowRight className="ml-1" size={16} />
                  </a>
                </div>
                <div className="flex flex-1 flex-col items-stretch justify-between gap-6 rounded border p-4 transition-shadow hover:shadow-lg md:min-h-[16rem]">
                  <div className="cursor-default">
                    <h2 className="font-bold">Yearly Plan</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      <span className="text-4xl font-bold text-foreground">
                        £30
                      </span>
                      /year
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Cancel anytime
                    </p>
                  </div>
                  <a
                    href="https://buy.stripe.com/eVa6oX7cnbePaMo288"
                    className={buttonVariants({ className: "justify-between" })}
                  >
                    Buy now
                    <ArrowRight className="ml-1" size={16} />
                  </a>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <p className="mt-2 max-w-lg text-sm text-muted-foreground">
            Already a customer?{" "}
            <a
              href="https://billing.stripe.com/p/login/6oEbJccQOh2Rdji4gg"
              className="underline"
            >
              Go to the billing portal
            </a>
            .
          </p>
          <p className="mt-6 max-w-lg">
            If you use our hosted version, we&apos;ll work with you to point the
            nameservers at the right place, then take care of everything else.
          </p>
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
            Vercel KV.
          </p>
        </Stage>
      </div>
    </main>
  )
}
