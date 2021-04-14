import { h, ComponentObjectPropsOptions, defineComponent, PropType } from 'vue'
import CButton from './button'
import { BUTTON_PROPS } from './button.utils'
import { CIcon } from '@chakra-ui/c-icon'

const IconButtonProps: ComponentObjectPropsOptions = {
  ...BUTTON_PROPS,
  icon: String as PropType<string>,
  isRound: Boolean as PropType<boolean>,
  ariaLabel: {
    type: String as PropType<string>,
    required: true,
  },
}

/**
 * CIconButton
 *
 * IconButton composes the Button component except that it renders only an icon.
 */
const CIconButton = defineComponent({
  name: 'CIconButton',
  props: IconButtonProps,
  setup(props, { attrs }) {
    return () => {
      if (!props.ariaLabel) {
        console.error(
          `chakra-ui: The \`aria-label\` prop is required for the <c-icon-button />`
        )
      }
      return h(
        CButton,
        {
          padding: 0,
          rounded: props.isRound ? 'rounded' : 'md',
          'aria-label': props.ariaLabel,
          ...attrs,
          ...props,
        },
        () => [
          // whats the problem here?
          // @ts-ignore
          h(CIcon, {
            name: props.icon,
          }),
        ]
      )
    }
  },
})

export default CIconButton
