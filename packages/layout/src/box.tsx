import { computed, defineComponent, h, PropType } from "vue"
import {
  chakra,
  DOMElements,
  SystemStyleObject,
  HTMLChakraProps,
  DeepPartial,
  ComponentWithProps,
} from "@chakra-ui/vue-system"

export interface BoxProps extends HTMLChakraProps<"div"> {}

/**
 * Box is the most abstract component on top of which other chakra
 * components are built. It renders a `div` element by default.
 *
 * @see Docs https://vue.chakra-ui.com/docs/layout/box
 */
export const CBox: ComponentWithProps<DeepPartial<BoxProps>> = defineComponent({
  name: "CBox",
  props: {
    as: {
      type: [String, Object] as PropType<DOMElements>,
      default: "div",
    },
  },
  setup(props, { slots, attrs }) {
    return () => (
      <chakra.div as={props.as} __label="box" {...attrs}>
        {() => slots?.default?.()}
      </chakra.div>
    )
  },
})

/**
 * As a constraint, you can't pass size related props
 * Only `size` would be allowed
 */
type Omitted = "size" | "boxSize" | "width" | "height" | "w" | "h"

export interface SquareProps extends Omit<BoxProps, Omitted> {
  /**
   * The size (width and height) of the square
   */
  size?: BoxProps["width"]
  /**
   * If `true`, the content will be centered in the square
   */
  centerContent?: boolean
}

/**
 * CSquare is the `CBox` component implemented as a square
 *
 * @see Docs https://vue.chakra-ui.com/docs/layout/box
 */
export const CSquare: ComponentWithProps<DeepPartial<SquareProps>> =
  defineComponent({
    name: "CSquare",
    props: {
      size: [Object, String, Number] as PropType<SquareProps["size"]>,
      centerContent: {
        type: [Boolean] as PropType<SquareProps["centerContent"]>,
        default: true,
      },
    },
    setup(props, { slots, attrs }) {
      const styles = computed<SystemStyleObject>(() =>
        props.centerContent
          ? { display: "flex", alignItems: "center", justifyContent: "center" }
          : {}
      )
      return () => (
        <CBox
          __label="square"
          boxSize={props.size}
          __css={{
            ...styles.value,
            flexShrink: 0,
            flexGrow: 0,
          }}
          {...attrs}
        >
          {slots}
        </CBox>
      )
    },
  })

/**
 * CCircle is the `CBox` component implemented as a circle
 *
 * @see Docs https://vue.chakra-ui.com/docs/layout/box
 */
export const CCircle: ComponentWithProps<DeepPartial<SquareProps>> =
  defineComponent({
    name: "CCircle",
    setup(_, { slots, attrs }) {
      return () => (
        <CSquare __label="circle" borderRadius="9999px" {...attrs}>
          {slots}
        </CSquare>
      )
    },
  })
