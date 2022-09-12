import { ComputedRef, WritableComputedRef } from "vue"

export interface UseCheckboxGroupProps {
  /**
   * The value of the checkbox group
   */
  modelValue: WritableComputedRef<Array<string | number>>

  /**
   * If `true`, all wrapped checkbox inputs will be disabled
   */
  isDisabled?: ComputedRef<boolean>
}
