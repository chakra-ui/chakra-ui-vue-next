import { __DEV__ } from '@chakra-ui/utils'
import { inject, ref } from 'vue'
import { ColorMode } from './color-mode.utils'

export type { ColorMode }

export interface ColorModeOptions {
  initialColorMode?: ColorMode
  useSystemColorMode?: boolean
}

interface ColorModeContextType {
  colorMode: ColorMode
  toggleColorMode: () => void
  setColorMode: (value: any) => void
}

/** Injects color mode into component instance */
export const useColorMode = () => {
  const _colorMode = inject('$chakraColorMode') as ColorMode
  const colorMode = ref(_colorMode)

  const toggleColorMode = () => {
    colorMode.value = 'light'
      ? (colorMode.value = 'dark')
      : (colorMode.value = 'light')
  }

  return {
    colorMode,
    toggleColorMode,
  }
}
