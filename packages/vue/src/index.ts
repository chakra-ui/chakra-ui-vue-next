import { computed, createVNode, Plugin, ref, render, UnwrapRef } from "vue"
import { theme as defaultTheme, baseTheme, Theme } from "@chakra-ui/theme"
import { ColorModeRef, setupColorModeContext } from "@chakra-ui/c-color-mode"
import { toCSSVar, WithCSSVar } from "@chakra-ui/styled-system"
import { chakra, injectGlobal } from "@chakra-ui/vue-system"
import {
  EmotionThemeContextSymbol,
  EmotionCacheInjectionSymbol,
  createCache,
} from "@chakra-ui/vue-styled"
import type { EmotionCache } from "@emotion/cache"
import internalIcons from "./icon.internals"
import type { ThemeOverride } from "@chakra-ui/theme-utils"
import { MergedIcons, parseIcons } from "./parse-icons"
import { injectResetStyles, injectThemeGlobalStyles } from "./helpers/css-reset"
import { mode } from "@chakra-ui/theme-tools"
import { ChakraPluginOptions } from "./helpers/plugin.types"
import { canUseDOM, Dict } from "@chakra-ui/utils"
import { localStorageManager } from "@chakra-ui/c-color-mode"
import {
  ToastContainerId,
  CToastContainer,
  ToastContextSymbol,
  toastContext,
} from "@chakra-ui/c-toast"

/**
 * 1. Support passing cache options from plugin
 * 2. Provide emotion theme directly from plugin
 * 3.
 */

const defaultPluginOptions: ChakraPluginOptions = {
  cssReset: true,
  isBaseTheme: false,
  colorModeManager: localStorageManager,
}

/**
 * Helper function to extend Chakra plugin with options
 * It just returns its arguments with typescript types added
 */
export function extendChakra(options = defaultPluginOptions) {
  return options
}

const ChakraUIVuePlugin: Plugin = {
  install(app, options: ChakraPluginOptions = defaultPluginOptions) {
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
    app.provide(EmotionThemeContextSymbol, computedTheme.value)
    app.provide("$chakraTheme", computedTheme.value as ThemeOverride)

    let emotionCache: EmotionCache
    // Provide emotion cache
    if (options.emotionCacheOptions) {
      emotionCache = createCache(options.emotionCacheOptions)
      app.provide(EmotionCacheInjectionSymbol, emotionCache)
    }

    emotionCache ||= createCache({
      key: "chakra",
      nonce: `chakra-global-cache-${Date.now()}`,
    })

    // Inject `styles.global` in document
    injectThemeGlobalStyles(computedTheme.value, emotionCache, colorModeRef)

    libraryIcons = parseIcons(libraryIcons)

    // Merge internal icons and library icons
    const mergedIcons: MergedIcons = {
      ...internalIcons,
      ...libraryIcons,
      ...extendedIcons,
    }

    app.provide("$chakraIcons", mergedIcons)

    // Set color mode property
    app.config.globalProperties.$mode = mode

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

export type { ChakraPluginOptions }
export interface ThemeProviderProps extends ThemeOverride {}
export default ChakraUIVuePlugin
export { extendTheme, extendBaseTheme } from "@chakra-ui/theme-utils"
export * from "@chakra-ui/vue-system"

// Export chakra factory function
export { chakra as chakra }

import * as ChakraComponents from "./components"
export { ChakraComponents }

/**
 *
 * Component exports
 * ==================
 *
 * Dear contributors,
 *
 * Please keep these exports in Alphabetical order :)
 */

// A
export * from "@chakra-ui/c-accordion"
export * from "@chakra-ui/c-alert"
export * from "@chakra-ui/c-avatar"

// B
export * from "@chakra-ui/c-breadcrumb"
export * from "@chakra-ui/c-button"

// C
export * from "@chakra-ui/c-checkbox"
export * from "@chakra-ui/c-color-mode"
export * from "@chakra-ui/c-close-button"
export * from "@chakra-ui/c-code"

// F
export * from "@chakra-ui/c-focus-lock"
export * from "@chakra-ui/c-form-control"

// I
export * from "@chakra-ui/c-icon"
export * from "@chakra-ui/c-image"
export * from "@chakra-ui/c-input"

// L
export * from "@chakra-ui/vue-layout"

// M
export * from "@chakra-ui/c-media-query"
export * from "@chakra-ui/c-menu"
export * from "@chakra-ui/c-modal"
export * from "@chakra-ui/c-motion"

// P
export * from "@chakra-ui/c-pin-input"
export * from "@chakra-ui/c-popper"
export * from "@chakra-ui/c-portal"

// R
export * from "@chakra-ui/c-reset"

// S
export * from "@chakra-ui/c-skip-nav"
export * from "@chakra-ui/c-spinner"
export * from "@chakra-ui/c-scroll-lock"

// T
export * from "@chakra-ui/c-theme-provider"
export * from "@chakra-ui/c-tag"
export * from "@chakra-ui/c-toast"

// V
export * from "@chakra-ui/c-visually-hidden"

// OTHERS
export * from "@chakra-ui/vue-accessibilty"
export * from "@chakra-ui/vue-composables"
export * from "@chakra-ui/vue-utils"

/**
 *
 * Directives exports
 * ==================
 *
 * Dear contributors,
 *
 * Please keep these exports in Alphabetical order :)
 */
