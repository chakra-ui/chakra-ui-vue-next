import components from './components'
import foundations from './foundations'
import styles from './styles'

export type ColorMode = 'light' | 'dark'

export interface ColorModeOptions {
  initialColorMode?: ColorMode
  useSystemColorMode?: boolean
}

/**
 * Color mode config
 */
const config: ColorModeOptions = {
  useSystemColorMode: false,
  initialColorMode: 'light',
}

export const theme = {
  ...foundations,
  components,
  styles,
  config,
}

export type Theme = typeof theme

export default theme
