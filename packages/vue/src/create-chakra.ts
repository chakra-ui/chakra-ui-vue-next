import { computed, ref, createVNode, render, UnwrapRef } from "vue"
import { localStorageManager } from "@chakra-ui/c-color-mode"
import mergeWith from "lodash.mergewith"
import { theme as defaultTheme, baseTheme, Theme } from "@chakra-ui/theme"
import { canUseDOM } from "@chakra-ui/utils"
import { toCSSVar } from "@chakra-ui/styled-system"
import { mode } from "@chakra-ui/theme-tools"
import {
  injectGlobal,
  chakra,
  createCache,
  chakraEmotionCache,
  domElements,
} from "@chakra-ui/vue-system"

import { setupColorModeContext } from "@chakra-ui/c-color-mode"
import { injectResetStyles, injectThemeGlobalStyles } from "./helpers/css-reset"
import { EmotionCacheInjectionSymbol } from "@chakra-ui/vue-styled"

import {
  ToastContainerId,
  CToastContainer,
  ToastContextSymbol,
  toastContext,
} from "@chakra-ui/c-toast"

import internalIcons from "./icon.internals"
import { MergedIcons, parseIcons } from "./parse-icons"

// Type imports
import type { Plugin } from "vue"
import type { Dict } from "@chakra-ui/utils"
import type { EmotionCache } from "@emotion/cache"
import type { WithCSSVar } from "@chakra-ui/styled-system"
import type { ThemeOverride } from "@chakra-ui/theme-utils"
import type { ColorModeRef } from "@chakra-ui/c-color-mode"
import type { ChakraPluginOptions } from "./helpers/plugin.types"

const defaultPluginOptions: ChakraPluginOptions = {
  cssReset: true,
  isBaseTheme: false,
  colorModeManager: localStorageManager,
  experimental: {
    disableFactoryComponents: false,
  },
}

/**
 * Helper function to extend Chakra plugin with options
 * It just returns its arguments with typescript types added
 */
export function extendChakra(options = defaultPluginOptions) {
  return options
}

export function createChakra(_options: ChakraPluginOptions = {}) {
  const ChakraUIVuePlugin: Plugin = {
    install(app) {
      const options = mergeWith(
        {},
        defaultPluginOptions,
        _options
      ) as ChakraPluginOptions
      // 1. Get theme value
      // 2. Parse theme tokens to CSS variables
      // 3. Inject all CSS variables as theme object
      const theme =
        options.extendTheme! ||
        ((options.isBaseTheme ? baseTheme : defaultTheme) as any as
          | Theme
          | (Omit<Theme, "components"> & { components: Dict }))
      const computedTheme = computed<WithCSSVar<ThemeOverride>>(() =>
        toCSSVar(theme)
      )

      const colorModeManager = options.colorModeManager || localStorageManager
      // Inject Chakra CSS variables
      injectGlobal({
        ":root": computedTheme.value.__cssVars,
      })

      // Initialize color mode
      const colorMode: UnwrapRef<ColorModeRef> =
        theme.config?.initialColorMode || "light"

      const colorModeRef = ref(colorMode) as ColorModeRef

      setupColorModeContext(app, {
        _colorMode: colorModeRef,
        colorModeManager,
        useSystemColorMode: theme.config?.useSystemColorMode || false,
        initialColorMode: colorMode,
        disableTransitionOnChange:
          theme.config?.disableTransitionOnChange || false,
      })

      if (options.cssReset) {
        injectResetStyles()
      }

      let libraryIcons = options.icons?.library || {}
      let extendedIcons = options.icons?.extend || {}

      // Bind theme to application global properties and provide to application
      app.config.globalProperties.$chakraTheme = computedTheme.value
      app.config.globalProperties.$chakraTheme = computedTheme.value
      app.provide("$chakraTheme", computedTheme.value as ThemeOverride)

      let emotionCache: EmotionCache
      // Provide emotion cache
      if (options.emotionCacheOptions) {
        emotionCache = createCache(options.emotionCacheOptions)
        app.provide(EmotionCacheInjectionSymbol, emotionCache)
      }

      emotionCache ||= chakraEmotionCache

      // Inject `styles.global` in document
      injectThemeGlobalStyles(computedTheme.value, emotionCache, colorModeRef)

      libraryIcons = parseIcons(libraryIcons)

      // Factory components
      if (!options.experimental?.disableFactoryComponents) {
        domElements.forEach((tag) => {
          app.component(`chakra.${tag}`, chakra(tag))
        })
      }

      // Merge internal icons and library icons
      const mergedIcons: MergedIcons = {
        ...internalIcons,
        ...libraryIcons,
        ...extendedIcons,
      }

      app.provide("$chakraIcons", mergedIcons)

      // Set color mode property
      app.config.globalProperties.$mode = mode

      console.log(ToastContextSymbol, toastContext)
      app.provide(ToastContextSymbol, toastContext)

      // Setup toast container component
      if (canUseDOM()) {
        const toastContainer =
          document.getElementById(ToastContainerId) ||
          document.createElement("div")
        toastContainer.id = ToastContainerId
        toastContainer.setAttribute("data-chakra-toast-container", "")

        if (!document.body.contains(toastContainer)) {
          document.body.insertAdjacentElement("afterend", toastContainer)
        }

        const vnode = createVNode(CToastContainer)
        vnode.appContext = app._context
        render(vnode, toastContainer)
      }
    },
  }

  return ChakraUIVuePlugin
}
