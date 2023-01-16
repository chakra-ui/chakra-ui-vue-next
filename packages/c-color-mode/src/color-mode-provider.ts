import { __DEV__ } from "@chakra-ui/utils"
import { inject, isRef, ref, watchEffect } from "vue"
import { ColorModeRef, setDataset } from "./color-mode.utils"

export type { ColorModeRef }

export interface ColorModeOptions {
  initialColorMode?: ColorModeRef
  useSystemColorMode?: boolean
}

export type ColorModeContext = {
  colorMode: ColorModeRef
  toggleColorMode: () => void
}

/** Injects color mode into component instance */
export const useColorMode = (): ColorModeContext => {
  const _colorMode = inject("$chakraColorMode") as ColorModeRef
  const colorMode = isRef(_colorMode) ? _colorMode : ref(_colorMode)

  const toggleColorMode = () => {
    if (colorMode.value === "light") {
      colorMode.value = "dark"
    } else {
      colorMode.value = "light"
    }
    setDataset(colorMode.value)
  }

  return {
    colorMode,
    toggleColorMode,
  }
}

/**
 * Change value based on color mode.
 *
 * @param lightValue the light mode value
 * @param darkValue the dark mode value
 *
 * @example
 *
 * ```js
 * const Icon = useColorModeValue(MoonIcon, SunIcon)
 * ```
 */
export function useColorModeValue<TLight = unknown, TDark = unknown>(
  lightValue: TLight,
  darkValue: TDark
) {
  const { colorMode } = useColorMode()
  const modeValue = ref()

  watchEffect(() => {
    modeValue.value = colorMode.value === "dark" ? darkValue : lightValue
  })

  return modeValue
}
