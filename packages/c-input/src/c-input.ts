/**
 * Hey! Welcome to @chakra-ui/vue-next CInput
 *
 * The c input component is a component that is used to get user input in a text field
 *
 * @see Docs     https://next.vue.chakra-ui.com/c-input
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/master/packages/c-input/src/c-input/c-input.ts
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 */

import { h, defineComponent, PropType } from 'vue'
import { chakra, DOMElements } from '@chakra-ui/vue-system'

export const CInput = defineComponent({
  props: {
    as: {
      type: [Object, String] as PropType<DOMElements>,
      default: 'div',
    },
  },
  setup(props, { slots, attrs }) {
    return () => h(chakra(props.as), { ...attrs }, slots)
  },
})
