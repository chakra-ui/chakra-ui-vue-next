import { UseCheckboxGroupProps } from "./checkbox.types"

export function useCheckboxGroup(props: UseCheckboxGroupProps) {
  const { modelValue, isDisabled } = props

  function handleChange(value: string | number, isChecked: boolean) {
    if (!value || !modelValue.value) return

    modelValue.value = isChecked
      ? [...new Set([...modelValue.value, value])]
      : modelValue.value.filter((v) => String(v) !== String(value))
  }

  return {
    modelValue,
    isDisabled,
    handleChange,
  }
}
