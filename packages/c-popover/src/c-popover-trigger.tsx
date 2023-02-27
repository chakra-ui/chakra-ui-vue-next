import { defineComponent } from "vue"
import { usePopoverContext } from "./popover.context"
import { withSingleton } from "@chakra-ui/vue-utils"

export const CPopoverTrigger = defineComponent({
  name: "CPopoverTrigger",
  setup(_, { slots, attrs }) {
    const api = usePopoverContext()

    return () =>
      withSingleton(slots, "CPopoverTrigger", {
        ...api.value.triggerProps,
        ...attrs,
      })
  },
})
