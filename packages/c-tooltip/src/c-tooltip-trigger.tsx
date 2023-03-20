import { computed, defineComponent } from "vue"
import { useTooltipContext } from "./tooltip.context"
import { withSingleton } from "@chakra-ui/vue-utils"

export const CTooltipTrigger = defineComponent({
  name: "CTooltipTrigger",
  setup(_, { slots, attrs }) {
    const api = useTooltipContext()
    return () =>
      withSingleton(slots, "CPopoverTrigger", {
        ...api.value.triggerProps,
        ...attrs,
      })
  },
})
