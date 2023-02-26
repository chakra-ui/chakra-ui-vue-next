import { h, defineComponent } from "vue"
import {
  chakra,
  ComponentWithProps,
  DeepPartial,
  HTMLChakraProps,
} from "@chakra-ui/vue-system"
import { useTableStyles } from "./c-table"

export interface CTableFooterProps extends HTMLChakraProps<"tbody"> {}

export const CTfoot = defineComponent({
  name: "CTfoot",
  setup(_, { slots, attrs }) {
    const styles = useTableStyles()

    return () => (
      <chakra.tfoot
        __label="table__tfoot"
        __css={styles.value.tfoot}
        {...attrs}
      >
        {slots}
      </chakra.tfoot>
    )
  },
})
