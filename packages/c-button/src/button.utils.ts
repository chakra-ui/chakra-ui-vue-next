import { SystemProps } from "@chakra-ui/styled-system"
import { BaseThemedComponentProps } from "@chakra-ui/vue-utils"
import { DOMElements, chakra } from "@chakra-ui/vue-system"
import type { DefineComponent } from "vue"

type ButtonTypes = "button" | "reset" | "submit"

export interface ButtonProps extends BaseThemedComponentProps {
  as?: DOMElements | "router-link" | "nuxt-link"
  isLoading?: boolean
  isDisabled?: boolean
  isActive?: boolean
  loadingText?: string
  isFullWidth?: boolean
  type?: ButtonTypes
  leftIcon?: string | object | typeof chakra.svg | DefineComponent
  rightIcon?: string | object | typeof chakra.svg | DefineComponent
  spinnerPlacement?: "start" | "end"
  iconSpacing?: SystemProps["marginRight"]
}

export const defaultButtonProps = {
  as: "button",
  iconSpacing: "0.5rem",
}
