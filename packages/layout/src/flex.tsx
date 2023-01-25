import { h, defineComponent, PropType, reactive } from "vue"
import {
  chakra,
  DOMElements,
  HTMLChakraProps,
  ThemingProps,
} from "@chakra-ui/vue-system"
import { SystemProps } from "@chakra-ui/styled-system"
import type * as CSS from "csstype"

export interface FlexProps extends HTMLChakraProps<"div"> {
  /**
   * Shorthand for `alignItems` style prop
   * @type SystemProps["alignItems"]
   * SystemProps because prop can be String, Array or Object
   */
  align?: SystemProps["alignItems"]

  /**
   * Shorthand for `justifyContent` style prop
   * @type SystemProps["justifyContent"]
   */
  justify?: SystemProps["justifyContent"]

  /**
   * Shorthand for `flexWrap` style prop
   * @type SystemProps["flexWrap"]
   */
  wrap?: SystemProps["flexWrap"]

  /**
   * Shorthand for `flexDirection` style prop
   * @type SystemProps["flexDirection"]
   */
  direction?: SystemProps["flexDirection"]

  /**
   * Shorthand for `flexBasis` style prop
   * @type SystemProps["flexBasis"]
   */
  basis?: SystemProps["flexBasis"]

  /**
   * Shorthand for `flexGrow` style prop
   * @type SystemProps["flexGrow"]
   */
  grow?: SystemProps["flexGrow"]

  /**
   * Shorthand for `flexShrink` style prop
   * @type SystemProps["flexShrink"]
   */
  shrink?: SystemProps["flexShrink"]
}

const CFlex = defineComponent({
  name: "CFlex",
  props: {
    as: {
      type: [Object, String] as PropType<DOMElements>,
      default: "div",
    },
    align: [Object, String, Array] as PropType<FlexProps["align"]>,
    justify: [Object, String, Array] as PropType<FlexProps["justify"]>,
    wrap: [Object, String, Array] as PropType<FlexProps["wrap"]>,
    direction: {
      type: [Object, String, Array] as PropType<FlexProps["direction"]>,
      default: "row",
    },
    basis: [Object, String, Array] as PropType<FlexProps["basis"]>,
    grow: [Object, String, Array] as PropType<FlexProps["grow"]>,
    shrink: [Object, String, Array] as PropType<FlexProps["shrink"]>,
    size: String as PropType<ThemingProps["size"]>,
  },
  setup(props, { slots, attrs }) {
    const styles = reactive({
      display: "flex",
      flexDirection: props.direction,
      alignItems: props.align,
      justifyContent: props.justify,
      flexWrap: props.wrap,
      flexBasis: props.basis,
      flexGrow: props.grow,
      flexShrink: props.shrink,
      h: props.size,
      w: props.size,
    })
    return () => (
      <chakra.div as={props.as} __label="flex" __css={styles} {...attrs}>
        {slots}
      </chakra.div>
    )
  },
})

export default CFlex
