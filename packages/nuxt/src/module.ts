import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addServerPlugin,
  installModule,
  addPluginTemplate,
} from "@nuxt/kit"
import type * as NuxtSchema from "@nuxt/schema"
import { ChakraPluginOptions } from "@chakra-ui/vue-next"

/** Chakra UI Vue SSR Context State */
export interface ChakraUISSRContext {
  theme?: {
    ssrColorMode: "light" | "dark"
  }
}

declare global {
  interface Window {
    $chakraSSRContext: ChakraUISSRContext
  }
}

export default defineNuxtModule<ChakraPluginOptions>({
  meta: {
    name: "@chakra-ui/nuxt-next",
    configKey: "chakra",
    compatibilty: ">=3.0.0",
  },
  setup(_options, nuxt) {
    console.log("chakra-ui-nuxt:module")
    const theme = _options.extendTheme

    // Install emotion module
    installModule("@nuxtjs/emotion")
    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = resolve("./runtime")
    const templatesDir = resolve("./templates")
    nuxt.options.build.transpile.push("@chakra-ui")
    nuxt.options.build.transpile.push(runtimeDir)
    addServerPlugin(resolve(runtimeDir, "chakra.server"))
    // addPluginTemplate(resolve(templatesDir, "chakra.universal.t"))
    addPluginTemplate({
      src: resolve(templatesDir, "chakra.universal.t.js"),
      options: {
        theme: theme,
        cssReset: true,
        icons: {},
        emotionCacheOptions: {
          key: "chakra",
        },
        isBaseTheme: true,
      } as ChakraPluginOptions,
    })
  },
})
