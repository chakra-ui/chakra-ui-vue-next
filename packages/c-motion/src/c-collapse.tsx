import { chakra } from '@chakra-ui/vue-system'
import { useRef } from '@chakra-ui/vue-utils'
import { useId } from '@chakra-ui/vue-composables'
import { MotionDirective, MotionVariants, useMotions } from '@vueuse/motion'
import {
  h,
  defineComponent,
  PropType,
  computed,
  ref,
  watch,
  withDirectives,
  onMounted,
} from 'vue'
import { TransitionEasings, TransitionVariants } from './motion-utils'
import { warn } from '@chakra-ui/utils'

export interface CollapseOptions {
  /**
   * If `true`, the opacity of the content will be animated
   * @default true
   */
  animateOpacity: boolean
  /**
   * The height you want the content in its collapsed state.
   * @default 0
   */
  startingHeight: number | string
  /**
   * The height you want the content in its expanded state.
   * @default "auto"
   */
  endingHeight: number | string
  /**
   * The current disclosure state of the CColapse component
   * @default true
   */
  isOpen: boolean
  /**
   * Unmounts it's children after the leave transition
   * @default true
   */
  unmountOnExit: boolean
}

/**
 * CCollapse
 *
 * It renders a `span` when it matches the current link. Otherwise,
 * it renders an anchor tag.
 */

export const CCollapse = defineComponent({
  name: 'CCollapse',
  props: {
    isOpen: {
      type: Boolean as PropType<CollapseOptions['isOpen']>,
      default: true,
    },
    animateOpacity: {
      type: Boolean as PropType<CollapseOptions['animateOpacity']>,
      default: true,
    },
    startingHeight: {
      type: Number as PropType<CollapseOptions['startingHeight']>,
      default: 0,
    },
    endingHeight: {
      type: [String, Number] as PropType<CollapseOptions['endingHeight']>,
      default: 'auto',
    },
    unmountOnExit: {
      type: Boolean as PropType<CollapseOptions['unmountOnExit']>,
      default: true,
    },
  },
  emits: ['entered', 'left'],
  setup(props, { slots, attrs, emit }) {
    const [targetRef, targetNode] = useRef()
    const transitionId = useId('collapse-transition')
    const preTransitionHeight = ref(0)
    const collapsedHeight = computed(() => {
      return preTransitionHeight.value || props.endingHeight
    })

    const variant = computed<MotionVariants>(() => ({
      leave: {
        overflow: 'hidden',
        height: props.startingHeight,
        ...(props.animateOpacity && { opacity: 0 }),
        transition: {
          duration: 200,
          ease: TransitionEasings.easeInOut,
        },
      },
      enter: {
        overflow: 'hidden',
        height: collapsedHeight.value,
        ...(props.animateOpacity && { opacity: 1 }),
        transition: {
          duration: 300,
          ease: TransitionEasings.easeInOut,
        },
      },
      initial: {
        overflow: 'hidden',
        height: props.startingHeight,
        ...(props.animateOpacity && { opacity: 0 }),
        transition: {
          duration: 200,
          ease: TransitionEasings.easeInOut,
        },
      },
    }))

    warn({
      condition: Boolean(props.startingHeight > 0 && props.unmountOnExit),
      message: `"startingHeight" and "unmountOnExit" props are mutually exclusive. You can't use them together`,
    })

    /** Handles exit transition */
    const leave = (done: VoidFunction) => {
      const el = targetNode.value!
      const { height } = getComputedStyle(el)

      requestAnimationFrame(() => {
        const motions = useMotions()
        const instance = motions[transitionId.value]
        instance?.leave(done)
      })
    }

    /** Handles enter transition */
    const enter = (done: VoidFunction) => {
      const el = targetNode.value!
      if (el) {
        el.style.visibility = 'hidden'
        // @ts-ignore
        el.style.height = props.endingHeight
        const { height } = getComputedStyle(el)
        // @ts-ignore
        el.style.height = props.startingHeight

        el.style.visibility = 'visible'
        const motions = useMotions()
        const instance = motions[transitionId.value]
        instance
          ?.apply({
            ...variant.value.enter,
            height: parseFloat(height),
          })
          ?.then(done)
      }
    }

    watch(
      () => props.isOpen!,
      (newVal) => {
        if (!newVal && targetNode.value!) {
          leave(onDoneLeft)
        } else {
          enter(onDoneEnter)
        }
      }
    )

    const onDoneEnter = () => {
      emit('entered')
    }
    const onDoneLeft = () => {
      emit('left')
    }

    /**
     * We first invoke
     * the transition to make sure it's registered
     * inside the `useMotion` plugin.
     *
     * Visually this does nothing, but it applies
     * the transition and stores it so we can access
     * it using the `useMotions` hook.
     */
    onMounted(() => {
      if (props.isOpen) {
        enter(() => null)
      } else {
        leave(() => null)
      }
    })

    return () => {
      const children = slots
        ?.default?.()
        .filter((vnode) => String(vnode.type) !== 'Symbol(Comment)')

      return withDirectives(
        <chakra.div {...attrs} ref={targetRef}>
          {() => children}
        </chakra.div>,
        [[MotionDirective(variant.value), transitionId.value]]
      )
    }
  },
})
