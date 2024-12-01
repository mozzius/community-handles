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

  const totalUsers = await prisma.user.count({
    where: { domain: { name: domain } },
  })
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
        <GetYourHandle totalUsers={totalUsers} />

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
          <div className="max-w-lg text-center">
            <p className="text-sm">
              {t("To help support the hosting costs for this service")}:
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
            <p>({t("Please prioritize")})</p>
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
              {t("Want a different NAFO related handle")}&nbsp;
              <a
                href="https://mainbastards.online/"
                target="_blank"
                className="hover:underline"
              >
                MainBastards.online
              </a>
            </p>
            <p>{t("The community-handles project")}</p>
            <p>{t("Ongoing maintenance")}</p>
            <p>{t("To support")}</p>
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
