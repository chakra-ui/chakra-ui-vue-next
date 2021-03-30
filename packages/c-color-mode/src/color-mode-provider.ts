import { __DEV__ } from '@chakra-ui/utils'
import { createContext } from '@chakra-ui/vue-utils'
import {
  defineComponent,
  Fragment,
  getCurrentInstance,
  h,
  inject,
  isRef,
  ref,
} from 'vue'
import { ColorMode } from './color-mode.utils'

export type { ColorMode }

export interface ColorModeOptions {
  initialColorMode?: ColorMode
  useSystemColorMode?: boolean
}

export type ColorModeContext = {
  colorMode: ColorMode
  toggleColorMode: () => void
}

/** Injects color mode into component instance */
export const useColorMode = (): ColorModeContext => {
  const _colorMode = inject('$chakraColorMode') as ColorMode
  const colorMode = isRef(_colorMode) ? _colorMode : ref(_colorMode)

  const toggleColorMode = () => {
    if (colorMode.value === 'light') {
      colorMode.value = 'dark'
    } else {
      colorMode.value = 'light'
    }
  }

  return {
    colorMode,
    toggleColorMode,
  }
}
