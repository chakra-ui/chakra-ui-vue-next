import { h, defineComponent, PropType, VNode } from "vue"
import CButton from "./button"
import { ButtonProps } from "./button.utils"
import { CIcon } from "@chakra-ui/c-icon"
import { ComponentWithProps, DeepPartial } from "@chakra-ui/vue-system"

const IconButtonProps = {
  // ...BUTTON_PROPS,
  icon: String as PropType<string>,
  isRound: Boolean as PropType<boolean>,
  ariaLabel: {
    type: String as PropType<string>,
    required: true,
  },
}

export interface CIconButtonProps extends ButtonProps {
  icon: string
  isRound?: boolean
  ariaLabel: string
}

/**
 * CIconButton
 *
 * IconButton composes the Button component except that it renders only an icon.
 */
const CIconButton: ComponentWithProps<DeepPartial<CIconButtonProps>> =
  defineComponent({
    name: "CIconButton",
    props: IconButtonProps,
    setup(props, { attrs }) {
      if (!props.ariaLabel) {
        console.error(
          `chakra-ui: The \`aria-label\` prop is required for the <c-icon-button />`
        )
      }

      return () => (
        <CButton
          padding={"0"}
          rounded={props.isRound ? "rounded" : "md"}
          aria-label={props.ariaLabel}
          {...attrs}
        >
          <CIcon aria-hidden focusable={0} name={props.icon} />
        </CButton>
      )
    },
  })

export default CIconButton

export const Foo = defineComponent((props, { slots }) => {
  return () => (
    <div>
      <span data-foo>Hello</span>
      {slots}
    </div>
  )
})
