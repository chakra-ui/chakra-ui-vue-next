import {
  h,
  defineComponent,
  PropType,
  computed,
  Fragment,
  createVNode,
  VNode,
} from "vue"
import { chakra, DOMElements, HTMLChakraProps } from "@chakra-ui/vue-system"
import {
  getDividerStyles,
  getStackStyles,
  selector,
  StackDirection,
} from "./stack.utils"
import { SystemProps } from "@chakra-ui/styled-system"
import type * as CSS from "csstype"

interface StackOptions {
  /**
   * Shorthand for `alignItems` style prop
   * @type SystemStyleObject["alignItems"]
   */
  align?: SystemProps["alignItems"]
  /**
   * Shorthand for `justifyContent` style prop
   * @type SystemStyleObject["justifyContent"]
   */
  justify?: SystemProps["justifyContent"]
  /**
   * Shorthand for `flexWrap` style prop
   * @type SystemStyleObject["flexWrap"]
   */
  wrap?: SystemProps["flexWrap"]
  /**
   * The space between each stack item
   * @type SystemStyleObject["margin"]
   */
  spacing?: SystemProps["margin"]
  /**
   * The direction to stack the items.
   */
  direction?: StackDirection
  /**
   * If `true`, each stack item will show a divider
   * @type Component | boolean
   */
  divider?: any | boolean
  /**
   * If `true`, the children will be wrapped in a `Box` with
   * `display: inline-block`, and the `Box` will take the spacing props
   */
  shouldWrapChildren?: boolean
  /**
   * If `true` the items will be stacked horizontally.
   */
  isInline?: boolean
}

export interface StackDividerProps extends HTMLChakraProps<"div"> {}

export const CStackDivider = defineComponent({
  name: "CStackDivider",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => {
      return (
        <chakra.div
          __label="stack__divider"
          borderWidth={0}
          alignSelf={"stretch"}
          borderColor="inherit"
          width="auto"
          height="auto"
          {...attrs}
        >
          {slots?.default?.()}
        </chakra.div>
      )
    }
  },
})

export const CStackItem = defineComponent({
  name: "CStackItem",
  setup(_, { attrs, slots }) {
    return () => (
      <chakra.div
        __label="stack__item"
        display="inline-block"
        flex="0 0 auto"
        minWidth="0"
        {...attrs}
      >
        {slots?.default?.()}
      </chakra.div>
    )
  },
})

export interface StackProps extends HTMLChakraProps<"div">, StackOptions {}

const stackProps = {
  as: {
    type: [Object, String] as PropType<DOMElements>,
    default: "div",
  },
  align: [String, Array, Object] as PropType<StackProps["align"]>,
  justify: [String, Array, Object] as PropType<StackProps["justify"]>,
  wrap: [String, Array, Object] as PropType<StackProps["wrap"]>,
  spacing: {
    type: [String, Array, Object, Number] as PropType<StackProps["spacing"]>,
    default: "0.5rem",
  },
  direction: [String, Array, Object] as PropType<StackProps["direction"]>,

  // todo: divider
  divider: [Object, Boolean] as PropType<StackProps["divider"]>,
  shouldWrapChildren: [Boolean] as PropType<StackProps["shouldWrapChildren"]>,
  isInline: [Boolean] as PropType<StackProps["isInline"]>,
}

/**
 * Stacks help you easily create flexible and automatically distributed layouts
 *
 * You can stack elements in the horizontal or vertical direction,
 * and apply a space or/and divider between each element.
 *
 * It uses `display: flex` internally and renders a `div`.
 *
 * @see Docs https://vue.chakra-ui.com/docs/layout/stack
 *
 */

export const CStack = defineComponent({
  name: "CStack",
  props: stackProps,
  setup(props, { slots, attrs }) {
    const direction = computed(() =>
      props.isInline ? "row" : props.direction ?? "column"
    )

    const styles = computed(() =>
      getStackStyles({ direction: direction.value, spacing: props.spacing })
    )

    const dividerStyle = computed(() =>
      getDividerStyles({ spacing: props.spacing, direction: direction.value })
    )

    const hasDivider = computed(() => !!props.divider)

    const shouldUseChildren = computed(
      () => !props.shouldWrapChildren && !hasDivider.value
    )

    return () => {
      const validChildren: VNode[] = slots.default?.() as any as VNode[]
      const clones = shouldUseChildren.value
        ? validChildren
        : validChildren.map((child, index) => {
            const isLast = index + 1 === validChildren.length
            const wrappedChild = createVNode(CStackItem, { key: index }, child)
            const _child = props.shouldWrapChildren ? wrappedChild : child

            if (!hasDivider.value) return _child

            // todo: temporary divider
            const clonedDivider = createVNode(CStackDivider, {
              borderColor: "blue.200",
              __css: dividerStyle.value,
            })

            const _divider = isLast ? null : clonedDivider

            return createVNode(Fragment, { key: index }, [_child, _divider])
          })

      return (
        <chakra.div
          __label={"stack"}
          as={props.as}
          display={"flex"}
          alignItems={props.align}
          justifyContent={props.justify}
          flexDirection={styles.value.flexDirection}
          flexWrap={props.wrap}
          __css={hasDivider.value ? {} : { [selector]: styles.value[selector] }}
          {...attrs}
        >
          {clones}
        </chakra.div>
      )
    }
  },
})

/**
 * A view that arranges its children in a horizontal line.
 */
export const CHStack = defineComponent({
  name: "CHStack",
  props: stackProps,
  setup(props, { attrs, slots }) {
    return () => (
      <CStack __label="stack-horizontal" {...props} {...attrs} direction="row">
        {slots?.default?.()}
      </CStack>
    )
  },
})

/**
 * A view that arranges its children in a vertical line.
 */
export const CVStack = defineComponent({
  name: "CVStack",
  props: stackProps,
  setup(props, { attrs, slots }) {
    return () => (
      <CStack __label="stack-vertical" {...props} {...attrs} direction="column">
        {slots?.default?.()}
      </CStack>
    )
  },
})
