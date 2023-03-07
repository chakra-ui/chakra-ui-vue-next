import { computed, defineComponent, watchEffect } from "vue"
import { useTooltipContext } from "./tooltip.context"
import { HTMLChakraProps, chakra } from "@chakra-ui/vue-system"

export type CTooltipPositionerProps = HTMLChakraProps<"div">
export const CTooltipPositioner = defineComponent({
  name: "CTooltipPositioner",
  setup(_, { slots, attrs }) {
    const api = useTooltipContext()
    return () => (
      <chakra.div {...api.value.positionerProps} {...attrs}>
        {slots.default?.()}
      </chakra.div>
    )
  },
})
