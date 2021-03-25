import { useColorMode } from '@chakra-ui/c-color-mode'
import { inject, ref } from 'vue'
import { Dict } from '@chakra-ui/vue-utils'

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
