import { SystemProps } from "@chakra-ui/styled-system"
import { BaseThemedComponentProps } from "@chakra-ui/vue-utils"
import { DOMElements } from "@chakra-ui/vue-system"

type ButtonTypes = "button" | "reset" | "submit"

export interface ButtonProps extends BaseThemedComponentProps {
  as?: DOMElements | "router-link" | "nuxt-link"
  isLoading?: boolean
  isDisabled?: boolean
  isActive?: boolean
  loadingText?: string
  isFullWidth?: boolean
  type?: ButtonTypes
  leftIcon?: string
  rightIcon?: string
  spinnerPlacement?: "start" | "end"
  iconSpacing?: SystemProps["marginRight"]
}

export const defaultButtonProps = {
  as: "button",
  iconSpacing: "0.5rem",
}
