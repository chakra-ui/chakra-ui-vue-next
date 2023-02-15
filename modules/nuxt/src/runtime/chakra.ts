import type * as NuxtAppTypes from "nuxt/app"
import { defineNuxtPlugin, useAppConfig } from "#imports"
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
import type { ChakraModuleOptions } from "../module"

type AllowedSSRColorMode = Exclude<
  ColorModeScriptProps["initialColorMode"],
  "system"
>

declare module "@nuxt/schema" {
  interface App {
    $chakraConfig: ChakraModuleOptions
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const app = nuxtApp.vueApp
  const isBrowser = typeof document !== "undefined"

  const config = useAppConfig()
  const chakraConfig = config.$chakraConfig

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
    // TODO: Fix type for Chakra plugin
    Chakra as any,
    extendChakra({
      ...(chakraConfig.emotionCacheOptions && {
        emotionCacheOptions: chakraConfig.emotionCacheOptions,
      }),
      ...(chakraConfig.cssReset && {
        cssReset: chakraConfig.cssReset,
      }),
      extendTheme: extendTheme({
        ...(chakraConfig.extendTheme && chakraConfig.extendTheme),
        config: {
          ...(chakraConfig.extendTheme?.config && {
            extendTheme: chakraConfig.extendTheme.config,
          }),
          initialColorMode: isBrowser
            ? window.$chakraSSRContext?.theme?.ssrColorMode
            : ssrColorMode,
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
