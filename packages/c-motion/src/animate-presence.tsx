/**
 * Hey! Welcome to @chakra-ui/vue-next CAnimatePresence
 *
 * This component can be used in the place of Vue's native transition component
 * to apply transitions to it's children
 *
 * @see Docs     https://next.vue.chakra-ui.com/c-motion
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/master/packages/c-motion/src/c-motion/c-animate-presence.ts
 */

import {
  h,
  Transition,
  defineComponent,
  PropType,
  ref,
  watch,
  cloneVNode,
  computed,
} from 'vue'

import type { DOMElements } from '@chakra-ui/vue-system'
import { useRef } from '@chakra-ui/vue-utils'
import { MotionVariants, useMotion } from '@vueuse/motion'
import { warn, __DEV__ } from '@chakra-ui/utils'
import { CMotionVariant, TransitionVariants } from './motion-utils'

/**
 * @todo Add usePrefersReducedMotion hook to disable animations in the browser
 */

export const CAnimatePresence = defineComponent({
  name: 'CAnimatePresence',
  props: {
    as: {
      type: [Object, String] as PropType<DOMElements>,
      default: 'div',
    },
    type: {
      type: String as PropType<CMotionVariant>,
      default: 'fade',
    },
    variant: Object as PropType<MotionVariants>,
  },
  emits: ['leave', 'beforeLeave'],
  setup(props, { slots, attrs, emit }) {
    const [targetRef, targetNode] = useRef()
    const motionInstance = ref()

    /**
     * If user provides the "variant" prop, we prefer it over the type prop.
     */

    warn({
      condition: !props.variant && !TransitionVariants[props.type],
      message:
        'The animate presence component expects either the "variant" or a value for "type" that is an existing preset' +
        'Please check to make sure that these values are correct.',
    })

    const variant = computed(
      () => props.variant || TransitionVariants[props.type]
    )

    watch(
      targetNode,
      (node) => {
        if (!node) return
        motionInstance.value = useMotion(targetNode, variant.value)
      },
      {
        immediate: true,
        flush: 'post',
      }
    )

    const onLeave = (el: Element, done?: VoidFunction) => {
      motionInstance.value.leave(done)
    }

    return () => {
      let children: any = undefined

      const vNodes = slots
        ?.default?.()
        .filter((vnode) => String(vnode.type) !== 'Symbol(Comment)')

      children = vNodes?.length
        ? cloneVNode(vNodes[0], { ref: targetRef as any })
        : vNodes

      return (
        <Transition
          css={false}
          mode="out-in"
          onLeave={onLeave}
          onBeforeLeave={onLeave}
          {...attrs}
        >
          {() => [children]}
        </Transition>
      )
    }
  },
})
