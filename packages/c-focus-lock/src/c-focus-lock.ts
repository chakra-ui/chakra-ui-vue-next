import { h, defineComponent, PropType, ref, onMounted, nextTick } from 'vue'
import { chakra } from '@chakra-ui/vue-system'
import { getAllFocusable, focus } from '@chakra-ui/utils'
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
    contentRef: [String, Function] as PropType<FocusLockProps['contentRef']>,
    restoreFocus: {
      type: Boolean as PropType<FocusLockProps['restoreFocus']>,
      default: true,
    },
    isDisabled: {
      type: Boolean as PropType<FocusLockProps['isDisabled']>,
      default: false,
    },
    autoFocus: Boolean as PropType<FocusLockProps['autoFocus']>,
    clickOutsideDeactivates: Boolean as PropType<
      FocusLockProps['clickOutsideDeactivates']
    >,
  },
  emits: ['activate', 'deactivate'],
  setup(props, { slots, emit }) {
    const { lock, initialFocus } = useFocusLock({
      enabled: !props.isDisabled,
      onActivate: () => emit('activate'),
      onDeactivate: () => emit('deactivate'),
      clickOutsideDeactivates: props.clickOutsideDeactivates,
      fallbackFocus: props.fallbackFocusRef,
      returnFocus: props.restoreFocus,
    })

    if (props.initialFocusRef) {
      initialFocus(props.initialFocusRef?.() || props.initialFocusRef)
    }

    return () =>
      h(
        chakra('div'),
        {
          label: 'focus-lock',
          ref: lock,
        },
        slots
      )
  },
})
