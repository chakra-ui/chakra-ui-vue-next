import { injectGlobal } from '@chakra-ui/vue-system'
import { cssResetStyles } from '@chakra-ui/c-reset'
import { ThemeOverride } from '../extend-theme'
import { get, runIfFn } from '@chakra-ui/utils'
import { css } from '@chakra-ui/styled-system'
import { ColorModeRef } from '@chakra-ui/c-color-mode'
import { computed, ref, watch } from 'vue'

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
  const globalStyles = computed(() =>
    runIfFn(styleObjectOrFn, {
      theme,
      colorMode: colorMode.value,
    })
  )
  if (!globalStyles.value) return undefined
  const id = ref(0)
  watch(
    colorMode,
    () => {
      console.log('colorMode', colorMode.value)
      const styles = css(globalStyles.value)(theme)
      console.log(
        injectGlobal({
          ['html']: styles,
        })
      )
    },
    {
      immediate: true,
    }
  )
}
