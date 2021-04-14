/**
 *
 * `@chakra-ui/c-focus-lock` component.
 *
 * Some known issues:
 *
 * At this point in time, there seems to be a weird bug
 * where focus is first sent to the body before it
 * is sent into the focus trap.
 *
 * I think this might be an issue later.
 *
 * I did some inspection around this issue for some time
 * and my suspicion is that it is happening inside the library
 */

import { h, defineComponent, PropType, computed } from 'vue'
import { chakra } from '@chakra-ui/vue-system'
import { focus, FocusableElement, __DEV__ } from '@chakra-ui/utils'
import { UseFocusLockOptions, useFocusLock } from './use-focus-lock'
import { useRef } from '@chakra-ui/vue-utils'
import { FocusTarget } from 'focus-trap'

type RefProp = () => HTMLElement | string | object | undefined

export interface FocusLockProps extends UseFocusLockOptions {
  /**
   * Element to which to send focus when focus trap has been deacivated
   */
  finalFocusRef?: RefProp
  /**
   * Element to which to send focus when focus trap has been activated
   */
  initialFocusRef?: RefProp
  /**
   * If `true`, the first focuable element within the `contentRef`
   * will be auto-focused once `CFocusLock` mounts
   */
  autoFocus?: boolean
}

export const CFocusLock = defineComponent({
  name: 'CFocusLock',
  emits: ['activate', 'deactivate'],
  props: {
    finalFocusRef: [String, Function] as PropType<
      FocusLockProps['finalFocusRef']
    >,
    initialFocusRef: [String, Function] as PropType<
      FocusLockProps['initialFocusRef']
    >,
    autoFocus: {
      type: Boolean as PropType<FocusLockProps['autoFocus']>,
      default: true,
    },
    escapeDeactivates: {
      type: Boolean as PropType<FocusLockProps['escapeDeactivates']>,
      default: false,
    },
    clickOutsideDeactivates: {
      type: Boolean as PropType<FocusLockProps['clickOutsideDeactivates']>,
      default: false,
    },
    allowOutsideClick: {
      type: Boolean as PropType<FocusLockProps['allowOutsideClick']>,
      default: false,
    },
    restoreFocus: {
      type: Boolean as PropType<Boolean>,
      default: true,
    },
  },
  setup(props, { attrs, slots, emit }) {
    const finalFocusElement = computed(() => {
      let finalFocus
      if (props.finalFocusRef) {
        const finalFocusRef = props.finalFocusRef?.() || props.finalFocusRef
        if (typeof finalFocusRef === 'string') {
          finalFocus = document.querySelector<FocusableElement & Element>(
            finalFocusRef
          )
        } else {
          // @ts-expect-error
          finalFocus = finalFocusRef?.$el || finalFocusRef
        }
      }
      return finalFocus
    })

    /**
     * Basic state for focus lock component.
     */
    const { lock, ...focusLockState } = useFocusLock({
      ...props,
      onActivate() {
        emit('activate')
      },
      onDeactivate() {
        setTimeout(() => {
          emit('deactivate')
          if (finalFocusElement.value) {
            focus(finalFocusElement.value)
          }
        })
      },
      initialFocus: props.initialFocusRef as FocusTarget,
      // Should only return focus to original element
      // when the final focus element is not set
      returnFocusOnDeactivate: !!!finalFocusElement.value,
      immediate: props.autoFocus,
    })

    return () =>
      h(
        chakra('div', {
          label: 'focus-lock',
        }),
        {
          // @ts-expect-error
          ref: lock,
          ...attrs,
        },
        () =>
          slots.default?.({
            ...focusLockState,
            hasFocus: focusLockState.hasFocus.value,
          })
      )
  },
})
