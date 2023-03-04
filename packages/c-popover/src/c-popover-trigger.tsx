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
        ...rest,
        ...match(api.value.trigger, {
          click: {
            async onClick(e: MouseEvent) {
              if (api.value.isOpen) {
                requestAnimationFrame(() => {
                  api.value.leaveTransition(() => onClick(e))
                })
                await api.value.wait(300)
              } else {
                requestAnimationFrame(() => {
                  api.value.enterTransition(() => null)
                })
                onClick(e)
              }
            },
          },
          hover: {
            async onPointerenter(e: MouseEvent) {
              api.value.open()
              requestAnimationFrame(() => {
                api.value.enterTransition(() => null)
              })
            },
            async onPointerleave(e: MouseEvent) {
              requestAnimationFrame(() => {
                api.value.leaveTransition(() => api.value.close())
              })
            },
          },
        }),
      }
    })

    return () =>
      withSingleton(slots, "CPopoverTrigger", {
        ...popoverTriggerProps.value,
        ...attrs,
      })
  },
})
