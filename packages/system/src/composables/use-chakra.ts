import { inject } from 'vue'
import { useColorMode } from '@chakra-ui/c-color-mode'
import { Dict } from '@chakra-ui/utils'

/** Provides theme object in component context */
export const useTheme = <T extends object = Dict>(): T => {
  const theme = inject('$chakraTheme') as T
  return theme
}

/** Single hook to provide theme and color mode values */
export const useChakra = () => {
  const theme = useTheme()
  const { colorMode } = useColorMode()
  return {
    theme,
    colorMode,
  }
}
