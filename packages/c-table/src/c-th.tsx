import { h, defineComponent, PropType } from "vue"
import {
  chakra,
  ComponentWithProps,
  DeepPartial,
  HTMLChakraProps,
} from "@chakra-ui/vue-system"
import { useCTableStyles } from "./c-table"

export interface CTableColumnHeaderProps extends HTMLChakraProps<"th"> {
  /**
   * Aligns the cell content to the right
   */
  isNumeric?: boolean
}

export const CTh: ComponentWithProps<DeepPartial<CTableColumnHeaderProps>> =
  defineComponent({
    name: "CTableColumnHeader",
    props: {
      isNumeric: Boolean as PropType<CTableColumnHeaderProps["isNumeric"]>,
    },
    setup(props, { slots, attrs }) {
      const styles = useCTableStyles()

      return () => (
        <chakra.th
          // @ts-ignore `th` prop not being recognized
          __css={styles.value.th}
          data-is-numeric={props.isNumeric}
          {...attrs}
        >
          {slots}
        </chakra.th>
      )
    },
  })
