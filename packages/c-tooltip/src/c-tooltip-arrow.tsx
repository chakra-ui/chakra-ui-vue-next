import { computed, defineComponent } from "vue"
import { useTooltipContext } from "./tooltip.context"
import { HTMLChakraProps, chakra } from "@chakra-ui/vue-system"

export type CTooltipArrowProps = HTMLChakraProps<"div">
export const CTooltipArrow = defineComponent({
  name: "CTooltipArrow",
  setup(_, { slots, attrs }) {
    const api = useTooltipContext()
    return () => (
      <chakra.div {...api.value.arrowProps}>
        <chakra.div {...api.value.arrowTipProps} {...attrs} />
      </chakra.div>
    )
  },
})
