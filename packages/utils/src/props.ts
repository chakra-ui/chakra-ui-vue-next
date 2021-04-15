import { ThemingProps } from '@chakra-ui/vue-system'
import { PropType } from 'vue'

export const vueThemingProps = {
  colorScheme: String as PropType<ThemingProps['colorScheme']>,
  variant: String as PropType<ThemingProps['variant']>,
  size: String as PropType<ThemingProps['size']>,
  styleConfig: String as PropType<ThemingProps['styleConfig']>,
}

export const SNA = [Number, String, Array]
export const SAO = [String, Array, Object]
export const SNAO = [Number, String, Array, Object]
