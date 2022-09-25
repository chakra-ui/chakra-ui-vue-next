/**
 * Hey! Welcome to @chakra-ui/vue-next CSkipNav
 *
 * My component description
 *
 * @see Docs     https://next.vue.chakra-ui.com/c-skip-nav
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/master/packages/c-skip-nav/src/c-skip-nav/c-skip-nav.ts
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 */

import { h, defineComponent, PropType } from 'vue'
import { chakra, DOMElements } from '@chakra-ui/vue-system'

export const CSkipNav = defineComponent({
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
