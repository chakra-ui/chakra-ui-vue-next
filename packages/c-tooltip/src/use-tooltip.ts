import { connect, Context as TooltipContext, machine } from "@zag-js/tooltip"
import { normalizeProps, useMachine } from "@zag-js/vue"
import { computed } from "vue"
import { transformComposableProps } from "@chakra-ui/vue-utils"
import { useId } from "@chakra-ui/vue-composables"

type TooltipPropsContext = Omit<TooltipContext, "id">

export type UseTooltipProps = {
  context: TooltipPropsContext
  emit: CallableFunction
}

export const useTooltip = (props: UseTooltipProps) => {
  const { context, emit } = transformComposableProps(props)

  const [state, send] = useMachine(
    machine({
      ...context,
      id: useId().value,
      onOpen() {
        emit("open")
      },
      onClose() {
        emit("close")
      },
      closeDelay: 300,
    })
  )
  return computed(() => connect(state.value, send, normalizeProps))
}

export type UseTooltipReturn = ReturnType<typeof useTooltip>
