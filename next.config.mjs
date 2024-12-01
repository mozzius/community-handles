import createNextIntlPlugin from "next-intl/plugin"
import { withPlausibleProxy } from "next-plausible"

const withNextIntl = createNextIntlPlugin("./i18n/index.ts")

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

export default withPlausibleProxy({
  customDomain: "https://plausible.mozzius.dev",
})(withNextIntl(nextConfig))
