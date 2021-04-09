import App from './App.vue'
import { ViteSSG } from 'vite-ssg'
import ChakraUIVuePlugin, { chakra } from '@chakra-ui/vue-next'
import { domElements } from '@chakra-ui/vue-system'
import {
  feBook,
  feGithub,
  feMenu,
  feMessageCircle,
  feMoon,
  fePackage,
  feSearch,
  feStar,
  feSun,
  feTwitter,
} from 'feather-icons-paths'
import { hydrate } from '@emotion/css'
import routes from 'pages-generated'

import './styles/main.css'
import customTheme from './assets/custom-theme'

export const createApp = ViteSSG(App, { routes }, ({ app, isClient }) => {
  if (isClient) {
    // @ts-expect-error Need to add $emotionSSRIds to global namespace
    const ssrIds = window?.$emotionSSRIds || []
    hydrate(ssrIds)
  }

  app.use(ChakraUIVuePlugin, {
    extendTheme: customTheme,
    icons: {
      library: {
        feBook,
        feGithub,
        feMenu,
        feMessageCircle,
        feMoon,
        fePackage,
        feSearch,
        feStar,
        feSun,
        feTwitter,
      },
    },
  })

  domElements.forEach((tag) => {
    app.component(`chakra.${tag}`, chakra(tag))
  })
})
