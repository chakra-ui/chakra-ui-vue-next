import { Component, Fragment, Suspense, Teleport } from 'vue'
import { SystemProps, ResponsiveValue } from '@chakra-ui/styled-system'

export type Tag =
  | string
  | typeof Fragment
  | typeof Teleport
  | typeof Suspense
  | Component

export interface ThemingProps {
  variant?: string
  size?: string
  colorScheme?: string
  orientation?: 'vertical' | 'horizontal'
  styleConfig?: any
}

export interface ChakraProps extends SystemProps {
  /**
   * apply layer styles defined in `theme.layerStyles`
   */
  layerStyle?: string
  /**
   * apply typography styles defined in `theme.textStyles`
   */
  textStyle?: string
  /**
   * Reference styles from any component or key in the theme.
   *
   * @example
   * ```html
   * <c-box apply="styles.h3">This is a div</c-box>
   * ```
   *
   * This will apply styles defined in `theme.styles.h3`
   */
  apply?: string
  /**
   * if `true`, it'll render an ellipsis when the text exceeds the width of the viewport or maxWidth set.
   */
  isTruncated?: boolean
  /**
   * Used to truncate text at a specific number of lines
   */
  noOfLines?: ResponsiveValue<number>
}
