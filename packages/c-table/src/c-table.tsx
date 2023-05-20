/**
 * Hey! Welcome to @chakra-ui/vue-next CTable
 *
 * Table component is used to organize and display data efficiently it renders a table element by default
 *
 * @see Docs     https://next.vue.chakra-ui.com/c-table
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/main/packages/c-table/src/c-table/c-table.ts
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 */

import { h, defineComponent, computed, mergeProps, PropType } from "vue"
import {
  AnatomyParts,
  chakra,
  createStylesContext,
  HTMLChakraProps,
  omitThemingProps,
  SystemStyleObject,
  ThemingProps,
  useMultiStyleConfig,
} from "@chakra-ui/vue-system"
import { vueThemingProps } from "@chakra-ui/vue-utils"
import type * as VS from "@chakra-ui/vue-system"

export const [TableStylesProvider, useTableStyles] =
  createStylesContext<AnatomyParts.Table>("Table")

export interface TableOptions {
  layout?: SystemStyleObject["tableLayout"]
}

export interface CTableProps
  extends HTMLChakraProps<"table">,
    TableOptions,
    ThemingProps<"Table"> {}

/**
 * The `CTable` component is used to organize and display data efficiently. It renders a `<table>` element by default.
 *
 * @see Docs https://github.com/chakra-ui/chakra-ui-vue-next/tree/develop/packages/c-table
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/table/
 */
export const CTable = defineComponent({
  name: "CTable",
  props: {
    layout: {
      type: String as PropType<CTableProps["layout"]>,
    },
    ...vueThemingProps,
  },
  setup(props, { slots, attrs }) {
    const styles = useMultiStyleConfig<AnatomyParts.Table>("Table", props)
    const mergedProps = computed(() => mergeProps({}, props, attrs))
    const ownProps = computed(() => omitThemingProps(mergedProps.value))

    TableStylesProvider(styles)

    return () => (
      <chakra.table
        __label="table"
        __css={{ tableLayout: props.layout, ...styles.value.table }}
        {...ownProps.value}
      >
        {slots}
      </chakra.table>
    )
  },
})
