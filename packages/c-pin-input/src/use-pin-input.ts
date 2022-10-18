import { computed, watch } from "vue"
import { connect, machine } from "@zag-js/pin-input"
import { normalizeProps, useMachine } from "@zag-js/vue"

export interface PinInputProps {
  id: string
  value: string[]
  modelValue: string[]
  placeholder: string
  type: "alphanumeric" | "numeric"
  otp: boolean
  mask: boolean
  blurOnComplete: boolean
}

export const usePinInputMachine = (
  params: PinInputProps,
  emit: CallableFunction
) => {
  const [state, send] = useMachine(
    machine({
      id: params.id,
      value: params.modelValue || params.value,
      placeholder: params.placeholder,
      type: params.type,
      otp: params.otp,
      mask: params.mask,
      blurOnComplete: params.blurOnComplete,
      onChange: (value) => {
        emit("change", value)
        emit("update:modelValue", value)
      },
      onComplete: ({ value, valueAsString }) => {
        emit("complete", { value, valueAsString })
      },
      onInvalid: (details) => {
        emit("invalid", details)
      },
    }) as any
  )

  const api = computed(() => connect(state.value as any, send, normalizeProps))
  watch(
    () => params.modelValue,
    (value) => {
      api.value.setValue(Array.from(value))
    }
  )

  return api
}
