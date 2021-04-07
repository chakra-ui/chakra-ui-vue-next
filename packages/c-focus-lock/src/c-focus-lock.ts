import {
  h,
  defineComponent,
  PropType,
  ref,
  onMounted,
  nextTick,
  reactive,
  computed,
  watch,
  onUpdated,
  cloneVNode,
} from 'vue'
import { chakra } from '@chakra-ui/vue-system'
import { focus, __DEV__ } from '@chakra-ui/utils'
import { FocusLockOptions, useFocusLock } from './use-focus-lock'

type RefProp = () => HTMLElement & string

export interface FocusLockProps extends FocusLockOptions {
  /**
   * `ref` of the element to receive focus initially
   */
  initialFocusRef: RefProp
  /**
   * `ref` of the element to return focus to when `CFocusLock`
   * unmounts or is deactivated
   */
  finalFocusRef: RefProp
  /**
   * The `ref` of the wrapper for which the focus-lock wraps
   */
  contentRef: RefProp
  /**
   * If `true`, focus will be restored to the element that
   * triggered the `CFocusLock` once it unmounts
   */
  restoreFocus: boolean
  /**
   * Disables focus trapping when set to `true`.
   */
  isDisabled: boolean
  /**
   * If `true`, the first focuable element within the `contentRef`
   * will be auto-focused once `CFocusLock` mounts
   */
  autoFocus: boolean
}

export const CFocusLock = defineComponent({
  props: {
    initialFocusRef: [String, Function] as PropType<
      FocusLockProps['initialFocusRef']
    >,
    fallbackFocusRef: [String, Function] as PropType<
      FocusLockProps['fallbackFocus']
    >,
    finalFocusRef: [String, Function] as PropType<
      FocusLockProps['finalFocusRef']
    >,
    restoreFocus: {
      type: Boolean as PropType<FocusLockProps['restoreFocus']>,
      default: true,
    },
    isDisabled: {
      type: Boolean as PropType<FocusLockProps['isDisabled']>,
    },
    autoFocus: Boolean as PropType<FocusLockProps['autoFocus']>,
    clickOutsideDeactivates: {
      type: Boolean as PropType<FocusLockProps['clickOutsideDeactivates']>,
      default: true,
    },
  },
  emits: ['activate', 'deactivate'],
  setup(props, { slots, emit }) {
    const el = ref<HTMLElement | null>(null)

    onMounted(() => {
      const { lock, initialFocus } = useFocusLock({
        enabled: !props.isDisabled,
        clickOutsideDeactivates: props.clickOutsideDeactivates,
        fallbackFocus: props.fallbackFocusRef,
        returnFocus: props.restoreFocus,
        onActivate: () => emit('activate'),
        onDeactivate: () => {
          emit('deactivate')
          const finalFocusRef =
            props.initialFocusRef?.() || props.initialFocusRef
          if (typeof finalFocusRef === 'string') {
            focus(document.querySelector(finalFocusRef) as HTMLElement)
          } else {
            // @ts-expect-error
            focus(finalFocusRef?.$el || finalFocusRef)
          }
        },
      })

      onUpdated(() => {
        if (props.initialFocusRef) {
          initialFocus(props.initialFocusRef?.() || props.initialFocusRef)
        }
      })

      watch(
        () => props.isDisabled,
        (val) => console.log('isDisabled', val)
      )

      watch(
        el,
        (val) => {
          console.log({ val })
          lock(val)
        },
        {
          immediate: true,
          flush: 'post',
        }
      )
    })

    return () =>
      h(
        chakra('div'),
        {
          label: 'focus-lock',
          ref: el,
        },
        slots
      )

    // return () => {
    //   if (!slots.default) return null

    //   const vNodes = slots.default().filter((vnode) => vnode.type !== Comment)
    //   if (!vNodes || !vNodes.length || vNodes.length > 1) {
    //     if (__DEV__) {
    //       console.warn(
    //         '[chakra-ui:focus-lock]: CFocusLock requires exactly one child.'
    //       )
    //     }

    //     return vNodes
    //   }

    //   console.log(lock)
    //   const vnode = cloneVNode(vNodes[0], { ref: el })
    //   return vnode
    // }
  },
})
