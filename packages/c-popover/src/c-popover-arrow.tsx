import { defineComponent } from "vue"
import { usePopoverContext } from "./popover.context"
import { HTMLChakraProps, chakra } from "@chakra-ui/vue-system"

export interface CPopoverArrow extends HTMLChakraProps<"div"> {}
export const CPopoverArrow = defineComponent({
  name: "CPopoverArrow",
  setup(_, { slots, attrs }) {
    const api = usePopoverContext()

    return () => (
      <chakra.div {...attrs} {...api.value.arrowProps}>
        <chakra.div {...api.value.arrowTipProps} {...attrs} />
        {slots.default?.()}
      </chakra.div>
    )
  },
})
