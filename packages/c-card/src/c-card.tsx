/**
 * Hey! Welcome to @chakra-ui/vue-next CCard
 *
 * My component description
 *
 * @see Docs     https://next.vue.chakra-ui.com/c-card
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/main/packages/c-card/src/c-card/c-card.ts
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 */

import { defineComponent, h, Fragment, PropType } from "vue"
import {
  chakra,
  DOMElements,
} from "@chakra-ui/vue-system"

export interface CCardProps {}

export const CCard = defineComponent({
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
