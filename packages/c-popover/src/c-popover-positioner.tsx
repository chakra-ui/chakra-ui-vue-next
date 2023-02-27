import { defineComponent } from "vue"
import { usePopoverContext } from "./popover.context"
import { HTMLChakraProps, chakra } from "@chakra-ui/vue-system"
import { CMotion } from "@chakra-ui/c-motion"

export interface CPopoverPositionerProps extends HTMLChakraProps<"div"> {}
export const CPopoverPositioner = defineComponent({
  name: "CPopoverPositioner",
  setup(_, { slots, attrs }) {
    const api = usePopoverContext()

    return () => (
      <chakra.div {...api.value.positionerProps}>
        <CMotion type={"scale"}>
          {api.value.isOpen && (
            <chakra.div {...attrs}>{slots.default?.()}</chakra.div>
          )}
        </CMotion>
      </chakra.div>
    )
  },
})
