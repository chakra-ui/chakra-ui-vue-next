import { h, defineComponent } from "vue"
import {
  chakra,
  ComponentWithProps,
  DeepPartial,
  HTMLChakraProps,
} from "@chakra-ui/vue-system"
import { useTableStyles } from "./c-table"

export interface CTableRowProps extends HTMLChakraProps<"tr"> {}

export const CTr = defineComponent({
  name: "CTr",
  setup(_, { slots, attrs }) {
    const styles = useTableStyles()

    return () => (
      <chakra.tr __label="table__tr" __css={styles.value.tr} {...attrs}>
        {slots}
      </chakra.tr>
    )
  },
})
