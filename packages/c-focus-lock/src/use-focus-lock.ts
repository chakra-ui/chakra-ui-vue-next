/**
 * 1. When component mounts, initialize focus trap
 */

import {
  computed,
  nextTick,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  ref,
  watch,
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
  preventScroll?: boolean
  escapeDeactivates?: boolean
  delayInitialFocus?: boolean
}

const FOCUS_LOCK_DEFAULTS: FocusLockOptions = {
  enabled: true,
  clickOutsideDeactivates: true,
  escapeDeactivates: false,
  persistentFocus: false,
  preventScroll: false,
  delayInitialFocus: true,
  returnFocus: true,
}

export const useFocusLock = (focusLockOptions?: FocusLockOptions) => {
  const focusLockRef = ref<HTMLElement | null>(null)
  const initialFocus = ref<HTMLElement | null>(null)
  const trap = ref<FocusTrap | null>(null)

  const options = computed(() => ({
    ...FOCUS_LOCK_DEFAULTS,
    ...focusLockOptions,
  }))

  const setupFocusLock = () => {
    if (options.value.enabled) {
      try {
        const focusables = getAllFocusable(focusLockRef.value as HTMLElement)
        if (focusables.length === 0) {
          console.warn(
            'chakra-ui:focus-lock',
            'No focusable elements found inside content ref',
            {
              container: focusLockRef.value,
              children: focusLockRef.value?.childNodes,
            }
          )
          focus(focusLockRef.value, { nextTick: true })
        }

        trap.value = createFocusTrap(focusLockRef.value as HTMLElement, {
          initialFocus:
            (initialFocus.value as FocusTarget) ||
            focusables[0] ||
            (focusLockRef.value as FocusTarget),
          escapeDeactivates: options.value.escapeDeactivates,
          allowOutsideClick: options.value.persistentFocus,
          returnFocusOnDeactivate: options.value.returnFocus,
          clickOutsideDeactivates: options.value.clickOutsideDeactivates,
          onActivate: options.value.onActivate,
          onDeactivate: () => {
            options.value?.onDeactivate?.()
            if (focusLockOptions) {
              focusLockOptions.enabled = false
            }
          },
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

    watch(() => [focusLockRef, options.value.enabled], setupFocusLock, {
      immediate: true,
      flush: 'post',
    })

    focusLockRef.value?.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && options.value.escapeDeactivates) {
        if (options.value.enabled && focusLockOptions) {
          focusLockOptions.enabled = false
        }
      }
    })
  })

  onUnmounted(() => {
    trap.value?.deactivate?.()
    trap.value = null
  })

  onBeforeUpdate(() => {
    // clear refs before DOM updates
    focusLockRef.value = null
    initialFocus.value = null
  })

  return {
    /**
     * DOM ref of focus-lock container
     */
    lock: (el: any) => {
      if (el) {
        focusLockRef.value = el.$el || el
      }
    },
    /**
     * The content child element to be focused when the focus lock is activated.
     * By default, when a focus trap is activated the first element in the
     * focus trap's tab order will receive focus. With this option you
     * can specify a different element to receive that initial focus.
     */
    initialFocus: (el: any) => {
      if (el) {
        initialFocus.value = el.$el || el
      }
    },
  }
}
