import { defineComponent } from "vue"
import { usePopoverContext } from "./popover.context"
import { HTMLChakraProps, chakra } from "@chakra-ui/vue-system"
import { CPopoverPositioner } from "./c-popover-positioner"

export interface CPopoverContentProps extends HTMLChakraProps<"div"> {}
export const CPopoverContent = defineComponent({
  name: "CPopoverContent",
  inheritAttrs: false,
  setup(_, { slots, attrs }) {
    const api = usePopoverContext()

    return () => (
      <CPopoverPositioner {...attrs}>
        <chakra.div {...api.value.contentProps}>{slots.default?.()}</chakra.div>
      </CPopoverPositioner>
    )
  },
})
