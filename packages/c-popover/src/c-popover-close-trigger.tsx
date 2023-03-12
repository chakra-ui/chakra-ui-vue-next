import { defineComponent } from "vue"
import { usePopoverContext } from "./popover.context"
import { withSingleton } from "@chakra-ui/vue-utils"

export const CPopoverCloseTrigger = defineComponent({
  name: "CPopoverCloseTrigger",
  setup(_, { slots, attrs }) {
    const api = usePopoverContext()

    return () =>
      withSingleton(slots, "CPopoverCloseTrigger", {
        ...api.value.closeTriggerProps,
        ...attrs,
      })
  },
})
