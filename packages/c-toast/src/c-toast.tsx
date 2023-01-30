/**
 * Hey! Welcome to @chakra-ui/vue-next CToast
 *
 * The toast component is used to give feedback to users after an action has taken place
 *
 * @see Docs     https://next.vue.chakra-ui.com/c-toast
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/main/packages/c-toast/src/c-toast/c-toast.ts
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 */

import { defineComponent, h, Fragment, PropType } from "vue"
import {
  chakra,
  DOMElements,
} from "@chakra-ui/vue-system"

export interface CToastProps {}

export const CToast = defineComponent({
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
