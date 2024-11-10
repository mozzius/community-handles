
import NextPlausible from "next-plausible"
import { siteConfig } from "@/config/site"
import { MainNav } from "@/components/main-nav"
import { SiteHeader } from "@/components/site-header"

interface Props {
  children: React.ReactNode
  params: { domain: string }
}

export default function DomainLayout({ children, params }: Props) {
  return (
    <>
      <NextPlausible
        domain={params.domain}
        customDomain={process.env.PLAUSIBLE_CUSTOM_DOMAIN}
        selfHosted
      />
      <SiteHeader items={siteConfig.mainNav}>
        <MainNav title={params.domain} items={siteConfig.mainNav} />
      </SiteHeader>
      <div className="flex flex-1 flex-col">{children}</div>
    </>
  )
}
