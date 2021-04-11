import { computed, defineComponent, h, PropType } from 'vue'
import {
  SystemCSSProperties,
  SystemStyleObject,
} from '@chakra-ui/styled-system'
import { chakra, ThemingProps } from '@chakra-ui/vue-system'
import { createContext, vueThemingProps } from '@chakra-ui/vue-utils'

export interface ButtonGroupProps extends ThemingProps {
  /**
   * If `true`, the borderRadius of button that are direct children will be altered
   * to look flushed together
   */
  isAttached?: boolean
  /**
   * If `true`, all wrapped button will be disabled
   */
  isDisabled?: boolean
  /**
   * The spacing between the buttons
   * @default '0.5rem'
   * @type SystemProps["marginRight"]
   */
  spacing?: SystemCSSProperties['marginRight']
}

const props = {
  isAttached: Boolean as PropType<ButtonGroupProps['isAttached']>,
  isDisabled: Boolean as PropType<ButtonGroupProps['isDisabled']>,
  spacing: {
    type: [String, Number, Array] as PropType<ButtonGroupProps['spacing']>,
    default: 3,
  },
  ...vueThemingProps,
}

type ButtonGroupContext = () => ThemingProps & {
  isDisabled?: boolean
}

const [ButtonGroupProvider, useButtonGroup] = createContext<ButtonGroupContext>(
  {
    strict: false,
    name: 'ButtonGroupContext',
  }
)

const CButtonGroup = defineComponent({
  name: 'CButtonGroup',
  props,
  setup(props, { attrs, slots }) {
    ButtonGroupProvider(() => ({
      size: props.size,
      colorScheme: props.colorScheme,
      variant: props.variant,
      isDisabled: props.isDisabled,
    }))
    return () => {
      const styles = computed(() => {
        let groupStyles: SystemStyleObject = {
          display: 'inline-flex',
        }

        if (props.isAttached) {
          groupStyles = {
            ...groupStyles,
            '> *:first-of-type:not(:last-of-type)': { borderRightRadius: 0 },
            '> *:not(:first-of-type):not(:last-of-type)': { borderRadius: 0 },
            '> *:not(:first-of-type):last-of-type': { borderLeftRadius: 0 },
          }
        } else {
          groupStyles = {
            ...groupStyles,
            '& > *:not(style) ~ *:not(style)': { marginLeft: props.spacing },
          }
        }

        return groupStyles
      })

      return h(
        chakra('div', { label: 'button__group' }),
        {
          __css: { ...styles.value },
          role: 'group',
          ...attrs,
        },
        slots
      )
    }
  },
})

export default CButtonGroup
export { useButtonGroup }
