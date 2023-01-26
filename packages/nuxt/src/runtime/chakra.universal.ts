import type * as NuxtAppTypes from "nuxt/app"
import { defineNuxtPlugin } from "#imports"
import Chakra, {
  chakra,
  ChakraPluginOptions,
  cookieStorageManagerSSR,
  extendChakra,
  ColorModeConstants,
} from "@chakra-ui/vue-next"
import { domElements } from "@chakra-ui/vue-system"

export default defineNuxtPlugin((nuxtApp) => {
  console.log("chakra-ui-nuxt:plugin_context")

  const app = nuxtApp.vueApp

  app.use(
    Chakra,
    extendChakra({
      cssReset: true,
      colorModeManager: cookieStorageManagerSSR(
        ColorModeConstants.CookieStorageKey
      ),
    })
  )

  domElements.forEach((tag) => {
    app.component(`chakra.${tag}`, chakra(tag))
  })
})
