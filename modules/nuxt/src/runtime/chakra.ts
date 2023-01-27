import type * as NuxtAppTypes from "nuxt/app"
import { defineNuxtPlugin } from "#imports"
import Chakra, {
  chakra,
  cookieStorageManagerSSR,
  extendChakra,
  ColorModeConstants,
  extendTheme,
  ColorModeScriptProps,
} from "@chakra-ui/vue-next"
import { domElements } from "@chakra-ui/vue-system"
import { parseCookies } from "h3"

type AllowedSSRColorMode = Exclude<
  ColorModeScriptProps["initialColorMode"],
  "system"
>

export default defineNuxtPlugin((nuxtApp) => {
  const app = nuxtApp.vueApp
  const isBrowser = typeof document !== "undefined"

  // SSR Color Mode Handling
  let ssrColorMode
  const event = nuxtApp.ssrContext?.event

  if (event) {
    const parsedCookies = parseCookies(event)
    const colorMode = parsedCookies[ColorModeConstants.CookieStorageKey]
    if (colorMode) {
      ssrColorMode = colorMode
    } else {
      // TODO: Replace with options color mode
      ssrColorMode = "light"
    }
  }

  // Install plugin
  app.use(
    Chakra,
    extendChakra({
      cssReset: true,
      extendTheme: extendTheme({
        colors: {
          $brand: "#f5f",
        },
      }),
      colorModeManager: cookieStorageManagerSSR(
        ColorModeConstants.CookieStorageKey
      ),
    })
  )

  domElements.forEach((tag) => {
    app.component(`chakra.${tag}`, chakra(tag))
  })
})
