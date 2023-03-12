import { computed, defineComponent, watchEffect } from "vue"
import { usePopoverContext, useStyles } from "./popover.context"
import { HTMLChakraProps, chakra } from "@chakra-ui/vue-system"

export interface CPopoverArrow extends HTMLChakraProps<"div"> {}
export const CPopoverArrow = defineComponent({
  name: "CPopoverArrow",
  inheritAttrs: false,
  setup(_, { slots, attrs }) {
    const api = usePopoverContext()

    const styles = useStyles()

    const arrowBg = computed(
      () => attrs.bg ?? attrs.bgColor ?? attrs.backgroundColor
    )
    const arrowShadow = computed(() => attrs.shadow ?? attrs.boxShadow)

    return () => (
      <chakra.div
        __label="popover__arrow-positioner"
        {...api.value.arrowProps}
        __css={{
          "--arrow-size": "10px",
          "--popper-arrow-default-shadow":
            "-1px -1px 1px 0 var(--popper-arrow-shadow-color)",
          "--arrow-shadow-color": `${
            arrowShadow.value
              ? `shadows.${arrowShadow.value} ${arrowShadow.value}`
              : ""
          } var(--popper-arrow-shadow, var(--popper-arrow-default-shadow))`,
        }}
      >
        <chakra.div
          __css={{
            ...styles.value.arrow,
            "--arrow-size": "10px",
            "--arrow-background": arrowBg.value
              ? `colors.${arrowBg.value}, var(--popper-arrow-bg), ${arrowBg.value}`
              : "var(--popper-arrow-bg)",
            boxShadow:
              "var(--popper-arrow-shadow, var(--popper-arrow-default-shadow))",
          }}
          __label="popover__arrow"
          {...api.value.arrowTipProps}
          {...attrs}
        />
        {slots.default?.()}
      </chakra.div>
    )
  },
})
