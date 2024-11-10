import { withPlausibleProxy } from "next-plausible"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

export default withPlausibleProxy({
  customDomain: "https://plausible.mozzius.dev",
})(nextConfig)
