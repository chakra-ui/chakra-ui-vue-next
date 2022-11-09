/**
 * Hey! Welcome to @chakra-ui/vue-next CTable
 *
 * C table
 *
 * @see Docs     https://next.vue.chakra-ui.com/c-table
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/master/packages/c-table/src/c-table/c-table.ts
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 */

import { h, defineComponent, computed, mergeProps } from "vue"
import {
  chakra,
  ComponentWithProps,
  createStylesContext,
  DeepPartial,
  HTMLChakraProps,
  omitThemingProps,
  ThemingProps,
  useMultiStyleConfig,
} from "@chakra-ui/vue-system"
import { vueThemingProps } from "@chakra-ui/vue-utils"

const [CTableStylesProvider, useCTableStyles] = createStylesContext("CTable")

export { useCTableStyles }

export interface TableOptions {}

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
export const CTable: ComponentWithProps<DeepPartial<CTableProps>> =
  defineComponent({
    name: "CTable",
    props: {
      ...vueThemingProps,
    },
    setup(props, { slots, attrs }) {
      const styles = useMultiStyleConfig("Table", props)
      const mergedProps = computed(() => mergeProps({}, props, attrs))
      const ownProps = computed(() => omitThemingProps(mergedProps.value))

      CTableStylesProvider(styles)

      return () => (
        <chakra.table __css={styles.value.table} {...ownProps.value}>
          {slots}
        </chakra.table>
      )
    },
  })
