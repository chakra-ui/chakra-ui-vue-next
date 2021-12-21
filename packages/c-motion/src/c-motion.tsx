/**
 * Hey! Welcome to @chakra-ui/vue-next CMotion
 *
 * Chakra ui vue motion and transition components and utilities
 *
 * @see Docs     https://next.vue.chakra-ui.com/c-motion
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/master/packages/c-motion/src/c-motion/c-motion.ts
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 */

import {
  h,
  Transition,
  defineComponent,
  PropType,
  ref,
  watch,
  cloneVNode,
} from "vue"
import type { DOMElements } from "@chakra-ui/vue-system"
import { useRef } from "@chakra-ui/vue-utils"
import { MotionVariants, useMotion } from "@vueuse/motion"
import { __DEV__ } from "@chakra-ui/utils"

type CMotionVariants = {
  [key: string]: MotionVariants
}

export const variants: CMotionVariants = {
  fade: {
    initial: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
  },
  scale: {
    initial: {
      scale: 0.8,
      opacity: 0,
    },
    enter: {
      scale: 1,
      opacity: 1,
      translateY: 0,
    },
    leave: {
      scale: 0.8,
      opacity: 0,
    },
  },
}

type CMotionVariant = keyof CMotionVariants

export const CMotion = defineComponent({
  name: "CMotion",
  props: {
    as: {
      type: [Object, String] as PropType<DOMElements>,
      default: "div",
    },
    type: {
      type: String as PropType<keyof CMotionVariants>,
      default: "fade",
    },
  },
  setup(props, { slots, attrs }) {
    const [targetRef, targetNode] = useRef()
    const motionInstance = ref()
    watch(
      targetNode,
      (node) => {
        if (!node) return
        motionInstance.value = useMotion(targetNode, variants[props.type])
      },
      {
        immediate: true,
        flush: "post",
      }
    )

    const onLeave = (el: Element, done: VoidFunction) => {
      motionInstance.value.leave(done)
    }
    return () => {
      let children: any = undefined

      const vNodes = slots
        ?.default?.()
        .filter((vnode) => String(vnode.type) !== "Symbol(Comment)")

      children = vNodes?.length
        ? cloneVNode(vNodes[0], { ref: targetRef as any })
        : vNodes

      return (
        <Transition css={false} mode="out-in" onLeave={onLeave}>
          {() => [children]}
        </Transition>
      )
    }
  },
})
