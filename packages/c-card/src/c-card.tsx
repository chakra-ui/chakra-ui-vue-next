/**
 * Hey! Welcome to @chakra-ui/vue-next CCard
 *
 * Card is a flexible component used to group and display content in a clear and concise format.
 *
 * @see Docs     https://next.vue.chakra-ui.com/c-card
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/main/packages/c-card/src/c-card.tsx
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 */

import { computed, defineComponent, h, PropType } from "vue"
import {
  chakra,
  DOMElements,
  HTMLChakraProps,
  ThemingProps,
  useMultiStyleConfig,
} from "@chakra-ui/vue-system"
import { vueThemingProps } from "@chakra-ui/vue-utils"
import { CCardStylesProvider } from "./card.context"
import { filterUndefined } from "@chakra-ui/utils"
import { SystemProps } from "@chakra-ui/styled-system"
import type * as CSS from "csstype"

export type CardOptions = {
  /**
   * The flex direction of the card
   */
  direction?: SystemProps["flexDirection"]
  /**
   * The flex alignment of the card
   */
  align?: SystemProps["alignItems"]
  /**
   * The flex distribution of the card
   */
  justify?: SystemProps["justifyContent"]
}

export interface CCardProps
  extends HTMLChakraProps<"div">,
    CardOptions,
    ThemingProps<"Card"> {}

export const CCard = defineComponent({
  name: "CCard",
  props: {
    as: {
      type: [Object, String] as PropType<DOMElements>,
      default: "div",
    },
    direction: {
      type: String as PropType<CCardProps["direction"]>,
      default: "column",
    },
    align: {
      type: String as PropType<CCardProps["align"]>,
    },
    justify: {
      type: String as PropType<CCardProps["justify"]>,
    },
    ...vueThemingProps,
  },
  setup(props, { slots, attrs }) {
    const themingProps = computed(() =>
      filterUndefined({
        colorScheme: props.colorScheme,
        variant: props.variant,
        size: props.size,
        styleConfig: props.styleConfig,
      })
    )

    const styles = useMultiStyleConfig("Card", themingProps)

    CCardStylesProvider(styles)

    const ownProps = computed(() => ({
      display: "flex",
      flexDirection: props.direction,
      justifyContent: props.justify,
      alignItems: props.align,
      position: "relative",
      minWidth: 0,
      wordWrap: "break-word",
      ...styles.value.container,
    }))

    return () => (
      <chakra.div
        __label="card"
        as={props.as}
        __css={ownProps.value}
        {...attrs}
      >
        {slots.default?.()}
      </chakra.div>
    )
  },
})
