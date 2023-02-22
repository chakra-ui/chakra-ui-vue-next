import { BoxProps } from "./box"
import { h, defineComponent, PropType, computed } from "vue"
import { chakra } from "@chakra-ui/vue-system"
import { SystemProps, ResponsiveValue } from "@chakra-ui/styled-system"
import { filterUndefined, mapResponsive } from "@chakra-ui/utils"
import { SNAO } from "@chakra-ui/vue-utils"
import type * as CSS from "csstype"

export interface GridOptions {
  /**
   * Short hand prop for `gridTemplateColumns`
   * @type SystemProps["gridTemplateColumns"]
   */
  templateColumns?: SystemProps["gridTemplateColumns"]
  /**
   * Short hand prop for `gridGap`
   * @type SystemProps["gridGap"]
   */
  gap?: SystemProps["gridGap"]
  /**
   * Short hand prop for `gridRowGap`
   * @type SystemProps["gridRowGap"]
   */
  rowGap?: SystemProps["gridRowGap"]
  /**
   * Short hand prop for `gridColumnGap`
   * @type SystemProps["gridColumnGap"]
   */
  columnGap?: SystemProps["gridColumnGap"]
  /**
   * Short hand prop for `gridAutoFlow`
   * @type SystemProps["gridAutoFlow"]
   */
  autoFlow?: SystemProps["gridAutoFlow"]
  /**
   * Short hand prop for `gridAutoRows`
   * @type SystemProps["gridAutoRows"]
   */
  autoRows?: SystemProps["gridAutoRows"]
  /**
   * Short hand prop for `gridAutoColumns`
   * @type SystemProps["gridAutoColumns"]
   */
  autoColumns?: SystemProps["gridAutoColumns"]
  /**
   * Short hand prop for `gridTemplateRows`
   * @type SystemProps["gridTemplateRows"]
   */
  templateRows?: SystemProps["gridTemplateRows"]
  /**
   * Short hand prop for `gridTemplateAreas`
   * @type SystemProps["gridTemplateAreas"]
   */
  templateAreas?: SystemProps["gridTemplateAreas"]
  /**
   * Short hand prop for `gridArea`
   * @type SystemProps["gridArea"]
   */
  area?: SystemProps["gridArea"]
  /**
   * Short hand prop for `gridColumn`
   * @type SystemProps["gridColumn"]
   */
  column?: SystemProps["gridColumn"]
  /**
   * Short hand prop for `gridRow`
   * @type SystemProps["gridRow"]
   */
  row?: SystemProps["gridRow"]
}

export interface CGridProps extends GridOptions { }

export interface CGridItemProps extends BoxProps {
  /**
   * The number of columns the grid item should `span`.
   * @type ResponsiveValue<number | "auto">
   */
  colSpan?: ResponsiveValue<number | "auto">
  /**
   * The column number the grid item should start.
   * @type ResponsiveValue<number | "auto">
   */
  colStart?: ResponsiveValue<number | "auto">
  /**
   * @type ResponsiveValue<number | "auto">
   */
  colEnd?: ResponsiveValue<number | "auto">
  /**
   * @type ResponsiveValue<number | "auto">
   */
  rowStart?: ResponsiveValue<number | "auto">
  /**
   * @type ResponsiveValue<number | "auto">
   */
  rowEnd?: ResponsiveValue<number | "auto">
  /**
   * @type ResponsiveValue<number | "auto">
   */
  rowSpan?: ResponsiveValue<number | "auto">
}

/**
 * Vue component used to create grid layouts.
 *
 * It renders a `div` with `display: grid` and
 * comes with helpful style shorthand.
 *
 * @see Docs https://vue.chakra-ui.com/docs/layout/grid
 */
export const CGrid = defineComponent({
  name: "CGrid",
  props: {
    as: {
      type: [String, Object] as PropType<any>,
      default: "div",
    },
    templateColumns: SNAO as PropType<SystemProps["gridTemplateColumns"]>,
    gap: SNAO as PropType<SystemProps["gridGap"]>,
    rowGap: SNAO as PropType<SystemProps["gridRowGap"]>,
    columnGap: SNAO as PropType<SystemProps["gridColumnGap"]>,
    autoFlow: SNAO as PropType<SystemProps["gridAutoFlow"]>,
    autoRows: SNAO as PropType<SystemProps["gridAutoRows"]>,
    autoColumns: SNAO as PropType<SystemProps["gridAutoColumns"]>,
    templateRows: SNAO as PropType<SystemProps["gridTemplateRows"]>,
    templateAreas: SNAO as PropType<SystemProps["gridTemplateAreas"]>,
    area: SNAO as PropType<SystemProps["gridArea"]>,
    column: SNAO as PropType<SystemProps["gridColumn"]>,
    row: SNAO as PropType<SystemProps["gridRow"]>,
  },
  setup(props, { slots, attrs }) {
    const styles = computed(() =>
      filterUndefined({
        display: "grid",
        gridArea: props.area,
        gridTemplateAreas: props.templateAreas,
        gridGap: props.gap,
        gridRowGap: props.rowGap,
        gridColumnGap: props.columnGap,
        gridAutoColumns: props.autoColumns,
        gridColumn: props.column,
        gridRow: props.row,
        gridAutoFlow: props.autoFlow,
        gridAutoRows: props.autoRows,
        gridTemplateRows: props.templateRows,
        gridTemplateColumns: props.templateColumns,
      })
    )
    return () => {
      return (
        <chakra.div
          as={props.as as any}
          __label="grid"
          __css={styles.value}
          {...attrs}
        >
          {slots}
        </chakra.div>
      )
    }
  },
})

function spanFn(span?: ResponsiveValue<number | "auto">) {
  return mapResponsive(span, (value) =>
    value === "auto" ? "auto" : `span ${value}/span ${value}`
  )
}

export const CGridItem = defineComponent({
  name: "CGridItem",
  props: {
    as: {
      type: [String, Object] as PropType<any>,
      default: "div",
    },
    colSpan: SNAO as PropType<CGridItemProps["colSpan"]>,
    colStart: SNAO as PropType<CGridItemProps["colStart"]>,
    colEnd: SNAO as PropType<CGridItemProps["colEnd"]>,
    rowStart: SNAO as PropType<CGridItemProps["rowStart"]>,
    rowEnd: SNAO as PropType<CGridItemProps["rowEnd"]>,
    rowSpan: SNAO as PropType<CGridItemProps["rowSpan"]>,
  },
  setup(props, { slots, attrs }) {
    const styles = computed(() =>
      filterUndefined({
        gridColumn: spanFn(props.colSpan),
        gridRow: spanFn(props.rowSpan),
        gridColumnStart: props.colStart,
        gridColumnEnd: props.colEnd,
        gridRowStart: props.rowStart,
        gridRowEnd: props.rowEnd,
      })
    )

    return () => (
      <chakra.div
        as={props.as}
        __label="grid__item"
        __css={styles.value}
        {...attrs}
      >
        {slots}
      </chakra.div>
    )
  },
})
