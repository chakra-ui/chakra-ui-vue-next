import { h, defineComponent } from "vue"
import {
  chakra,
  ComponentWithProps,
  DeepPartial,
  HTMLChakraProps,
} from "@chakra-ui/vue-system"
import { useCTableStyles } from "./c-table"

export interface CTHeadProps extends HTMLChakraProps<"thead"> {}

export const CThead: ComponentWithProps<DeepPartial<CTHeadProps>> =
  defineComponent({
    name: "CTableHead",
    setup(_, { slots, attrs }) {
      const styles = useCTableStyles()

      return () => (
        <chakra.thead
          // @ts-ignore `thead` prop not being recognized
          __css={styles.value.thead}
          {...attrs}
        >
          {slots}
        </chakra.thead>
      )
    },
  })
