import { useState } from "react"
import Image from "next/image"
import ImageCoffeQR from "@/assets/images/CoffeQR.png"
import ImageNAFO from "@/assets/images/NAFO.png"

import GetYourHandle from "@/components/page/Home/GetYourHandle"
import { Stage } from "@/components/stage"

export function generateMetadata({ params }: { params: { domain: string } }) {
  const domain = params.domain
  return {
    title: `${domain} Bluesky Handle`,
    description: `get your own ${domain} handle for Bluesky`,
  }
}

export default async function IndexPage({
  params,
  searchParams,
}: {
  params: {
    domain: string
  }
  searchParams: {
    handle?: string
    "new-handle"?: string
  }
}) {
  const domain = params.domain

  return (
    <main className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-4">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Welcome fellas! <br />
          Get your own {domain} <br className="hidden sm:inline" />
          handle for Bluesky
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          Follow the instructions below to get your new handle
        </p>
      </div>
      <div>
        <GetYourHandle />

        <div className="max-w-lg text-sm">
          <p className="mt-2 max-w-lg text-sm">
            This Service is made for the NAFO fellas on Bluesky Visit their
            official website and help support them.
          </p>
          <div className="py-4">
            <a
              href="https://nafo-ofan.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={ImageNAFO}
                width={512}
                height={400}
                alt="NAFO image"
              />
            </a>
          </div>
          <div className="max-w-lg text-center">
            <p className="text-sm">
              To help support the hosting costs for this service:
            </p>
            <p className="py-2 text-center">
              <a
                href="https://buymeacoffee.com/chrisrid"
                target="_blank"
                rel="noopener noreferrer"
              >
                buymeacoffee.com/chrisrid
              </a>
            </p>
            <p>
              (Please prioritize supporting Ukrainian charities / NAFO first)
            </p>
            <div className="py-4">
              <a
                target="_blank"
                href="https://buymeacoffee.com/chrisrid"
                className="inline-block bg-white p-2"
              >
                <Image
                  src={ImageCoffeQR}
                  width={300}
                  height={300}
                  alt="CoffeQR"
                />
              </a>
            </div>
            <p>
              Want a different NAFO related handle? Check out&nbsp;
              <a href="https://mainbastards.online/" target="_blank">
                MainBastards.online
              </a>
            </p>
            <p>
              The community-handles project was originally created by mozzius,
              and adapted and hosted by ChrisRid for the NAFO fellas.
            </p>
            <p>Ongoing maintenance and updates are by ChrisRid and Orion.</p>
            <p>
              To support mozzius with the original project, you can sponsor and
              view his work at:
            </p>
            <p>
              <a href="https://github.com/sponsors/mozzius" target="_blank">
                https://github.com/sponsors/mozzius
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
