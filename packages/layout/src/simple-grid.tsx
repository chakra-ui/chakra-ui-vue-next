import { DOMElements } from "@chakra-ui/vue-system"
import { ResponsiveValue } from "@chakra-ui/styled-system"
import { h, defineComponent, PropType, computed } from "vue"
import { SNAO } from "@chakra-ui/vue-utils"
import { CGrid } from "./grid"
import { isNull, isNumber, mapResponsive } from "@chakra-ui/utils"
import { SystemProps } from "@chakra-ui/styled-system"
import type * as CSS from "csstype"

interface SimpleGridOptions {
  /**
   * The width at which child elements will break into columns. Pass a number for pixel values or a string for any other valid CSS length.
   */
  minChildWidth?: SystemProps["minWidth"]
  /**
   * The number of columns
   */
  columns?: ResponsiveValue<number>
  /**
   * The gap between the grid items
   */
  spacing?: SystemProps["gridGap"]
  /**
   * The column gap between the grid items
   */
  spacingX?: SystemProps["gridGap"]
  /**
   * The row gap between the grid items
   */
  spacingY?: SystemProps["gridGap"]
}

export interface SimpleSystemProps extends SystemProps, SimpleGridOptions { }

/**
 * SimpleGrid
 *
 * Vue component make that providers a simpler interface, and
 * make its easy to create responsive grid layouts.
 *
 * @see Docs https://vue.chakra-ui.com/docs/layout/simple-grid
 */
export const CSimpleGrid = defineComponent({
  name: "CSimpleGrid",
  props: {
    as: {
      type: [Object, String] as PropType<DOMElements>,
      default: "ul",
    },
    minChildWidth: SNAO as PropType<SimpleSystemProps["minWidth"]>,
    columns: SNAO as PropType<SimpleSystemProps["columns"]>,
    spacing: SNAO as PropType<SimpleSystemProps["gridGap"]>,
    spacingX: SNAO as PropType<SimpleSystemProps["gridGap"]>,
    spacingY: SNAO as PropType<SimpleSystemProps["gridGap"]>,
  },
  setup(props, { slots, attrs }) {
    const templateColumns = computed(() =>
      props.minChildWidth
        ? widthToColumns(props.minChildWidth)
        : countToColumns(props.columns)
    )

    return () => (
      <CGrid
        as={props.as}
        __label="simple-grid"
        gap={props.spacing}
        columnGap={props.spacingX}
        rowGap={props.spacingY}
        templateColumns={templateColumns.value}
        {...attrs}
      >
        {slots}
      </CGrid>
    )
  },
})

function toPx(n: string | number) {
  return isNumber(n) ? `${n}px` : n
}

function widthToColumns(width: any) {
  return mapResponsive(width, (value) =>
    isNull(value) ? null : `repeat(auto-fit, minmax(${toPx(value)}, 1fr))`
  )
}

function countToColumns(count: any) {
  return mapResponsive(count, (value) =>
    isNull(value) ? null : `repeat(${value}, minmax(0, 1fr))`
  )
}
