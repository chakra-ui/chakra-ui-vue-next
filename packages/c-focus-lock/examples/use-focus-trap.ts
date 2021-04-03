/**
 * 1. When component mounts, initialize focus trap
 */

import {
  computed,
  nextTick,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  Ref,
  ref,
  watch,
  watchEffect,
} from 'vue'
import { createFocusTrap, FocusTrap, FocusTarget } from 'focus-trap'
import { focus, getAllFocusable } from '@chakra-ui/utils'
export interface FocusLockOptions {
  /**
   * Determines whether the focus lock is active or inactive
   * @default true
   */
  enabled: boolean
  /**
   * Invoked handler when focus-lock is activated
   */
  onActivate?: () => void
  /**
   * Invoked handler when focus-lock is deactivated
   */
  onDeactivate?: () => void
  /**
   * The content child element to be focused when the focus lock is activated.
   * By default, when a focus trap is activated the first element in the
   * focus trap's tab order will receive focus. With this option you
   * can specify a different element to receive that initial focus.
   */
  initialFocus?: Element | string | (() => Element)
  /**
   * Invoked handler when focus-lock is activated.
   *
   * By default, an error will be thrown if the focus lock
   * contains no elements in its tab order. With this
   * option you can specify a fallback element to
   * programmatically receive focus if no other
   * tabbable elements are found.
   */
  fallbackFocus?: FocusTarget
  /**
   * Determines whether focus lock is activated when user clicks outside.
   * @default true
   */
  clickOutsideDeactivates?: boolean | ((e: MouseEvent) => boolean)
  persistentFocus?: boolean | ((e: MouseEvent) => boolean)
  returnFocus?: boolean
  preventScroll: boolean
  escapeDeactivates: boolean
  delayInitialFocus: boolean
}

const FOCUS_LOCK_DEFAULTS: FocusLockOptions = {
  enabled: true,
  clickOutsideDeactivates: true,
  escapeDeactivates: false,
  persistentFocus: false,
  preventScroll: false,
  delayInitialFocus: true,
}

export const useFocusLock = (focusLockOptions: FocusLockOptions) => {
  const content = ref<HTMLElement | null>(null)
  const trap = ref<FocusTrap | null>(null)
  const enabled = ref(true)

  const options = computed(() => ({
    ...FOCUS_LOCK_DEFAULTS,
    ...focusLockOptions,
  }))

  const setupFocusLock = () => {
    console.log('setupFocusLock called', {
      enabled: enabled.value,
    })
    if (enabled.value) {
      try {
        const focusables = getAllFocusable(content.value as HTMLElement)
        if (focusables.length === 0) {
          console.warn(
            'chakra-ui:focus-lock',
            'No focusable elements found inside content ref',
            { container: content.value, children: content.value?.childNodes }
          )
          focus(content.value, { nextTick: true })
        }

        trap.value = createFocusTrap(content.value as HTMLElement, {
          initialFocus: focusables[0] || (content.value as FocusTarget),
          escapeDeactivates: options.value.escapeDeactivates,
          allowOutsideClick: options.value.persistentFocus,
          returnFocusOnDeactivate: options.value.returnFocus,
          clickOutsideDeactivates: options.value.clickOutsideDeactivates,
          onActivate: options.value.onActivate,
          onDeactivate: options.value.onDeactivate,
          fallbackFocus: options.value.fallbackFocus,
        })
        trap.value.activate()
      } catch (error) {
        console.warn('chakra-ui:focus-lock', error)
      }
    } else {
      trap.value?.deactivate()
      trap.value = null
    }
  }

  onMounted(async () => {
    await nextTick()
    watch(() => [content, enabled], setupFocusLock, {
      immediate: true,
      flush: 'post',
    })
  })
  watchEffect(() => {
    console.log('enabled', options.value.enabled)
  })

  onUnmounted(() => {
    trap.value?.deactivate?.()
    trap.value = null
  })

  return {
    content: (el: any) => {
      if (el) {
        content.value = el.$el || el
      }
    },
    enabled,
  }
}
