import { Plugin } from 'vue'
import defaultTheme, { ColorMode } from '@chakra-ui/vue-theme'
import { extendTheme, ThemeOverride } from './extend-theme'

interface ExtendIconsPath {
  path: string
  viewBox?: string
}
interface IconsOptions {
  pack?: 'fa' | 'fe'
  library?: {}
  extend?: Record<string, ExtendIconsPath>
}
interface ChakraUIVuePluginOptions {
  extendTheme?: ThemeOverride
  icons?: IconsOptions
  defaultColorMode?: ColorMode
}

const ChakraUIVuePlugin: Plugin = {
  install(app, options: ChakraUIVuePluginOptions = {}) {
    const theme = options.extendTheme || defaultTheme
    const colorMode = options.defaultColorMode || 'light'
    app.config.globalProperties.$chakraTheme = theme
    app.provide('$chakraTheme', theme as ThemeOverride)
    app.provide('$chakraColorMode', colorMode as ColorMode)
  },
}

export interface ThemeProviderProps extends ThemeOverride {}
export default ChakraUIVuePlugin
export { extendTheme }
