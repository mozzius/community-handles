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
      title: "Create your own community handle",
      href: "/create-your-own",
    },
  ],
  links: {
    github: "https://github.com/mozzius/community-handles",
  },
}
