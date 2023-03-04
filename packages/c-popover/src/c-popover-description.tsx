import { defineComponent } from "vue"
import { usePopoverContext, useStyles } from "./popover.context"
import { HTMLChakraProps, chakra } from "@chakra-ui/vue-system"

export interface CPopoverDescriptionProps extends HTMLChakraProps<"div"> {}
export const CPopoverDescription = defineComponent({
  name: "CPopoverDescription",
  setup(_, { slots, attrs }) {
    const api = usePopoverContext()

    const styles = useStyles()

    return () => (
      <chakra.div
        __css={styles.value.body}
        {...attrs}
        {...api.value.descriptionProps}
        __label="popover__body"
      >
        {slots.default?.()}
      </chakra.div>
    )
  },
})
