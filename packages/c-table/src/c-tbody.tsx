import { h, defineComponent } from "vue"
import {
  chakra,
  ComponentWithProps,
  DeepPartial,
  HTMLChakraProps,
} from "@chakra-ui/vue-system"
import { useCTableStyles } from "./c-table"

export interface CTableBodyProps extends HTMLChakraProps<"tbody"> {}

export const CTbody: ComponentWithProps<DeepPartial<CTableBodyProps>> =
  defineComponent({
    name: "CTableBody",
    setup(_, { slots, attrs }) {
      const styles = useCTableStyles()

      return () => (
        <chakra.tbody
          // @ts-ignore `tbody` prop not being recognized
          __css={styles.value.tbody}
          {...attrs}
        >
          {slots}
        </chakra.tbody>
      )
    },
  })
