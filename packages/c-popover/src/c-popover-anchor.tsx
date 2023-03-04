import { defineComponent } from "vue"
import { usePopoverContext } from "./popover.context"
import { HTMLChakraProps, chakra } from "@chakra-ui/vue-system"

export interface CPopoverAnchorProps extends HTMLChakraProps<"div"> {}
export const CPopoverAnchor = defineComponent({
  name: "CPopoverAnchor",
  setup(_, { slots, attrs }) {
    const api = usePopoverContext()

    return () => (
      <chakra.div {...api.value.anchorProps} {...attrs}>
        {slots.default?.()}
      </chakra.div>
    )
  },
})
