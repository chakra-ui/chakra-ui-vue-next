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
  let ssrColorMode: AllowedSSRColorMode
  const event = nuxtApp.ssrContext?.event
  if (event) {
    const parsedCookies = parseCookies(event)
    const colorMode = parsedCookies[ColorModeConstants.CookieStorageKey]
    if (colorMode) {
      ssrColorMode = colorMode as AllowedSSRColorMode
    } else {
      // TODO: Replace with options color mode
      ssrColorMode = "light"
    }
  }

  const app = nuxtApp.vueApp
  const isBrowser = typeof document !== "undefined"

  app.use(
    Chakra,
    extendChakra({
      cssReset: true,
      colorModeManager: cookieStorageManagerSSR(
        ColorModeConstants.CookieStorageKey
      ),
      extendTheme: extendTheme({
        config: {
          initialColorMode: isBrowser
            ? window.$chakraSSRContext?.theme?.ssrColorMode
            : ssrColorMode,
        },
      }),
    })
  )

  domElements.forEach((tag) => {
    app.component(`chakra.${tag}`, chakra(tag))
  })
})
