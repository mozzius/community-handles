import Image from "next/image"
import ImageCoffeQR from "@/assets/images/CoffeQR.png"
import ImageNAFO from "@/assets/images/NAFO.png"
import { getTranslations } from "next-intl/server"

import { prisma } from "@/lib/db"
import GetYourHandle from "@/components/page/Home/GetYourHandle"

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

  const t = await getTranslations("Home")

  return (
    <main className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-4">
        <div>
          <div className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            {t("welcome")}
          </div>
          <div className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            {t("Get your own", { domain })}
          </div>
        </div>
        <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          {t("Follow the instructions")}
        </p>
      </div>
      <div>
        <GetYourHandle />

        <div className="max-w-lg text-sm">
          <p className="mt-2 max-w-lg text-center text-sm">
            {t("This Service is")}
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
        </div>
      </div>
    </main>
  )
}
