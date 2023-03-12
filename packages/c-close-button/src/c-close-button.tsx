import { h, defineComponent, PropType, computed } from "vue"
import { chakra, DOMElements, useStyleConfig } from "@chakra-ui/vue-system"
import { SystemStyleObject, ThemingProps } from "@chakra-ui/styled-system"
import { filterUndefined } from "@chakra-ui/utils"
import { getValidChildren } from "@chakra-ui/vue-utils"

import { CIcon } from "@chakra-ui/c-icon"

const CCloseIcon = defineComponent({
  setup(_, { attrs }) {
    return () => (
      <CIcon focusable="false" aria-hidden="true" name="close" {...attrs}>
        <path
          fill="currentColor"
          d="M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"
        />
      </CIcon>
    )
  },
})

export interface CloseButtonProps {
  as: PropType<DOMElements>
  isDisabled: PropType<boolean>
  size: PropType<"sm" | "md" | "lg">
  styleConfig: PropType<ThemingProps["styleConfig"]>
}

export const CCloseButton = defineComponent({
  props: {
    as: {
      type: [Object, String] as CloseButtonProps["as"],
      default: "button",
    },
    isDisabled: {
      type: [Boolean] as CloseButtonProps["isDisabled"],
      default: false,
    },
    size: [String] as CloseButtonProps["size"],
    styleConfig: [String] as CloseButtonProps["styleConfig"],
    __css: {
      type: [Object] as PropType<SystemStyleObject>,
      default: () => ({}),
    },
  },
  setup(props, { slots, attrs }) {
    return () => {
      const themingProps = computed(() =>
        filterUndefined({
          size: props.size,
          styleConfig: props.styleConfig,
        })
      )

      const baseStyles: SystemStyleObject = {
        outline: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }

      const styles = useStyleConfig("CloseButton", themingProps)

      return (
        <chakra.button
          as={props.as}
          type="button"
          disabled={props.isDisabled}
          aria-label="Close"
          __label="icon-button"
          __css={{ ...baseStyles, ...styles.value, ...props.__css }}
          {...attrs}
        >
          {() => (slots.default ? getValidChildren(slots) : <CCloseIcon />)}
        </chakra.button>
      )
    }
  },
})
