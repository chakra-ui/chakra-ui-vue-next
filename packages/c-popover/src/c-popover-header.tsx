import { defineComponent } from "vue"
import { usePopoverContext } from "./popover.context"
import { HTMLChakraProps, chakra } from "@chakra-ui/vue-system"
import { CPopoverTitle } from "./c-popover-title"

export interface CPopoverHeaderProps extends HTMLChakraProps<"div"> {}
export const CPopoverHeader = defineComponent({
  name: "CPopoverHeader",
  setup(_, { slots, attrs }) {
    const api = usePopoverContext()

    return () => <CPopoverTitle {...attrs}>{slots.default?.()}</CPopoverTitle>
  },
})
