import { computed, ComputedRef, inject, provide, ref } from 'vue'

import { SystemStyleObject } from '@chakra-ui/styled-system'
import { ChakraComponentName, ComponentThemeConfig } from '@chakra-ui/vue-theme'
import { ThemingProps } from '../system.types'
import { DeepPartial } from '../system.utils'
import { filterUndefined, get, mergeWith, runIfFn } from '@chakra-ui/vue-utils'
import { useChakra } from './use-chakra'

export type AllThemedComponents = ChakraComponentName &
  keyof Record<string, any>

/**
 * This type allows us to loosely type values for consumer provided
 * components in the theme config.
 *
 * @note At the time of writing this, I'm not sure whether this should
 * be loosely typed with a {DeepComponentThemeConfig} or should be strictly
 * typed with as the {ComponentThemeConfig}
 */
export type DeepComponentThemeConfig = DeepPartial<ComponentThemeConfig>

export function useStyleConfig(
  themeKey: AllThemedComponents,
  themingProps: ThemingProps,
  options: { isMultiPart: true },
  userStyleConfig?: DeepComponentThemeConfig
): ComputedRef<Record<string, SystemStyleObject>>

export function useStyleConfig(
  themeKey: AllThemedComponents,
  themingProps?: ThemingProps,
  options?: { isMultiPart?: boolean },
  userStyleConfig?: DeepComponentThemeConfig
): ComputedRef<SystemStyleObject>

export function useStyleConfig(
  themeKey: any,
  themingProps: any,
  options: any = {},
  userStyleConfig?: any
) {
  const { theme, colorMode } = useChakra()
  const themeStyleConfig = get(theme, `components.${themeKey}`)

  const styleConfig = userStyleConfig || themeStyleConfig

  const mergedProps = mergeWith(
    { theme, colorMode },
    styleConfig?.defaultProps ?? {},
    filterUndefined(themingProps)
  )

  return computed(() => {
    const baseStyles = runIfFn(styleConfig.baseStyle ?? {}, mergedProps)
    const variants = runIfFn(
      styleConfig.variants?.[mergedProps.variant] ?? {},
      mergedProps
    )

    const sizes = runIfFn(
      styleConfig.sizes?.[mergedProps.size] ?? {},
      mergedProps
    )

    type ComponentStyles = SystemStyleObject | Record<string, SystemStyleObject>
    const styles = mergeWith({}, baseStyles, sizes, variants) as ComponentStyles

    if (options.isMultiPart && styleConfig.parts) {
      styleConfig.parts.forEach((part: keyof ComponentStyles) => {
        // @ts-expect-error
        styles[part] = styles[part] ?? {}
      })
    }

    return styles
  })
}

export function useMultiStyleConfig(
  themeKey: AllThemedComponents,
  themingProps: any
) {
  return useStyleConfig(themeKey, themingProps, { isMultiPart: true })
}

/** Provides Chakra Multi-parted component styles to descendants */
export const provideComponentStyles = (
  component: AllThemedComponents,
  styles: SystemStyleObject
) => {
  provide<SystemStyleObject>(`$chakra${component}Styles`, styles)
}

/** Injects Chakra Multi-parted component styles from ancestor */
export const useComponentStyles = (component: AllThemedComponents) => {
  return inject<Record<string, SystemStyleObject> & SystemStyleObject & any>(
    `$chakra${component}Styles`
  )
}
