import { BoxProps } from './box'
import { h, defineComponent, PropType } from 'vue'
import {
  chakra,
  HTMLChakraProps,
  SystemProps,
  ResponsiveValue,
} from '@chakra-ui/vue-system'
import { filterUndefined, mapResponsive } from '@chakra-ui/utils'

export interface GridProps extends HTMLChakraProps<'div'>, GridOptions {}

export interface GridOptions {
  /**
   * Short hand prop for `gridTemplateColumns`
   * @type SystemProps["gridTemplateColumns"]
   */
  templateColumns?: SystemProps['gridTemplateColumns']
  /**
   * Short hand prop for `gridGap`
   * @type SystemProps["gridGap"]
   */
  gap?: SystemProps['gridGap']
  /**
   * Short hand prop for `gridRowGap`
   * @type SystemProps["gridRowGap"]
   */
  rowGap?: SystemProps['gridRowGap']
  /**
   * Short hand prop for `gridColumnGap`
   * @type SystemProps["gridColumnGap"]
   */
  columnGap?: SystemProps['gridColumnGap']
  /**
   * Short hand prop for `gridAutoFlow`
   * @type SystemProps["gridAutoFlow"]
   */
  autoFlow?: SystemProps['gridAutoFlow']
  /**
   * Short hand prop for `gridAutoRows`
   * @type SystemProps["gridAutoRows"]
   */
  autoRows?: SystemProps['gridAutoRows']
  /**
   * Short hand prop for `gridAutoColumns`
   * @type SystemProps["gridAutoColumns"]
   */
  autoColumns?: SystemProps['gridAutoColumns']
  /**
   * Short hand prop for `gridTemplateRows`
   * @type SystemProps["gridTemplateRows"]
   */
  templateRows?: SystemProps['gridTemplateRows']
  /**
   * Short hand prop for `gridTemplateAreas`
   * @type SystemProps["gridTemplateAreas"]
   */
  templateAreas?: SystemProps['gridTemplateAreas']
  /**
   * Short hand prop for `gridArea`
   * @type SystemProps["gridArea"]
   */
  area?: SystemProps['gridArea']
  /**
   * Short hand prop for `gridColumn`
   * @type SystemProps["gridColumn"]
   */
  column?: SystemProps['gridColumn']
  /**
   * Short hand prop for `gridRow`
   * @type SystemProps["gridRow"]
   */
  row?: SystemProps['gridRow']
}

export interface GridItemProps extends BoxProps {
  /**
   * The number of columns the grid item should `span`.
   * @type ResponsiveValue<number | "auto">
   */
  colSpan?: ResponsiveValue<number | 'auto'>
  /**
   * The column number the grid item should start.
   * @type ResponsiveValue<number | "auto">
   */
  colStart?: ResponsiveValue<number | 'auto'>
  /**
   * @type ResponsiveValue<number | "auto">
   */
  colEnd?: ResponsiveValue<number | 'auto'>
  /**
   * @type ResponsiveValue<number | "auto">
   */
  rowStart?: ResponsiveValue<number | 'auto'>
  /**
   * @type ResponsiveValue<number | "auto">
   */
  rowEnd?: ResponsiveValue<number | 'auto'>
  /**
   * @type ResponsiveValue<number | "auto">
   */
  rowSpan?: ResponsiveValue<number | 'auto'>
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
  props: {
    templateColumns: [Object, String, Array] as PropType<
      GridProps['gridTemplateColumns']
    >,
    gap: [Object, String, Array] as PropType<GridProps['gridGap']>,
    rowGap: [Object, String, Array] as PropType<GridProps['gridRowGap']>,
    columnGap: [Object, String, Array] as PropType<GridProps['gridColumnGap']>,
    autoFlow: [Object, String, Array] as PropType<GridProps['gridAutoFlow']>,
    autoRows: [Object, String, Array] as PropType<GridProps['gridAutoRows']>,
    autoColumns: [Object, String, Array] as PropType<
      GridProps['gridAutoColumns']
    >,
    templateRows: [Object, String, Array] as PropType<
      GridProps['gridTemplateRows']
    >,
    templateAreas: [Object, String, Array] as PropType<
      GridProps['gridTemplateAreas']
    >,
    area: [Object, String, Array] as PropType<GridProps['gridArea']>,
    column: [Object, String, Array] as PropType<GridProps['gridColumn']>,
    row: [Object, String, Array] as PropType<GridProps['gridRow']>,
  },
  setup(props, { slots, attrs }) {
    return () => {
      const styles = filterUndefined({
        display: 'grid',
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

      return h(
        chakra('div', { label: 'grid' }),
        {
          __css: styles,
          ...attrs,
        },
        slots
      )
    }
  },
})

function spanFn(span?: ResponsiveValue<number | 'auto'>) {
  return mapResponsive(span, (value) =>
    value === 'auto' ? 'auto' : `span ${value}/span ${value}`
  )
}

export const CGridItem = defineComponent({
  props: {
    colSpan: [Object, String, Array] as PropType<GridItemProps['colSpan']>,
    colStart: [Object, String, Array] as PropType<GridItemProps['colStart']>,
    colEnd: [Object, String, Array] as PropType<GridItemProps['colEnd']>,
    rowStart: [Object, String, Array] as PropType<GridItemProps['rowStart']>,
    rowEnd: [Object, String, Array] as PropType<GridItemProps['rowEnd']>,
    rowSpan: [Object, String, Array] as PropType<GridItemProps['rowSpan']>,
  },
  setup(props, { slots, attrs }) {
    return () => {
      const styles = filterUndefined({
        gridColumn: spanFn(props.colSpan),
        gridRow: spanFn(props.rowSpan),
        gridColumnStart: props.colStart,
        gridColumnEnd: props.colEnd,
        gridRowStart: props.rowStart,
        gridRowEnd: props.rowEnd,
      })

      return h(
        chakra('div', { label: 'grid__item' }),
        {
          __css: styles,
          ...attrs,
        },
        slots
      )
    }
  },
})
