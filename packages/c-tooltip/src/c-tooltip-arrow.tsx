import { computed, defineComponent } from "vue"
import { useStyles, useTooltipContext } from "./tooltip.context"
import { HTMLChakraProps, chakra } from "@chakra-ui/vue-system"

export type CTooltipArrowProps = HTMLChakraProps<"div">
export const CTooltipArrow = defineComponent({
  name: "CTooltipArrow",
  setup(_, { slots, attrs }) {
    const api = useTooltipContext()

    const styles = useStyles()

    const arrowBg = computed(
      () => attrs.bg ?? attrs.bgColor ?? attrs.backgroundColor
    )
    const arrowShadow = computed(() => attrs.shadow ?? attrs.boxShadow)

    return () => (
      <chakra.div
        __label="tooltip__arrow-positioner"
        __css={{
          "--arrow-size": "10px",
          "--tooltip-arrow-default-shadow":
            "-1px -1px 1px 0 var(--tooltip-arrow-shadow-color)",
          "--arrow-shadow-color": `${
            arrowShadow.value
              ? `shadows.${arrowShadow.value} ${arrowShadow.value}`
              : ""
          } var(--tooltip-arrow-shadow, var(--tooltip-arrow-default-shadow))`,
        }}
        {...api.value.arrowProps}
      >
        <chakra.div
          __css={{
            "--arrow-size": "10px",
            "--arrow-background": arrowBg.value
              ? `colors.${arrowBg.value}, var(--tooltip-arrow-bg), ${arrowBg.value}`
              : "var(--tooltip-bg)",
            boxShadow:
              "var(--tooltip-arrow-shadow, var(--tooltip-arrow-default-shadow))",
          }}
          {...api.value.arrowTipProps}
          {...attrs}
        />
      </chakra.div>
    )
  },
})
