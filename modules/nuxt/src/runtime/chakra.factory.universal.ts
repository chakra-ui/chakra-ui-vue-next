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
  domElements.forEach((tag) => {
    app.component(`chakra.${tag}`, chakra(tag))
  })
})
