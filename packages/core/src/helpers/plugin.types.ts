import { ColorModeRef } from "@chakra-ui/c-color-mode"
import { UnwrapRef } from "vue"
import { Options } from "@emotion/cache"
import { ThemeOverride } from "@chakra-ui/theme-utils"

interface ExtendIconsPath {
  path: string
  viewBox?: string
}

interface IconsOptions {
  pack?: "fa" | "fe"
  library?: {}
  extend?: Record<string, ExtendIconsPath>
}
export interface ChakraPluginOptions {
  cssReset?: boolean
  extendTheme?: ThemeOverride
  icons?: IconsOptions
  defaultColorMode?: UnwrapRef<ColorModeRef>
  emotionCacheOptions?: Options
  isBaseTheme?: boolean
}
