import { h, defineComponent } from "vue"
import {
  chakra,
  ComponentWithProps,
  DeepPartial,
  HTMLChakraProps,
} from "@chakra-ui/vue-system"
import { useCTableStyles } from "./c-table"

export interface CTableFooterProps extends HTMLChakraProps<"tbody"> {}

export const CTfoot: ComponentWithProps<DeepPartial<CTableFooterProps>> =
  defineComponent({
    name: "CTableFooter",
    setup(_, { slots, attrs }) {
      const styles = useCTableStyles()

      return () => (
        <chakra.tfoot
          // @ts-ignore `tfoot` prop not being recognized
          __css={styles.value.tfoot}
          {...attrs}
        >
          {slots}
        </chakra.tfoot>
      )
    },
  })
