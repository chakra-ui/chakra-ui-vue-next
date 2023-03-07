import { connect, Context as PopoverContext, machine } from "@zag-js/popover"
import { normalizeProps, useMachine } from "@zag-js/vue"
import { computed, reactive, watch } from "vue"
import type { Optional } from "@chakra-ui/vue-utils"
import { useId } from "@chakra-ui/vue-composables"

export interface UsePopoverPropsContext extends Optional<PopoverContext, "id"> {
  /**
   * Controls the open state of the the popover
   * component.
   *
   * @default false
   */
  isOpen?: boolean
}

export interface UsePopoverProps {
  context: UsePopoverPropsContext
  emit: CallableFunction
}

export function usePopover(props: UsePopoverProps) {
  const { context, emit } = props
  const popoverContext = reactive(context)
  const id = useId()

  const [state, send] = useMachine(
    machine({
      ...popoverContext,
      id: id.value,
      defaultOpen: context.defaultOpen,
      onEscapeKeyDown(event) {
        emit("escape-key-down", event)
      },
      onFocusOutside(event) {
        emit("focus-outside", event)
      },
      onInteractOutside(event) {
        emit("interact-outside", event)
      },
      onOpenChange(event) {
        emit("open-change", event)
      },
      onPointerDownOutside(event) {
        emit("pointer-down-outside", event)
      },
    })
  )

  const api = computed(() => {
    const _api = connect(state.value, send, normalizeProps)
    return {
      ..._api,
      close: () => _api.close(),
    }
  })

  watch(
    () => popoverContext.isOpen,
    async (isOpen) => {
      if (isOpen == null) return

      if (isOpen && !state.value.matches("open")) {
        api.value.open()
        return
      } else if (!isOpen && !state.value.matches("closed")) {
        api.value.close()
        return
      }
    },
    {
      flush: "post",
    }
  )

  return api
}

export type UsePopoverReturn = ReturnType<typeof usePopover>
