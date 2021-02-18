import { SystemCSSProperties } from '@chakra-ui/styled-system'
import { DOMElements, ThemingProps } from '@chakra-ui/vue-system'
import { PropType } from 'vue'

type ButtonTypes = 'button' | 'reset' | 'submit'

export const BUTTON_PROPS = {
  as: {
    type: String as PropType<DOMElements>,
    default: 'button',
  },
  isLoading: Boolean as PropType<boolean>,
  isActive: Boolean as PropType<boolean>,
  isDisabled: Boolean as PropType<boolean>,
  loadingText: String as PropType<string>,
  isFullWidth: Boolean as PropType<boolean>,
  type: String as PropType<ButtonTypes>,
  leftIcon: String as PropType<string>,
  rightIcon: String as PropType<string>,
  colorScheme: String as PropType<ThemingProps['colorScheme']>,
  variant: String as PropType<ThemingProps['variant']>,
  size: String as PropType<ThemingProps['size']>,
  styleConfig: String as PropType<ThemingProps['styleConfig']>,

  /** Not sure if the SystemCSSProperties is the right prop type for this */
  iconSpacing: {
    type: [String, Number, Array] as PropType<
      SystemCSSProperties['marginRight']
    >,
    default: '0.5rem',
  },
}
