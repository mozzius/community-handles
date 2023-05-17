export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: process.env.DOMAIN ?? "You need to set a DOMAIN env variable",
  description: "get your own bsky.london handle",
  mainNav: [
    {
      title: "Join the community",
      href: "/",
    },
    {
      title: "Members",
      href: "/community",
    },
    {
      title: "Get your own community handle tool",
      href: "/get-your-own",
    },
  ],
  links: {
    github: "https://github.com/mozzius/community-handles",
  },
}
