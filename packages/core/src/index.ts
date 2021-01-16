import { Plugin } from 'vue'
import { ThemeOverride, extendTheme } from './extend-theme'

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
}

const ChakraUIVuePlugin: Plugin = {
  install(app, options: ChakraUIVuePluginOptions = {}) {
    app.config.globalProperties.$chakraTheme = options.extendTheme
  },
}

export default ChakraUIVuePlugin
export { extendTheme }
