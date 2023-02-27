import { defineComponent } from "vue"
import { usePopoverContext } from "./popover.context"
import { HTMLChakraProps, chakra } from "@chakra-ui/vue-system"

export interface CPopoverDescriptionProps extends HTMLChakraProps<"div"> {}
export const CPopoverDescription = defineComponent({
  name: "CPopoverDescription",
  setup(_, { slots, attrs }) {
    const api = usePopoverContext()

    return () => (
      <chakra.div {...attrs} {...api.value.descriptionProps}>
        {slots.default?.()}
      </chakra.div>
    )
  },
})
