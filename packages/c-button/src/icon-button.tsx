import { h, defineComponent, PropType, VNode, type DefineComponent } from "vue"
import { CButton } from "./button"
import type { ButtonProps } from "./button.utils"
import { CIcon } from "@chakra-ui/c-icon"
import { chakra } from "@chakra-ui/vue-system"

const IconButtonProps = {
  // ...BUTTON_PROPS,
  icon: String as PropType<CIconButtonProps["icon"]>,
  isRound: Boolean as PropType<CIconButtonProps["isRound"]>,
  ariaLabel: {
    type: String as PropType<CIconButtonProps["ariaLabel"]>,
    required: true,
  },
}

export interface CIconButtonProps extends ButtonProps {
  icon: string | object | typeof chakra.svg | DefineComponent
  isRound?: boolean
  ariaLabel: string
}

/**
 * CIconButton
 *
 * IconButton composes the Button component except that it renders only an icon.
 */
export const CIconButton = defineComponent({
  name: "CIconButton",
  props: IconButtonProps,
  setup(props, { attrs, slots }) {
    if (!props.ariaLabel) {
      console.error(
        `chakra-ui: The \`aria-label\` prop is required for the <c-icon-button />`
      )
    }

    return () => {
      const children = slots?.default?.()
      return (
        <CButton
          padding={"0"}
          rounded={props.isRound ? "rounded" : "md"}
          aria-label={props.ariaLabel}
          {...attrs}
        >
          {!!children ? (
            children
          ) : typeof props.icon === "string" ? (
            <CIcon aria-hidden focusable={0} name={props.icon} />
          ) : (
            <CIcon __label="button__icon" {...attrs}>
              {/* @ts-ignore */}
              <props.icon />
            </CIcon>
          )}
        </CButton>
      )
    }
  },
})
