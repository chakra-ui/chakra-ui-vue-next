import { h, defineComponent } from "vue"
import {
  chakra,
  ComponentWithProps,
  DeepPartial,
  HTMLChakraProps,
} from "@chakra-ui/vue-system"
import { useTableStyles } from "./c-table"

export interface CTableBodyProps extends HTMLChakraProps<"tbody"> {}

export const CTbody = defineComponent({
  name: "CTbody",
  setup(_, { slots, attrs }) {
    const styles = useTableStyles()

    return () => (
      <chakra.tbody
        __label="table__tbody"
        __css={styles.value.tbody}
        {...attrs}
      >
        {slots}
      </chakra.tbody>
    )
  },
})
