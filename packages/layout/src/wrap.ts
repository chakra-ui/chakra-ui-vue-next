import { Dict, mapResponsive } from "@chakra-ui/utils"
import {
  chakra,
  HTMLChakraProps,
  SystemProps,
  DOMElements,
  tokenToCSSVar,
  ComponentWithProps,
} from "@chakra-ui/vue-system"
import { getValidChildren, SNAO, vueThemingProps } from "@chakra-ui/vue-utils"
import { computed, defineComponent, h, PropType } from "vue"

export interface WrapProps extends HTMLChakraProps<"div"> {
  /**
   * The space between the each child (even if it wraps)
   * @type SystemProps["margin"]
   */
  spacing?: SystemProps["margin"]
  /**
   * The `justify-content` value (for cross-axis alignment)
   * @type SystemProps["justifyContent"]
   */
  justify?: SystemProps["justifyContent"]
  /**
   * The `align-items` value (for main axis alignment)
   * @type SystemProps["alignItems"]
   */
  align?: SystemProps["alignItems"]
  /**
   * The `flex-direction` value
   * @type SystemProps["flexDirection"]
   */
  direction?: SystemProps["flexDirection"]
  /**
   * If `true`, the children will be wrapped in a `WrapItem`
   */
  shouldWrapChildren?: boolean
}

export const CWrapProps = {
  spacing: SNAO as PropType<WrapProps["spacing"]>,
  justify: SNAO as PropType<WrapProps["justify"]>,
  align: SNAO as PropType<WrapProps["align"]>,
  direction: SNAO as PropType<WrapProps["direction"]>,
  shouldWrapChildren: SNAO as PropType<WrapProps["shouldWrapChildren"]>,
}

/**
 * Used to render texts or paragraphs.
 *
 * @see Docs https://vue.chakra-ui.com/docs/typography/text
 */
export const CWrap: ComponentWithProps<WrapProps> = defineComponent({
  props: {
    as: {
      type: [Object, String] as PropType<DOMElements>,
      default: "div",
    },
    ...CWrapProps,
  },
  setup(props, { slots, attrs }) {
    const styles = computed(() => ({
      "--chakra-wrap-spacing": (theme: Dict) =>
        mapResponsive(props.spacing, (value) =>
          tokenToCSSVar("space", value)(theme)
        ),
      "--wrap-spacing": "calc(var(--chakra-wrap-spacing) / 2)",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: props.justify,
      alignItems: props.align,
      flexDirection: props.direction,
      listStyleType: "none",
      padding: "0",
      margin: "calc(var(--wrap-spacing) * -1)",
      "& > *:not(style)": {
        margin: "var(--wrap-spacing)",
      },
    }))

    const childrenToRender = props.shouldWrapChildren
      ? getValidChildren(slots).map((child, index) =>
          h(CWrapItem, { key: index }, child)
        )
      : slots

    return () => {
      return h(
        chakra(props.as, {
          label: "wrap",
          ...attrs,
        }),
        {},
        () =>
          h(
            chakra("ul", { label: "wrap__list", __css: styles.value }),
            {},
            childrenToRender
          )
      )
    }
  },
})

export interface WrapItemProps extends HTMLChakraProps<"li"> {}

export const CWrapItem = defineComponent({
  setup(_, { attrs, slots }) {
    return () => {
      return h(
        chakra("li", {
          label: "wrap__listItem",
          __css: {
            display: "flex",
            alignItems: "flex-start",
          },
          ...attrs,
        }),
        {},
        slots
      )
    }
  },
})
