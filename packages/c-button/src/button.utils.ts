import { SystemProps } from "@chakra-ui/styled-system"
import { vueThemingProps, BaseThemedComponentProps } from "@chakra-ui/vue-utils"
import { PropType } from "vue"

type ButtonTypes = "button" | "reset" | "submit"

export interface ButtonProps extends BaseThemedComponentProps {
  isLoading?: boolean
  isDisabled?: boolean
  isActive?: boolean
  loadingText?: string
  isFullWidth?: boolean
  type?: ButtonTypes
  leftIcon?: string
  rightIcon?: string
  iconSpacing?: SystemProps["marginRight"]
}

export const BUTTON_PROPS = {
  as: {
    type: [String, Object] as PropType<
      ButtonProps["as"] | "router-link" | "nuxt-link" | object
    >,
    default: "button",
  },
  isLoading: Boolean as PropType<ButtonProps["isLoading"]>,
  isActive: Boolean as PropType<ButtonProps["isActive"]>,
  isDisabled: Boolean as PropType<ButtonProps["isDisabled"]>,
  loadingText: String as PropType<ButtonProps["loadingText"]>,
  isFullWidth: Boolean as PropType<ButtonProps["isFullWidth"]>,
  type: String as PropType<ButtonProps["type"]>,
  leftIcon: String as PropType<ButtonProps["leftIcon"]>,
  rightIcon: String as PropType<ButtonProps["rightIcon"]>,
  ...vueThemingProps,
  iconSpacing: {
    type: [String, Number, Array] as PropType<ButtonProps["iconSpacing"]>,
    default: "0.5rem",
  },
}
