import { h, defineComponent, PropType, computed } from "vue"
import {
  chakra,
  DOMElements,
  useStyleConfig,
  HTMLChakraProps,
} from "@chakra-ui/vue-system"
import { ThemingProps } from "@chakra-ui/styled-system"
import { filterUndefined } from "@chakra-ui/utils"
import { vueThemingProps } from "@chakra-ui/vue-utils"
import type * as CSS from "csstype"

export interface ContainerProps
  extends HTMLChakraProps<"div">,
  ThemingProps<"Container"> {
  /**
   * If `true`, container will center its children
   * regardless of their width.
   */
  centerContent?: boolean
}

/**
 * Layout component used to wrap app or website content
 *
 * It sets `margin-left` and `margin-right` to `auto`,
 * to keep its content centered.
 *
 * It also sets a default max-width of `60ch` (60 characters).
 */
export const CContainer = defineComponent({
  name: "CContainer",
  props: {
    as: {
      type: [Object, String] as PropType<DOMElements>,
      default: "div",
    },
    centerContent: {
      type: [Boolean] as PropType<ContainerProps["centerContent"]>,
    },
    ...vueThemingProps,
  },
  setup(props, { slots, attrs }) {
    const themingProps = computed<ThemingProps>(() =>
      filterUndefined({
        colorScheme: props.colorScheme,
        variant: props.variant,
        size: props.size,
        styleConfig: props.styleConfig,
      })
    )
    const styles = useStyleConfig("Container", themingProps)

    return () => (
      <chakra.div
        __label="container"
        __css={{
          ...styles.value,
          ...(props.centerContent && {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }),
        }}
        {...attrs}
      >
        {slots}
      </chakra.div>
    )
  },
})
