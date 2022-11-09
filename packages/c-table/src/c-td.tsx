import { h, defineComponent, toRefs, PropType } from "vue"
import {
  chakra,
  ComponentWithProps,
  DeepPartial,
  HTMLChakraProps,
} from "@chakra-ui/vue-system"
import { useCTableStyles } from "./c-table"

export interface CTableCellPropsProps extends HTMLChakraProps<"th"> {
  /**
   * Aligns the cell content to the right
   */
  isNumeric?: boolean
}

export const CTd: ComponentWithProps<DeepPartial<CTableCellPropsProps>> =
  defineComponent({
    name: "CTableCellProps",
    props: {
      isNumeric: Boolean as PropType<CTableCellPropsProps["isNumeric"]>,
    },
    setup(props, { slots, attrs }) {
      const { isNumeric, ...rest } = toRefs(props)
      const styles = useCTableStyles()

      return () => (
        <chakra.td
          {...rest}
          // @ts-ignore `td` prop not being recognized
          __css={styles.value.td}
          data-is-numeric={isNumeric.value}
          {...attrs}
        >
          {slots}
        </chakra.td>
      )
    },
  })
