import ChakraUIVuePlugin, { chakra, chakraOptions } from "@chakra-ui/vue-next"
import { domElements } from "@chakra-ui/vue-system"

import customTheme from "../assets/custom-theme"

import * as iconSet from "../utils/icons"

const { extendedIcons: extend, ...library } = iconSet

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(
    ChakraUIVuePlugin,
    chakraOptions({
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
