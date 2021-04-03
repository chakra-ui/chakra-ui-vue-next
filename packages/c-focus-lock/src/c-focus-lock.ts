import { h, defineComponent, PropType, Ref, Component } from 'vue'
import { FocusTrap } from 'focus-trap-vue'

export interface FocusLockProps {
  /**
   * `ref` of the element to receive focus initially
   */
  initialFocusRef: Ref<() => HTMLElement | string>
  /**
   * `ref` of the element to return focus to when `CFocusLock`
   * unmounts or is deactivated
   */
  finalFocusRef: Ref<() => HTMLElement | string>
  /**
   * The `ref` of the wrapper for which the focus-lock wraps
   */
  contentRef: Ref<() => HTMLElement | string>
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
    finalFocusRef: [String, Function] as PropType<
      FocusLockProps['finalFocusRef']
    >,
    contentRef: [String, Function] as PropType<FocusLockProps['contentRef']>,
    restoreFocus: Boolean as PropType<FocusLockProps['restoreFocus']>,
    isDisabled: Boolean as PropType<FocusLockProps['isDisabled']>,
    autoFocus: Boolean as PropType<FocusLockProps['autoFocus']>,
  },
  setup(props, { slots, attrs }) {
    return h(
      FocusTrap,
      {
        initialFocus: props.initialFocusRef,
      },
      slots
    )
  },
})
