import { inject } from "vue"
import { useColorMode } from "@chakra-ui/c-color-mode"
import { ChakraTheme } from "@chakra-ui/theme"

/** Provides theme object in component context */
export const useTheme = <T extends ChakraTheme = ChakraTheme>(): T => {
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
