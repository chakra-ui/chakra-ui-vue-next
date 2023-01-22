import { __DEV__ } from "@chakra-ui/utils"
import {
  computed,
  defineComponent,
  inject,
  h,
  Fragment,
  provide,
  readonly,
  Ref,
  ref,
  watch,
  watchEffect,
  getCurrentInstance,
} from "vue"
import { ColorMode, ColorModeRef, getColorModeUtils } from "./color-mode.utils"
import { StorageManager } from "./storage-manager"
import { createContext } from "@chakra-ui/vue-utils"
import { mountColorModeScript } from './color-mode-script'

export type { ColorModeRef }

export interface ColorModeOptions {
  initialColorMode?: ColorModeRef
  useSystemColorMode?: boolean
}

export type ColorModeContext = {
  colorMode: ColorModeRef
  toggleColorMode: () => void
}

export interface InternalColorModeContext {
  colorModeManager: StorageManager
  toggleColorMode(): void
  colorMode: Ref<Exclude<ColorMode, "system">>
  useSystemColorMode?: boolean
  disableTransitionOnChange?: boolean
  initialColorMode?: ColorMode
}

function getTheme(manager: StorageManager, fallback?: ColorMode) {
  return manager.type === "cookie" && manager.ssr
    ? manager.get(fallback)
    : fallback
}

export interface IColorModeContext {
  colorMode: ColorModeRef
  toggleColorMode: () => void
  forced?: boolean
}

const [ColorModeProvider, useColorModeContext] =
  createContext<IColorModeContext>({
    name: "ColorModeContext",
  })

interface SetupColorModeContext {
  _colorMode: ColorModeRef
  colorModeManager: StorageManager
  useSystemColorMode?: boolean
  disableTransitionOnChange?: boolean
  initialColorMode?: ColorMode
}

export const AppColorModeContextSymbol = Symbol("AppColorModeContextSymbol")

export function setupColorModeContext(
  app: any,
  {
    _colorMode,
    colorModeManager,
    useSystemColorMode,
    disableTransitionOnChange,
    initialColorMode,
  }: SetupColorModeContext
) {

  mountColorModeScript({
    initialColorMode: _colorMode.value,
    type: colorModeManager.type,
  })

  const colorMode = computed({
    get: () =>
      (getTheme(colorModeManager, _colorMode.value) as Exclude<
        ColorMode,
        "system"
      >) || (_colorMode.value as Exclude<ColorMode, "system">),
    set: (value: Exclude<ColorMode, "system">) => {
      _colorMode.value = value
    },
  })

  const utils = computed(() =>
    getColorModeUtils({ preventTransition: disableTransitionOnChange })
  )

  const managerValue = colorModeManager.get()

  if (managerValue) {
    setColorMode(managerValue)
  } else if (initialColorMode === "system") {
    setColorMode("system")
  } else {
    setColorMode(colorMode.value)
  }

  const resolvedColorMode = computed(() => getTheme(colorModeManager))


  function setColorMode(value: ColorMode | "system") {
    const { setClassName, setDataset, getSystemTheme } = utils.value
    const resolved = value === "system" ? getSystemTheme() : value
    colorMode.value = resolved

    setClassName(resolved === "dark")
    setDataset(resolved)

    colorModeManager.set(resolved)
  }

  const toggleColorMode = () => {
    if (colorMode.value === "light") {
      setColorMode("dark")
    } else {
      setColorMode("light")
    }
  }

  watch(
    () => useSystemColorMode,
    (nextUseSystemColorMode) => {
      if (typeof document !== "undefined") {
        if (!nextUseSystemColorMode) return
        return utils.value.addListener(setColorMode)
      }
    },
    {
      immediate: true,
    }
  )

  app.provide(AppColorModeContextSymbol, {
    colorMode: computed(() => colorMode.value),
    toggleColorMode,
  })
}

/** Injects color mode into component instance */
export const useColorMode = () => {
  const context = inject<IColorModeContext>(AppColorModeContextSymbol, {
    colorMode: computed(() => "light" as Exclude<ColorMode, "system">),
    toggleColorMode: () => { },
  })
  return context
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


export const DarkMode = defineComponent((_, { slots, attrs }) => {
  provide(AppColorModeContextSymbol, {
    colorMode: computed(() => "dark" as Exclude<ColorMode, "system">),
    toggleColorMode: () => { },
    forced: true
  })

  return () => (
    <>
      {slots.default?.()}
    </>
  )
})

export const LightMode = defineComponent((_, { slots, attrs }) => {
  provide(AppColorModeContextSymbol, {
    colorMode: computed(() => "light" as Exclude<ColorMode, "system">),
    toggleColorMode: () => { },
    forced: true
  })

  return () => (
    <>
      {slots.default?.()}
    </>
  )
})
