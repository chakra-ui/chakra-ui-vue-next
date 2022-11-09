import { h, defineComponent } from "vue"
import {
  chakra,
  ComponentWithProps,
  DeepPartial,
  HTMLChakraProps,
} from "@chakra-ui/vue-system"
import { useCTableStyles } from "./c-table"

export interface CTableRowProps extends HTMLChakraProps<"tr"> {}

export const CTr: ComponentWithProps<DeepPartial<CTableRowProps>> =
  defineComponent({
    name: "CTableRow",
    setup(props, { slots, attrs }) {
      const styles = useCTableStyles()

      return () => (
        <chakra.tr
          {...props}
          // @ts-ignore `tr` prop not being recognized
          __css={styles.value.tr}
          {...attrs}
        >
          {slots}
        </chakra.tr>
      )
    },
  })
