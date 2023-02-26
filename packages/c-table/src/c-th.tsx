import { h, defineComponent, PropType } from "vue"
import {
  chakra,
  ComponentWithProps,
  DeepPartial,
  HTMLChakraProps,
} from "@chakra-ui/vue-system"
import { useTableStyles } from "./c-table"

export interface CTableColumnHeaderProps extends HTMLChakraProps<"th"> {
  /**
   * Aligns the cell content to the right
   */
  isNumeric?: boolean
}

export const CTh = defineComponent({
  name: "CTh",
  props: {
    isNumeric: Boolean as PropType<CTableColumnHeaderProps["isNumeric"]>,
  },
  setup(props, { slots, attrs }) {
    const styles = useTableStyles()

    return () => (
      <chakra.th
        __label="table__th"
        __css={styles.value.th}
        data-is-numeric={props.isNumeric}
        {...attrs}
      >
        {slots}
      </chakra.th>
    )
  },
})
