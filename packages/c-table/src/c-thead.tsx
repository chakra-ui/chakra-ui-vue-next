import { h, defineComponent } from "vue"
import {
  chakra,
  ComponentWithProps,
  DeepPartial,
  HTMLChakraProps,
} from "@chakra-ui/vue-system"
import { useTableStyles } from "./c-table"

export interface CTHeadProps extends HTMLChakraProps<"thead"> {}

export const CThead = defineComponent({
  name: "CThead",
  setup(_, { slots, attrs }) {
    const styles = useTableStyles()

    return () => (
      <chakra.thead
        __label="table__thead"
        __css={styles.value.thead}
        {...attrs}
      >
        {slots}
      </chakra.thead>
    )
  },
})
