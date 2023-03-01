import { defineComponent } from "vue"
import { usePopoverContext } from "./popover.context"
import { HTMLChakraProps, chakra } from "@chakra-ui/vue-system"

export interface CPopoverPositionerProps extends HTMLChakraProps<"div"> {}
export const CPopoverPositioner = defineComponent({
  name: "CPopoverPositioner",
  inheritAttrs: false,
  setup(_, { slots, attrs }) {
    const api = usePopoverContext()

    return () => {
      const { style, ...positionerProps } = api.value.positionerProps
      const { opacity, ...styleProps } = style
      return (
        <chakra.div {...positionerProps} style={styleProps}>
          <chakra.div {...attrs}>{slots.default?.()}</chakra.div>
        </chakra.div>
      )
    }
  },
})
