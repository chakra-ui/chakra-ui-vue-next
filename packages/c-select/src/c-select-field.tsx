import { HTMLChakraProps, chakra } from "@chakra-ui/vue-system"
import { PropType, SelectHTMLAttributes, defineComponent } from "vue"

type Omitted = "disabled" | "required" | "readOnly" | "size"

export interface SelectFieldProps
  extends Omit<HTMLChakraProps<SelectHTMLAttributes>, Omitted> {
  /**
   * @default false
   */
  disabled?: boolean
}

export const CSelectField = defineComponent({
  props: {
    placeholder: String as PropType<SelectFieldProps["placeholder"]>,
  },
  setup(props, { slots, attrs }) {
    return () => (
      <chakra.select __label="chakra-select" {...attrs}>
        {props.placeholder && <option value="">{props.placeholder}</option>}
        {slots.default?.()}
      </chakra.select>
    )
  },
})
