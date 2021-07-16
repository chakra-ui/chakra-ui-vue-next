import { SystemCSSProperties } from '@chakra-ui/styled-system'
import { DOMElements } from '@chakra-ui/vue-system'
import { vueThemingProps, BaseThemedComponentProps } from '@chakra-ui/vue-utils'
import { PropType } from 'vue'

type ButtonTypes = 'button' | 'reset' | 'submit'

export interface ButtonProps extends BaseThemedComponentProps {
  isLoading?: boolean
  isDisabled?: boolean
  isActive?: boolean
  loadingText?: string
  isFullWidth?: boolean
  type?: ButtonTypes
  leftIcon?: string
  rightIcon?: string
  iconSpacing?: SystemCSSProperties['marginRight']
}

export const BUTTON_PROPS = {
  as: {
    type: String as PropType<ButtonProps['as']>,
    default: 'button',
  },
  isLoading: Boolean as PropType<ButtonProps['isLoading']>,
  isActive: Boolean as PropType<ButtonProps['isActive']>,
  isDisabled: Boolean as PropType<ButtonProps['isDisabled']>,
  loadingText: String as PropType<ButtonProps['loadingText']>,
  isFullWidth: Boolean as PropType<ButtonProps['isFullWidth']>,
  type: String as PropType<ButtonProps['type']>,
  leftIcon: String as PropType<ButtonProps['leftIcon']>,
  rightIcon: String as PropType<ButtonProps['rightIcon']>,
  ...vueThemingProps,

  /** Not sure if the SystemCSSProperties is the right prop type for this */
  iconSpacing: {
    type: [String, Number, Array] as PropType<ButtonProps['iconSpacing']>,
    default: '0.5rem',
  },
}
