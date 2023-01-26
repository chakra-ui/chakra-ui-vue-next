import type * as NuxtAppTypes from "nuxt/app"
import { defineNuxtPlugin } from "#imports"
import { ChakraPluginOptions } from "@chakra-ui/vue-next"

export default defineNuxtPlugin((_) => {
  console.log("chakra-ui-nuxt:client_runtime")
})
