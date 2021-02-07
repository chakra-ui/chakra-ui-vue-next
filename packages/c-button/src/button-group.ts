import { computed, defineComponent, h, PropType } from 'vue'
import {
  SystemCSSProperties,
  SystemStyleObject,
} from '@chakra-ui/styled-system'
import { chakra, ThemingProps } from '@chakra-ui/vue-system'
import { ComponentThemeConfig } from '@chakra-ui/vue-theme'
import { createContext } from '@chakra-ui/vue-utils'

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
  spacing: [String, Number, Array] as PropType<ButtonGroupProps['spacing']>,
  variant: {
    type: String as PropType<string>,
    default: 'solid',
  },
  size: {
    type: String as PropType<string>,
    default: 'sm',
  },
  colorScheme: String as PropType<string>,
  styleConfig: String as PropType<ComponentThemeConfig>,
}

interface ButtonGroupContext extends ThemingProps {
  isDisabled?: boolean
}

const [ButtonGroupProvider, useButtonGroup] = createContext<ButtonGroupContext>(
  {
    strict: false,
    name: 'ButtonGroupContext',
  }
)

export const CButtonGroup = defineComponent({
  name: 'CButtonGroup',
  props,
  setup(props, { slots }) {
    ButtonGroupProvider({
      size: props.size,
      colorScheme: props.colorScheme,
      variant: props.variant,
      isDisabled: props.isDisabled,
    })

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

    return () => h(chakra.div)
  },
})
