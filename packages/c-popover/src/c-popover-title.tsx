import { defineComponent } from "vue"
import { usePopoverContext } from "./popover.context"
import { HTMLChakraProps, chakra } from "@chakra-ui/vue-system"

export interface CPopoverTitleProps extends HTMLChakraProps<"div"> {}
export const CPopoverTitle = defineComponent({
  name: "CPopoverTitle",
  setup(_, { slots, attrs }) {
    const api = usePopoverContext()

    return () => (
      <chakra.div {...attrs} {...api.value.titleProps}>
        {slots.default?.()}
      </chakra.div>
    )
  },
})
