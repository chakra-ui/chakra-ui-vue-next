import { ColorMode } from '@chakra-ui/c-color-mode'
import { ThemeOverride } from '../extend-theme'

interface ExtendIconsPath {
  path: string
  viewBox?: string
}

interface IconsOptions {
  pack?: 'fa' | 'fe'
  library?: {}
  extend?: Record<string, ExtendIconsPath>
}
export interface ChakraPluginOptions {
  cssReset?: boolean
  extendTheme?: ThemeOverride
  icons?: IconsOptions
  defaultColorMode?: ColorMode
}
