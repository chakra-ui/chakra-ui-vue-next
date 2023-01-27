import { defineNuxtPlugin } from "#imports"
import Chakra, {
  cookieStorageManagerSSR,
  extendChakra,
  ColorModeConstants,
  extendBaseTheme
} from "@chakra-ui/vue-next"
import { parseCookies } from "h3"
import { baseTheme } from "@chakra-ui/theme"


const extendedTheme = <%= (function() {
  // keep a list of serialized functions
  const functions = []

  // json replacer - returns a placeholder for functions
  const jsonReplacer = (key, val) => {
    if (typeof val === 'function') {
      functions.push(val.toString())
      return "{func_" + (functions.length - 1) + "}"
    }
    return val
  };

  // regex replacer - replaces placeholders with functions
  const funcReplacer = (match, id) => {
    return functions[id]
  }

  const result = JSON
    .stringify(options.extendTheme || {}, jsonReplacer, 2)
    .replace(/"\{func_(\d+)\}"/g, funcReplacer)

  return result
})() %>


export default defineNuxtPlugin((nuxtApp) => {

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

  const app = nuxtApp.vueApp
  const isBrowser = typeof document !== "undefined"

  // Variable merging
  const cssReset = <%= options.cssReset %>
  const icons = <%= JSON.stringify(options.icons || "NULL", null, 2) %>
  const isBaseTheme = <%= options.isBaseTheme %>
  const emotionCacheOptions = <%= JSON.stringify(options.emotionCacheOptions || "NULL", null, 2) %>

  const pluginOptions = {
    cssReset,
    extendTheme: extendBaseTheme(extendedTheme, {
      config: {
        initialColorMode: isBrowser
          ? window.$chakraSSRContext?.theme?.ssrColorMode
          : ssrColorMode,
      },
    }),
    ...(icons !== "NULL" && {
      icons,
    }),
    ...(emotionCacheOptions !== "NULL" && {
      emotionCacheOptions,
    }),
    isBaseTheme
  }

  // Install plugin
  app.use(
    Chakra,
    extendChakra({
      ...pluginOptions,
      colorModeManager: cookieStorageManagerSSR(
        ColorModeConstants.CookieStorageKey
      ),
    })
  )
})
