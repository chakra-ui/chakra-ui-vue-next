const baseUrl = 'https://github.com/chakra-ui/chakra-ui-vue-next'

const siteUrl = 'https://vue.chakra-ui.com'
const description =
  'Simple, Modular and Accessible UI Components for your Vue Applications.'
const siteName =
  'Chakra UI: Simple, Modular and Accessible UI Components for your React Applications.'

const siteConfig = {
  repo: {
    url: baseUrl,
    editUrl: `${baseUrl}/edit/main/website`,
    blobUrl: `${baseUrl}/blob/main`,
  },
  openCollective: {
    url: 'https://opencollective.com/chakra-ui',
  },
  discord: {
    url: 'https://discord.gg/dQHfcWF',
  },
  youtube: 'https://www.youtube.com/channel/UC4TmDovH46TB4S0SM0Y4CIg',
  seo: {
    title: 'Chakra UI',
    titleTemplate: '%s - Chakra UI',
    description,
    siteUrl,
    twitter: {
      handle: '@chakra-ui',
      site: '@chakra-ui',
      cardType: 'summary_large_image',
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteUrl,
      title: 'Chakra UI',
      description,
      site_name: siteName,
      images: [
        {
          url: 'https://chakra-ui.com/og-image.png',
          width: 1240,
          height: 480,
          alt: siteName,
        },
        {
          url: 'https://chakra-ui.com/twitter-og-image.png',
          width: 1012,
          height: 506,
          alt: siteName,
        },
      ],
    },
  },
}

export default siteConfig
