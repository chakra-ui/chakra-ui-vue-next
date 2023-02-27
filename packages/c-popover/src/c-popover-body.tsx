import { defineComponent } from "vue"
import { usePopoverContext } from "./popover.context"
import { HTMLChakraProps, chakra } from "@chakra-ui/vue-system"
import { CPopoverDescription } from "./c-popover-description"

export interface CPopoverBodyProps extends HTMLChakraProps<"div"> {}
export const CPopoverBody = defineComponent({
  name: "CPopoverBody",
  setup(_, { slots, attrs }) {
    const api = usePopoverContext()

    return () => (
      <CPopoverDescription {...attrs}>{slots.default?.()}</CPopoverDescription>
    )
  },
})
