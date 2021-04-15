import {
  Component,
  Fragment,
  Suspense,
  Teleport,
  ComponentObjectPropsOptions,
} from 'vue'
import {
  SystemProps,
  ResponsiveValue,
  StyleProps,
  ThemeTypings,
} from '@chakra-ui/styled-system'
import { IntrinsicElementAttributes } from './dom.types'
import { Dict } from '@chakra-ui/utils'

export type Tag =
  | string
  | typeof Fragment
  | typeof Teleport
  | typeof Suspense
  | Component

export interface ThemingProps<ThemeComponent extends string = string> {
  variant?: ThemeComponent extends keyof ThemeTypings['components']
    ? ThemeTypings['components'][ThemeComponent]['variants'] | (string & {})
    : string
  size?: ThemeComponent extends keyof ThemeTypings['components']
    ? ThemeTypings['components'][ThemeComponent]['sizes'] | (string & {})
    : string
  colorScheme?: ThemeTypings['colorSchemes'] | (string & {})
  orientation?: 'vertical' | 'horizontal'
  styleConfig?: Dict
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

type ElementType<P = any> =
  | {
      [K in keyof IntrinsicElementAttributes]: P extends IntrinsicElementAttributes[K]
        ? K
        : never
    }[keyof IntrinsicElementAttributes]
  | Component<P>

export type As<Props = any> = ElementType<Props>

/**
 * Extract the props of a Vue element or component
 */
export type PropsOf<T extends As> = T & {
  as?: As
}

export type HTMLChakraProps<T extends As> = Omit<
  PropsOf<T>,
  T extends 'svg'
    ? 'ref' | 'children' | keyof StyleProps
    : 'ref' | keyof StyleProps
> &
  ChakraProps & { as?: As }
