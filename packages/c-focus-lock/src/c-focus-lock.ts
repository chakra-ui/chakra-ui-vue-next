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

import { defineComponent, PropType, computed, cloneVNode, VNode } from 'vue'
import { focus, FocusableElement, warn, __DEV__ } from '@chakra-ui/utils'
import { UseFocusLockOptions, useFocusLock } from './use-focus-lock'
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
    finalFocusRef: [String, Object, Function] as PropType<
      FocusLockProps['finalFocusRef']
    >,
    initialFocusRef: [String, Object, Function] as PropType<
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
    const { lock } = useFocusLock({
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

    return () => {
      const [firstChild] = slots.default?.({}) as VNode[]

      if (!firstChild) {
        warn([
          {
            condition: __DEV__,
            message: `[chakra-ui:focus-lock]: Focus lock component expects at least and only one child element.`,
          },
        ])
        return
      }

      return cloneVNode(firstChild, {
        ref: lock,
        ...attrs,
        'data-chakra-focus-lock': '',
      })
    }
  },
})
