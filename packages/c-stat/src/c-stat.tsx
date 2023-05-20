/**
 * Hey! Welcome to @chakra-ui/vue-next CStat
 *
 * Used to display some statistics
 *
 * @see Docs     https://next.vue.chakra-ui.com/c-stat
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/main/packages/c-stat/src/c-stat/c-stat.ts
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 */

import { defineComponent, h, PropType, computed } from "vue"
import {
  chakra,
  createStylesContext,
  DOMElements,
  HTMLChakraProps,
  ThemingProps,
  useMultiStyleConfig,
} from "@chakra-ui/vue-system"
import { useThemingProps, vueThemingProps } from "@chakra-ui/vue-utils"
import type * as SS from "@chakra-ui/vue-system"

const [StatStylesProvider, useStatStyles] = createStylesContext("Stat")

export { useStatStyles }

export interface CStatProps
  extends HTMLChakraProps<"div">,
    ThemingProps<"Stat"> {}

export const CStat = defineComponent({
  name: "CStat",
  props: {
    as: {
      type: [Object, String] as PropType<DOMElements>,
      default: "div",
    },
    ...vueThemingProps,
  },
  setup(props, { slots, attrs }) {
    const themingProps = useThemingProps(props)
    const styles = useMultiStyleConfig("Stat", themingProps.value)

    const statStyles = computed(() => ({
      position: "relative",
      flex: "1 1 0%",
      ...styles.value.container,
    }))

    StatStylesProvider(styles)

    return () => (
      <chakra.div
        __label="stat"
        as={props.as}
        __css={statStyles.value}
        {...attrs}
      >
        <dl>{slots.default?.()}</dl>
      </chakra.div>
    )
  },
})
