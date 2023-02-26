import { inject } from "vue"
import { useColorMode } from "@chakra-ui/c-color-mode"
import type { ThemeOverride } from "@chakra-ui/theme-utils"
import type { WithCSSVar } from "@chakra-ui/styled-system"

/** Provides theme object in component context */
export const useTheme = <
  T extends WithCSSVar<ThemeOverride> = WithCSSVar<ThemeOverride>
>(): T => {
  const theme = inject("$chakraTheme") as T
  return theme
}

/** Single hook to provide theme and color mode values */
export const useChakra = () => {
  const theme = useTheme()
  const { colorMode, forced } = useColorMode()
  return {
    theme,
    colorMode,
    forced,
  }
}
