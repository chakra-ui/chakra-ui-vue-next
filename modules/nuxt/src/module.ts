import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addServerPlugin,
  addComponent,
} from "@nuxt/kit"
import type * as NuxtSchema from "@nuxt/schema"
import type * as Theme from "@chakra-ui/theme"
import type * as ChakraUI from "@chakra-ui/vue-next"
import {
  ChakraComponents,
  extendTheme as _extendTheme,
} from "@chakra-ui/vue-next"
import mergeWith from "lodash.mergewith"
import { defu } from "defu"

// const { extendTheme: _extendTheme } = Chakra

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

    // Transpile
    nuxt.options.build.transpile.push("@chakra-ui/vue-next")
    nuxt.options.build.transpile.push("@emotion/server")
    nuxt.options.build.transpile.push("@emotion/css")
    nuxt.options.build.transpile.push("@emotion/css/create-instance")

    // Auto-import components
    for (const component in ChakraComponents) {
      /**
       * Group of strict checks to make sure that
       * we only generate types for components.
       */
      if (
        component.startsWith("C") &&
        // @ts-ignore
        ChakraComponents[component]?.name &&
        // @ts-ignore
        ChakraComponents[component]?.setup &&
        // @ts-ignore
        typeof ChakraComponents[component]?.setup === "function"
      ) {
        addComponent({
          name: component,
          // @ts-ignore
          export: ChakraComponents[component]?.name,
          filePath: "@chakra-ui/vue-next",
        })
      }
    }

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

    // Include all internal lodash modules
    // to the optimized dependencies since they do not
    // natively export ESM modules.
    // We should still preserve user-provided option
    const viteConfig = nuxt.options.vite || {}
    const extendedViteConfigOptions = {
      optimizeDeps: {
        include: [
          "lodash.mergewith",
          "lodash.camelcase",
          "lodash.memoize",
          "@emotion/server",
          "@emotion/css",
        ],
      },
    }
    const finalViteConfig = defu(viteConfig, extendedViteConfigOptions)
    nuxt.options.vite = finalViteConfig

    // Add emotion plugins
    addServerPlugin(resolve(runtimeDir, "emotion.server"))
    addPlugin(resolve(runtimeDir, "emotion.client"))

    // Resolve template and inject plugin
    addPlugin(resolve(runtimeDir, "chakra"))
    addServerPlugin(resolve(runtimeDir, "chakra.server"))
  },
})
