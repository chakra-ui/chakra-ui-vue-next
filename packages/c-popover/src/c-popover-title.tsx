import { defineComponent } from "vue"
import { usePopoverContext, useStyles } from "./popover.context"
import { HTMLChakraProps, chakra } from "@chakra-ui/vue-system"

export interface CPopoverTitleProps extends HTMLChakraProps<"div"> {}
export const CPopoverTitle = defineComponent({
  name: "CPopoverTitle",
  setup(_, { slots, attrs }) {
    const api = usePopoverContext()

    const styles = useStyles()

    return () => (
      <chakra.div
        __css={styles.value.header}
        {...attrs}
        {...api.value.titleProps}
        __label="popover__header"
      >
        {slots.default?.()}
      </chakra.div>
    )
  },
})
