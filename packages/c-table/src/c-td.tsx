import { h, defineComponent, PropType } from "vue"
import {
  chakra,
  ComponentWithProps,
  DeepPartial,
  HTMLChakraProps,
} from "@chakra-ui/vue-system"
import { useTableStyles } from "./c-table"

export interface CTableCellProps extends HTMLChakraProps<"th"> {
  /**
   * Aligns the cell content to the right
   */
  isNumeric?: boolean
}

export const CTd = defineComponent({
  name: "CTd",
  props: {
    isNumeric: Boolean as PropType<CTableCellProps["isNumeric"]>,
  },
  setup(props, { slots, attrs }) {
    const styles = useTableStyles()

    return () => (
      <chakra.td
        __label="table__td"
        __css={styles.value.td}
        data-is-numeric={props.isNumeric}
        {...attrs}
      >
        {slots}
      </chakra.td>
    )
  },
})
