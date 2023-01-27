import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addServerPlugin,
  installModule,
  addPluginTemplate,
} from "@nuxt/kit"
import type * as NuxtSchema from "@nuxt/schema"
import {
  ChakraPluginOptions,
  extendTheme as _extendTheme,
} from "@chakra-ui/vue-next"
import { mergeWith } from "@chakra-ui/utils"

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

export type ChakraModuleOptions = Omit<ChakraPluginOptions, "colorModeManager">

const defaultModuleOptions: ChakraModuleOptions = {
  cssReset: true,
  isBaseTheme: false,
}

export default defineNuxtModule<ChakraModuleOptions>({
  meta: {
    name: "@chakra-ui/nuxt-next",
    configKey: "chakra",
    compatibilty: ">=3.0.0",
  },
  setup(__options, nuxt) {
    console.log("chakra-ui-nuxt:module")
    const _options = mergeWith(
      defaultModuleOptions,
      __options
    ) as ChakraModuleOptions

    const extendTheme = _extendTheme(_options.extendTheme || {})
    const icons = _options.icons
    const isBaseTheme = _options.isBaseTheme
    const emotionCacheOptions = _options.emotionCacheOptions
    const cssReset = _options.cssReset

    // Install emotion module
    installModule("@nuxtjs/emotion")
    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = resolve("./runtime")
    const templatesDir = resolve("./templates")
    nuxt.options.build.transpile.push("@chakra-ui")
    nuxt.options.build.transpile.push(runtimeDir)
    addServerPlugin(resolve(runtimeDir, "chakra.server"))

    // Resolve template and inject plugin
    addPlugin(resolve(runtimeDir, "chakra.factory.universal"))
    addPluginTemplate(
      {
        src: resolve(templatesDir, "chakra.universal.t.ts"),
        options: {
          extendTheme,
          cssReset,
          icons,
          emotionCacheOptions,
          isBaseTheme,
        } as ChakraPluginOptions,
      },
      {
        append: true,
      }
    )
  },
})
