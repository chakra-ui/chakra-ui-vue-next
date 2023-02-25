import { Dict, mapResponsive } from "@chakra-ui/utils"
import { chakra, HTMLChakraProps, DOMElements } from "@chakra-ui/vue-system"
import { getValidChildren, SNAO } from "@chakra-ui/vue-utils"
import { SystemProps, tokenToCSSVar } from "@chakra-ui/styled-system"
import { computed, defineComponent, h, PropType } from "vue"
import type * as CSS from "csstype"

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

export const wrapProps = {
  spacing: SNAO as PropType<SystemProps["margin"]>,
  justify: SNAO as PropType<SystemProps["justifyContent"]>,
  align: SNAO as PropType<SystemProps["alignItems"]>,
  direction: SNAO as PropType<SystemProps["flexDir"]>,
  shouldWrapChildren: SNAO as PropType<boolean>,
}

/**
 * Used to render texts or paragraphs.
 *
 * @see Docs https://vue.chakra-ui.com/docs/typography/text
 */
export const CWrap = defineComponent({
  props: {
    as: {
      type: [Object, String] as PropType<DOMElements>,
      default: "div",
    },
    ...wrapProps,
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
      ? getValidChildren(slots).map((child, index) => (
          <CWrapItem key={index}>{child}</CWrapItem>
        ))
      : slots

    return () => {
      return (
        <chakra.div as={props.as} __label="wrap" {...attrs}>
          {() => (
            <chakra.ul __label="wrap__list" __css={styles.value}>
              {childrenToRender}
            </chakra.ul>
          )}
        </chakra.div>
      )
    }
  },
})
CWrap.name = "CWrap"

export interface WrapItemProps extends HTMLChakraProps<"li"> {}

export const CWrapItem = defineComponent({
  setup(_, { attrs, slots }) {
    return () => {
      return (
        <chakra.li
          __label="wrap__listItem"
          __css={{ display: "flex", alignItems: "flex-start" }}
          {...attrs}
        >
          {() => getValidChildren(slots)}
        </chakra.li>
      )
    }
  },
})

CWrapItem.name = "CWrapItem"
