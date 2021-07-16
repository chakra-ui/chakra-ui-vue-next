import { injectGlobal } from '@chakra-ui/vue-system'
import { cssResetStyles } from '@chakra-ui/c-reset'
import { ThemeOverride } from '../extend-theme'
import { get, runIfFn } from '@chakra-ui/utils'
import { ColorModeRef } from '@chakra-ui/c-color-mode'
import { css } from '@chakra-ui/styled-system'

/** Injects CSS reset styles */
export function injectResetStyles() {
  injectGlobal(cssResetStyles)
}

/** Injects styles from `theme.styles.global` property */
export function injectThemeGlobalStyles(
  theme: ThemeOverride,
  colorMode: ColorModeRef
) {
  const styleObjectOrFn = get(theme, 'styles.global')
  const globalStyles = runIfFn(styleObjectOrFn, {
    theme,
    colorMode: colorMode.value,
  })
  if (!globalStyles) return undefined
  const styles = css(globalStyles)(theme)
  injectGlobal(styles)
}
