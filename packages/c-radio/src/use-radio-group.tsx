import { computed, getCurrentInstance, reactive } from "vue"
import { normalizeProps, useMachine } from "@zag-js/vue"
import * as radio from "@zag-js/radio-group"
import { useId } from "@chakra-ui/vue-composables"
import { Optional } from "@chakra-ui/vue-utils"

export type UseRadioGroupProps = Optional<radio.Context, "id"> & {
  modelValue?: radio.Context["value"]
}

export const useRadioGroup = (props: UseRadioGroupProps) => {
  const reactiveProps = reactive(props)
  const instance = getCurrentInstance()

  const [state, send] = useMachine(
    radio.machine({
      ...reactiveProps,
      id: useId().value,
      value: reactiveProps.modelValue ?? reactiveProps.value,
      onChange(details) {
        instance?.emit("change", details.value)
        instance?.emit("update:modelValue", details.value)
      },
    })
  )

  const api = computed(() => radio.connect(state.value, send, normalizeProps))

  return api
}

export type UseRadioGroupReturn = ReturnType<typeof useRadioGroup>
