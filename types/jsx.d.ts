import { CSSObject } from '@emotion/css'
import { Theme } from '@chakra-ui/vue-theme'
import { DOMElements } from '@chakra-ui/vue-system'
import {
  ResponsiveValue,
  SystemProps,
  SystemStyleObject,
} from '@chakra-ui/styled-system'
import { VNodeChild } from 'vue'
import { HTMLAttributes } from 'vue'

interface StyleResolverProps extends SystemProps {
  __css?: SystemStyleObject
  sx?: SystemStyleObject
  css?: CSSObject
  noOfLines?: ResponsiveValue<number>
  isTruncated?: boolean
  layerStyle?: string
  textStyle?: string
  apply?: ResponsiveValue<string>
  componentName?: String
  label?: string
  baseStyle?: SystemStyleObject
  /**
   * User provided styles from component/chakra API
   */
  styles?: SystemStyleObject
}
interface ChakraPropsOptions extends StyleResolverProps {
  truncateStyle?: CSSObject
  theme?: Theme
  as?: DOMElements
}

export type JSXNode = VNodeChild | JSX.Element
export interface SlotDirective {
  [name: string]: () => JSXNode
}

type JSXComponentCustomProps = Omit<HTMLAttributes, 'innerHTML'> & {
  innerHTML?: JSXNode
} & Omit<HTMLAttributes, 'color'> & {
    color?: SystemProps['color']
  } & ChakraPropsOptions

declare global {
  export namespace JSX {
    export interface IntrinsicAttributes extends JSXComponentCustomProps {}
  }
}
