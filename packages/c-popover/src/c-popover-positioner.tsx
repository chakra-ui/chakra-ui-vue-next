import { defineComponent } from "vue"
import { usePopoverContext, useStyles } from "./popover.context"
import { HTMLChakraProps, chakra } from "@chakra-ui/vue-system"

export interface CPopoverPositionerProps extends HTMLChakraProps<"div"> {}
export const CPopoverPositioner = defineComponent({
  name: "CPopoverPositioner",
  inheritAttrs: false,
  setup(_, { slots, attrs }) {
    const api = usePopoverContext()

    const styles = useStyles()

    return () => {
      const { style, ...positionerProps } = api.value.positionerProps
      const { opacity, ...styleProps } = style
      return (
        <chakra.div
          __css={styles.value.popper}
          {...positionerProps}
          style={styleProps}
          __label="popover__popper"
        >
          <chakra.div {...attrs}>{slots.default?.()}</chakra.div>
        </chakra.div>
      )
    }
  },
})
