import { computed, defineComponent, watchEffect } from "vue"
import { usePopoverContext } from "./popover.context"
import { match, withSingleton } from "@chakra-ui/vue-utils"

export const CPopoverTrigger = defineComponent({
  name: "CPopoverTrigger",
  setup(_, { slots, attrs }) {
    const api = usePopoverContext()

    const popoverTriggerProps = computed(() => {
      const { onClick, ...rest } = api.value.triggerProps
      return {
        ...match(api.value.trigger, {
          click: {
            onClick,
          },
          hover: {
            async onPointerenter(e: MouseEvent) {
              api.value.open()
            },
            async onPointerleave(e: MouseEvent) {
              api.value.close()
            },
          },
        }),
        ...rest,
      }
    })

    return () =>
      withSingleton(slots, "CPopoverTrigger", {
        ...popoverTriggerProps.value,
        ...attrs,
      })
  },
})
