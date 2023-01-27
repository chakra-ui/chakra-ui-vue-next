import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addServerPlugin,
  installModule,
  addPluginTemplate,
  addComponent,
} from "@nuxt/kit"
import type * as NuxtSchema from "@nuxt/schema"
import {
  ChakraPluginOptions,
  extendTheme as _extendTheme,
} from "@chakra-ui/vue-next"
import { mergeWith } from "@chakra-ui/utils"
import * as ChakraComponents from "@chakra-ui/vue-next"

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

function getChakraComponents() {
  const Components = []
  const _ChakraComponents = ChakraComponents as Record<string, any>
  for (const component in _ChakraComponents) {
    /**
     * Group of strict checks to make sure that
     * we only generate types for components.
     */
    if (
      component.startsWith("C") &&
      _ChakraComponents[component]?.name &&
      _ChakraComponents[component]?.setup &&
      typeof _ChakraComponents[component]?.setup === "function"
    ) {
      Components.push(_ChakraComponents[component])
    }
  }

  return Components
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

    for (const Component of getChakraComponents()) {
      addComponent({
        name: Component.name,
        export: Component.name,
        filePath: "@chakra-ui/vue-next",
      })
    }

    // Resolve template and inject plugin
    addServerPlugin(resolve(runtimeDir, "chakra.server"))
    addPlugin(resolve(runtimeDir, "chakra.factory.universal"))
    addPluginTemplate(
      {
        src: resolve(templatesDir, "chakra.universal.t.js"),
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
