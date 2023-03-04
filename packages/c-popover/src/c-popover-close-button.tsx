import { computed, defineComponent } from "vue"
import { usePopoverContext, useStyles } from "./popover.context"
import { CCloseButton, type CloseButtonProps } from "@chakra-ui/c-close-button"
import { match } from "@chakra-ui/vue-utils"

export interface CPopoverCloseButtonProps extends CloseButtonProps {}
export const CPopoverCloseButton = defineComponent({
  name: "CPopoverCloseButton",
  setup(_, { attrs }) {
    const api = usePopoverContext()
    const styles = useStyles()

    const popoverTriggerProps = computed(() => {
      const { onClick, ...rest } = api.value.triggerProps
      return {
        ...rest,
        async onClick(e: MouseEvent) {
          requestAnimationFrame(() => {
            api.value.leaveTransition(() => onClick(e))
          })
        },
      }
    })

    return () => (
      <CCloseButton
        size="sm"
        __label="popover__close-button"
        __css={styles.value.closeButton}
        {...popoverTriggerProps.value}
        {...attrs}
      />
    )
  },
})
