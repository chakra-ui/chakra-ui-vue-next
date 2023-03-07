/**
 * Hey! Welcome to @chakra-ui/vue-next CTooltip
 *
 * A tooltip is a brief informative message that appears when a user interacts with an element
 *
 * @see Docs     https://next.vue.chakra-ui.com/c-tooltip
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/main/packages/c-tooltip/src/c-tooltip/c-tooltip.ts
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 */

import { defineComponent, h, Fragment, PropType } from "vue"
import {
  chakra,
  DOMElements,
} from "@chakra-ui/vue-system"

export interface CTooltipProps {}

export const CTooltip = defineComponent({
    props: {
      as: {
        type: [Object, String] as PropType<DOMElements>,
        default: "div",
      },
    },
    setup(props, { slots, attrs }) {
      return () => (
        <chakra.div as={props.as} {...attrs}>
          {slots}
        </chakra.div>
      )
    },
  })
