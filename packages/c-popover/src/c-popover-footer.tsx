import { defineComponent } from "vue"
import { usePopoverContext, useStyles } from "./popover.context"
import { HTMLChakraProps, chakra } from "@chakra-ui/vue-system"

export interface CPopoverFooterProps extends HTMLChakraProps<"div"> {}
export const CPopoverFooter = defineComponent({
  name: "CPopoverFooter",
  setup(_, { slots, attrs }) {
    const api = usePopoverContext()
    const styles = useStyles()

    return () => (
      <chakra.footer
        __label="popover__footer"
        __css={styles.value.footer}
        {...attrs}
      >
        {slots.default?.()}
      </chakra.footer>
    )
  },
})
