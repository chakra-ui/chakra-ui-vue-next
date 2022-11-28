const baseUrl = "https://github.com/chakra-ui/chakra-ui-vue-next"

const siteUrl = "https://vue.chakra-ui.com"
const description =
  "Simple, Modular and Accessible UI Components for your Vue Applications."
const siteName =
  "Chakra UI Vue: Simple, Modular and Accessible UI Components for your Vue Applications."

const siteConfig = {
  repo: {
    url: baseUrl,
    editUrl: `${baseUrl}/edit/main/website`,
    blobUrl: `${baseUrl}/blob/main`,
  },
  openCollective: {
    url: "https://opencollective.com/chakra-ui",
  },
  discord: "https://discord.gg/dQHfcWF",
  youtube: "https://www.youtube.com/channel/UC4TmDovH46TB4S0SM0Y4CIg",
  twitter: "https://twitter.com/chakraui_vue",
  seo: {
    title: "Chakra UI Vue",
    titleTemplate: "%s - Chakra UI Vue",
    description,
    siteUrl,
    twitter: {
      handle: "@chakraui_vue",
      site: "@chakraui_vue",
      cardType: "summary_large_image",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      title: "Chakra UI",
      description,
      site_name: siteName,
      images: [
        {
          url: "https://chakra-ui.com/og-image.png",
          width: 1240,
          height: 480,
          alt: siteName,
        },
        {
          url: "https://chakra-ui.com/twitter-og-image.png",
          width: 1012,
          height: 506,
          alt: siteName,
        },
      ],
    },
  },
}

export default siteConfig
