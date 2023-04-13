import { HTMLChakraProps, chakra } from "@chakra-ui/vue-system"
import { PropType, SelectHTMLAttributes, defineComponent } from "vue"

type Omitted = "disabled" | "required" | "readOnly" | "size"

export interface SelectFieldProps
  extends Omit<HTMLChakraProps<SelectHTMLAttributes>, Omitted> {
  /**
   * @default false
   */
  isDisabled?: boolean
}

export const CSelectField = defineComponent({
  name: "CSelectField",
  props: {
    placeholder: String as PropType<SelectFieldProps["placeholder"]>,
    isDisabled: Boolean as PropType<SelectFieldProps["isDisabled"]>,
  },
  setup(props, { slots, attrs }) {
    return () => (
      <chakra.select
        __label="chakra-select"
        disabled={props.isDisabled}
        {...attrs}
      >
        {props.placeholder && <option value="">{props.placeholder}</option>}
        {slots.default?.()}
      </chakra.select>
    )
  },
})
