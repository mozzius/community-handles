import { getTranslations } from "next-intl/server"

import { Collapse } from "@/components/ui/callapse"

export const metadata = {
  title: "FAQ",
  description: "Frequently Asked Questions",
}

export default async function CommunityPage() {
  const t = await getTranslations("FAQ")
  return (
    <main className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="mx-auto mb-10 flex max-w-[980px] flex-col items-start gap-4">
        <h1 className="text-center text-2xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          {t("title")}
        </h1>
      </div>
      <div className="mx-auto max-w-4xl">
        <Collapse
          items={[
            {
              title: t("t1"),
              content: (
                <div>
                  {t("c10")}{" "}
                  <a
                    href="https://nafo-ofan.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    https://nafo-ofan.org
                  </a>{" "}
                  .{t("c11")}
                </div>
              ),
            },
            {
              title: t("t2"),
              content: t("c2"),
            },
            {
              title: t("t3"),
              content: (
                <div>
                  <p className="mb-2">{t("c30")}</p>
                  <ol className="list-decimal pl-5">
                    <li>{t("c31")}</li>
                    <li>{t("c32")}</li>
                    <li>{t("c33")}</li>
                  </ol>
                  <p className="mt-2">{t("c34")}</p>
                </div>
              ),
            },
            {
              title: t("t4"),
              content: (
                <div>
                  <p>{t("c4")}</p>
                </div>
              ),
            },
            {
              title: t("t5"),
              content: t("c5"),
            },
            {
              title: t("t6"),
              content: (
                <div>
                  <p className="mb-2">{t("c6")}</p>
                  <a
                    href="https://github.com/ChrisRid/community-handles"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    https://github.com/ChrisRid/community-handles
                  </a>
                </div>
              ),
            },
            {
              title: t("t7"),
              content: (
                <div>
                  <p className="mb-2">{t("c7")}</p>
                  <a
                    href="https://github.com/mozzius/community-handles"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    https://github.com/mozzius/community-handles
                  </a>
                </div>
              ),
            },
            {
              title: t("t8"),
              content: (
                <div>
                  <p className="">{t("c8")}</p>
                </div>
              ),
            },
          ]}
        />
      </div>
    </main>
  )
}
