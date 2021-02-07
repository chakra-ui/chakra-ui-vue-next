import { h, defineComponent, PropType, computed } from 'vue'
import {
  chakra,
  DOMElements,
  useStyleConfig,
  ThemingProps,
} from '@chakra-ui/vue-system'
import {
  SystemCSSProperties,
  SystemStyleObject,
} from '@chakra-ui/styled-system'
import { ComponentThemeConfig } from '@chakra-ui/vue-theme'
import { dataAttr } from '@chakra-ui/vue-utils'

type ButtonTypes = 'button' | 'reset' | 'submit'

const props = {
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
  colorScheme: String as PropType<string>,
  variant: {
    type: String as PropType<string>,
    default: 'solid',
  },
  size: {
    type: String as PropType<string>,
    default: 'md',
  },
  styleConfig: String as PropType<ComponentThemeConfig>,

  /** Not sure if the SystemCSSProperties is the right prop type for this */
  iconSpacing: {
    type: [String, Number, Array] as PropType<
      SystemCSSProperties['marginRight']
    >,
    default: '0.5rem',
  },
}

/** TODO: How to get component props in typescript */

const CButton = defineComponent({
  name: 'CButton',
  props,
  setup(props, { attrs, slots }) {
    const themingProps = computed<ThemingProps>(() => ({
      colorScheme: props.colorScheme,
      variant: props.variant,
      size: props.size,
      styleConfig: props.styleConfig,
    }))

    const styles = useStyleConfig('Button', themingProps.value)

    const buttonStyles: SystemStyleObject = {
      display: 'inline-flex',
      appearance: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 250ms',
      userSelect: 'none',
      position: 'relative',
      whiteSpace: 'nowrap',
      verticalAlign: 'middle',
      outline: 'none',
      width: props.isFullWidth ? '100%' : 'auto',
      ...styles.value,
    }

    return () =>
      h(
        chakra(props.as, 'button'),
        {
          disabled: props.isDisabled || props.isLoading,
          type: props.as === 'button' ? undefined : props.type,
          dataActive: dataAttr(props.isActive),
          dataLoading: dataAttr(props.isLoading),
          ...buttonStyles,
          ...attrs,
        },
        slots
      )
  },
})

export default CButton
