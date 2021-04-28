/**
 * Hey! Welcome to @chakra-ui/vue-next CScrollLock
 *
 * Component that comes witha hook and directive to enable and disable body scrolling
 *
 * @see Docs     https://next.vue.chakra-ui.com/c-scroll-lock
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/master/packages/c-scroll-lock/src/c-scroll-lock/c-scroll-lock.ts
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 */

import {
  defineComponent,
  PropType,
  withDirectives,
  VNode,
  cloneVNode,
} from 'vue'
import { BodyScrollLockDirective } from './body-scoll-lock.directive'

export const CScrollLock = defineComponent({
  name: 'CScrollLock',
  props: {
    enabled: Boolean as PropType<Boolean>,
  },
  setup(props, { slots, attrs }) {
    return () => {
      const [firstChild] = slots.default?.({}) as VNode[]
      if (!firstChild) {
        console.warn(
          `[chakra-ui:focus-lock]: Focus lock component expects at least and only one child element.`
        )
        return
      }
      const scrollLockVNode = cloneVNode(firstChild, {
        ...attrs,
        'data-chakra-scroll-lock': `${props.enabled}`,
      })
      return withDirectives(scrollLockVNode, [
        [BodyScrollLockDirective, props.enabled],
      ])
    }
  },
})
