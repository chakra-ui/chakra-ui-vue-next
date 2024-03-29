import { connect, Context as TabsContext, machine } from "@zag-js/tabs"
import { normalizeProps, useMachine } from "@zag-js/vue"
import { computed, watchEffect } from "vue"
import { transformComposableProps } from "@chakra-ui/vue-utils"
import { useId } from "@chakra-ui/vue-composables"

export type UseTabsProps = {
  context: Omit<TabsContext, "id" | "value">
  defaultValue?: TabsContext["value"]
  emit: CallableFunction
}

export const useTabs = (props: UseTabsProps) => {
  const { context, emit, defaultValue } = transformComposableProps(props)

  const [state, send] = useMachine(
    machine({
      ...context,
      id: useId().value,
      value: defaultValue,
      onChange(details) {
        emit("change", details)
        emit("update:modelValue", details.value)
      },
      onFocus(details) {
        emit("focus", details)
      },
      onDelete(details) {
        emit("delete", details)
      },
    })
  )
  const api = computed(() => connect(state.value, send, normalizeProps))

  return api
}

export type { TabsContext }
export type UseTabsReturn = ReturnType<typeof useTabs>
