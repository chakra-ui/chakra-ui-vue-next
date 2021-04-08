/**
 * Hey! Welcome to @chakra-ui/vue-next CScrollLock
 *
 * Component that comes witha hook and directive to enable and disable body scrolling
 *
 * @see Docs     https://next.vue.chakra-ui.com/c-scroll-lock
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/master/packages/c-scroll-lock/src/c-scroll-lock/c-scroll-lock.ts
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 */

import { h, defineComponent, PropType, withDirectives } from 'vue'
import { chakra, DOMElements } from '@chakra-ui/vue-system'
import { BodyScrollLockDirective } from './body-scoll-lock.directive'

export const CScrollLock = defineComponent({
  props: {
    as: {
      type: [Object, String] as PropType<DOMElements>,
      default: 'div',
    },
    enabled: Boolean as PropType<Boolean>,
  },
  setup(props, { slots, attrs }) {
    return () =>
      withDirectives(h(chakra(props.as), { ...attrs }, slots), [
        [BodyScrollLockDirective, props.enabled],
      ])
  },
})
