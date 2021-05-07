import { __DEV__ } from '@chakra-ui/utils'
import { inject, isRef, ref, watchEffect } from 'vue'
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

/**
 * Change value based on color mode.
 *
 * @param light the light mode value
 * @param dark the dark mode value
 *
 * @example
 *
 * ```js
 * const Icon = useColorModeValue(MoonIcon, SunIcon)
 * ```
 */
export function useColorModeValue<TLight = unknown, TDark = unknown>(
  light: TLight,
  dark: TDark
) {
  const { colorMode } = useColorMode()
  const modeValue = ref()

  watchEffect(() => {
    modeValue.value = colorMode.value === 'dark' ? dark : light
  })

  return modeValue
}
