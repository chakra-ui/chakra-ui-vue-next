import { PropType, SelectHTMLAttributes, defineComponent, h } from "vue"
import { HTMLChakraProps, chakra } from "@chakra-ui/vue-system"

type Omitted = "disabled" | "required" | "readOnly" | "size"

export interface CSelectFieldProps
  extends Omit<HTMLChakraProps<SelectHTMLAttributes>, Omitted> {
  /**
   * @default false
   */
  isDisabled?: boolean
}

export const CSelectField = defineComponent({
  name: "CSelectField",
  props: {
    placeholder: String as PropType<CSelectFieldProps["placeholder"]>,
    isDisabled: Boolean as PropType<CSelectFieldProps["isDisabled"]>,
    modelValue: [String, Number] as PropType<string | number>,
  },
  emits: ["update:modelValue"],
  setup(props, { slots, attrs, emit }) {
    function handleChangeValue(e: Event) {
      emit("update:modelValue", (e.target as HTMLSelectElement)?.value)
    }

    return () => (
      <chakra.select
        __label="select"
        value={props.modelValue}
        onChange={handleChangeValue}
        disabled={props.isDisabled}
        {...attrs}
      >
        {props.placeholder && <option value="">{props.placeholder}</option>}
        {slots.default?.()}
      </chakra.select>
    )
  },
})
