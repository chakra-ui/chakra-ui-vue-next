import { Plugin } from 'vue'
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

    // Initialize colormode
    const colorMode = theme.config?.initialColorMode || 'light'

    // Bind theme to application global properties and provide to application
    app.config.globalProperties.$chakraTheme = computedTheme
    app.provide('$chakraTheme', computedTheme as ThemeOverride)

    // Provide initial colormode
    app.provide('$chakraColorMode', colorMode as ColorMode)

    libraryIcons = parseIcons(libraryIcons)

    // Merge internal icons and library icons
    const mergedIcons: MergedIcons = {
      ...internalIcons,
      ...libraryIcons,
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
export const CBox = chakra.div

export * from '@chakra-ui/c-accordion'
export * from '@chakra-ui/c-alert'

export * from '@chakra-ui/c-badge'
export * from '@chakra-ui/c-button'

export * from '@chakra-ui/c-flex'

export * from '@chakra-ui/c-icon'

export * from '@chakra-ui/c-portal'

export * from '@chakra-ui/c-reset'

export * from '@chakra-ui/c-spinner'

export * from '@chakra-ui/c-theme-provider'

export * from '@chakra-ui/c-visually-hidden'
