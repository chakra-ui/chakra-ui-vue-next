import ChakraUIVuePlugin, { chakra, extendTheme } from "@chakra-ui/vue-next"
import { domElements } from "@chakra-ui/vue-system"

import customTheme from "../assets/custom-theme"

import * as iconSet from "../utils/icons"

const { extendedIcons: extend, ...library } = iconSet

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(
    ChakraUIVuePlugin,
    extendChakra({
      cssReset: true,
      emotionCacheOptions: {
        key: "chakra",
      },
      extendTheme: customTheme,
      icons: {
        library,
        extend,
      },
    })
  )

  domElements.forEach((tag) => {
    nuxtApp.vueApp.component(`chakra.${tag}`, chakra(tag))
  })
})
