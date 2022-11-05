import ChakraUIVuePlugin, { chakra, chakraOptions } from "@chakra-ui/vue-next"
import { domElements } from "@chakra-ui/vue-system"

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(
    ChakraUIVuePlugin,
    chakraOptions({
      cssReset: true,
      emotionCacheOptions: {
        key: "chakra",
      },
    })
  )

  domElements.forEach((tag) => {
    nuxtApp.vueApp.component(`chakra.${tag}`, chakra(tag))
  })
})
