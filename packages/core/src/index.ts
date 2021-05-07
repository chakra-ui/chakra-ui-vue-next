import { Plugin, Ref, ref } from 'vue'
import defaultTheme, { ColorMode } from '@chakra-ui/vue-theme'
import { toCSSVar, WithCSSVar } from '@chakra-ui/styled-system'
import { chakra, injectGlobal } from '@chakra-ui/vue-system'
import internalIcons from './icon.internals'
import { extendTheme, ThemeOverride } from './extend-theme'
import { MergedIcons, parseIcons } from './parse-icons'

interface ExtendIconsPath {
  path: string
  viewBox?: string
}
interface IconsOptions {
  pack?: 'fa' | 'fe'
  library?: {}
  extend?: Record<string, ExtendIconsPath>
}
export interface ChakraUIVuePluginOptions {
  extendTheme?: ThemeOverride
  icons?: IconsOptions
  defaultColorMode?: ColorMode
}

const ChakraUIVuePlugin: Plugin = {
  install(app, options: ChakraUIVuePluginOptions = {}) {
    // 1. Get theme value
    // 2. Parse theme tokens to CSS variables
    // 3. Inject all CSS variables as theme object
    const theme = options.extendTheme || defaultTheme
    const computedTheme: WithCSSVar<ThemeOverride> = toCSSVar(theme)
    injectGlobal({
      ':root': computedTheme.__cssVars,
    })

    let libraryIcons = options.icons?.library || {}
    let extendedIcons = options.icons?.extend || {}

    // Initialize colormode
    const colorMode: ColorMode = theme.config?.initialColorMode || 'light'

    // Bind theme to application global properties and provide to application
    app.config.globalProperties.$chakraTheme = computedTheme
    app.provide('$chakraTheme', computedTheme as ThemeOverride)

    // Provide initial colormode
    app.config.globalProperties.$initialColorMode = colorMode
    app.provide<Ref<ColorMode>>('$chakraColorMode', ref<ColorMode>(colorMode))

    libraryIcons = parseIcons(libraryIcons)

    // Merge internal icons and library icons
    const mergedIcons: MergedIcons = {
      ...internalIcons,
      ...libraryIcons,
      ...extendedIcons,
    }
    app.provide('$chakraIcons', mergedIcons)
  },
}

export interface ThemeProviderProps extends ThemeOverride {}
export default ChakraUIVuePlugin
export { extendTheme }

// Export chakra factory function
export { chakra }

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
export * from '@chakra-ui/c-accordion'
export * from '@chakra-ui/c-alert'

// B
export * from '@chakra-ui/c-button'

// C
export * from '@chakra-ui/c-color-mode'
export * from '@chakra-ui/c-close-button'
export * from '@chakra-ui/c-code'

// F
export * from '@chakra-ui/c-flex'

// I
export * from '@chakra-ui/c-icon'

// L
export * from '@chakra-ui/vue-layout'

// M
export * from '@chakra-ui/c-modal'

// P
export * from '@chakra-ui/c-popper'
export * from '@chakra-ui/c-portal'

// R
export * from '@chakra-ui/c-reset'

// S
export * from '@chakra-ui/c-spinner'

// T
export * from '@chakra-ui/c-theme-provider'

// V
export * from '@chakra-ui/c-visually-hidden'
