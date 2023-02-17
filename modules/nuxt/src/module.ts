import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addServerPlugin,
  installModule,
} from "@nuxt/kit"
import type * as NuxtSchema from "@nuxt/schema"
import type * as Theme from "@chakra-ui/theme"
import type * as ChakraUI from "@chakra-ui/vue-next"
import * as Chakra from "@chakra-ui/vue-next"
import { mergeWith } from "@chakra-ui/utils"

const { extendTheme: _extendTheme } = Chakra
const ChakraPlugin = Chakra.default

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

export type ChakraModuleOptions = Omit<
  ChakraUI.ChakraPluginOptions,
  "colorModeManager"
>

const defaultModuleOptions: ChakraModuleOptions = {
  cssReset: true,
  isBaseTheme: true,
}

declare module "@nuxt/schema" {
  interface AppConfig {
    $chakraConfig: ChakraModuleOptions
  }
}

export default defineNuxtModule<ChakraModuleOptions>({
  meta: {
    name: "@chakra-ui/nuxt-next",
    configKey: "chakra",
    compatibilty: ">=3.0.0",
  },
  setup(__options, nuxt) {
    // Install emotion module
    // installModule("@nuxtjs/emotion")

    const _options = mergeWith(
      defaultModuleOptions,
      __options
    ) as ChakraModuleOptions

    const extendTheme = _extendTheme(_options.extendTheme || {})
    const icons = _options.icons
    const isBaseTheme = _options.isBaseTheme
    const emotionCacheOptions = _options.emotionCacheOptions
    const cssReset = _options.cssReset

    nuxt.hook("nitro:config", (config) => {
      // Prevent inlining emotion (+ the crucial css cache!) in dev mode
      if (nuxt.options.dev) {
        if (config.externals) {
          config.externals.external ||= []
          config.externals.external.push("@emotion/server")
        }
      }
    })

    nuxt.options.build.transpile.push("@chakra-ui")

    nuxt.options.appConfig.$chakraConfig = {
      extendTheme,
      isBaseTheme,
      icons,
      cssReset,
      emotionCacheOptions,
    }

    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = resolve("./runtime")
    nuxt.options.build.transpile.push(runtimeDir)

    // Add emotion plugins
    addServerPlugin(resolve(runtimeDir, "emotion.server"))
    addPlugin(resolve(runtimeDir, "emotion.client"))

    // Resolve template and inject plugin
    addPlugin(resolve(runtimeDir, "chakra"))
    addServerPlugin(resolve(runtimeDir, "chakra.server"))
  },
})
