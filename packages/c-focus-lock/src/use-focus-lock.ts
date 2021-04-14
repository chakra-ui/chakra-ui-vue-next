import { MaybeElementRef, unrefElement, useRef } from '@chakra-ui/vue-utils'
import { AnyFunction, focus, getFirstFocusable } from '@chakra-ui/utils'
import { watch, ref, Ref, UnwrapRef, onBeforeUnmount, nextTick } from 'vue'
import {
  ActivateOptions,
  createFocusTrap,
  DeactivateOptions,
  FocusTarget,
  FocusTrap,
  Options,
} from 'focus-trap'

export interface UseFocusLockOptions extends Options {
  /**
   * Immediately activate the trap
   */
  immediate?: boolean
}

export interface UseFocusLockReturn {
  /**
   * Indicates if the focus trap is currently active
   */
  hasFocus: Ref<boolean>

  /**
   * Indicates if the focus trap is currently paused
   */
  isPaused: Ref<boolean>

  /**
   * Activate the focus trap
   *
   * @link https://github.com/focus-trap/focus-trap#trapactivateactivateoptions
   * @param opts Activate focus trap options
   */
  activate: (opts?: ActivateOptions) => void

  /**
   * Deactivate the focus trap
   *
   * @link https://github.com/focus-trap/focus-trap#trapdeactivatedeactivateoptions
   * @param opts Deactivate focus trap options
   */
  deactivate: (opts?: DeactivateOptions) => void

  /**
   * Pause the focus trap
   *
   * @link https://github.com/focus-trap/focus-trap#trappause
   */
  pause: AnyFunction

  /**
   * Unpauses the focus trap
   *
   * @link https://github.com/focus-trap/focus-trap#trapunpause
   */
  unpause: AnyFunction

  /**
   * Node ref getter for initial focus element inside the focus trap
   */
  initialFocus: (el: UnwrapRef<MaybeElementRef>) => void

  /**
   * Node ref getter for focus lock element
   */
  lock: (el: UnwrapRef<MaybeElementRef>) => void
}

/**
 * Reactive focus-lock composable
 *
 * @param target The target element to trap focus within
 * @param options Focus lock options
 */
export function useFocusLock(
  options: UseFocusLockOptions = {}
): UseFocusLockReturn {
  let trap: undefined | FocusTrap

  const [lock, lockEl] = useRef()
  const [initialFocus, initialFocusEl] = useRef()

  const { immediate, ...focusLockOptions } = options

  const hasFocus = ref(false)
  const isPaused = ref(false)

  const activate = (opts?: ActivateOptions) =>
    setTimeout(() => trap && trap.activate(opts))
  const deactivate = (opts?: DeactivateOptions) =>
    setTimeout(() => trap && trap.deactivate(opts))

  const pause = () => {
    if (trap) {
      trap.pause()
      isPaused.value = true
    }
  }

  const unpause = () => {
    if (trap) {
      trap.unpause()
      isPaused.value = false
    }
  }

  watch(
    lockEl,
    async (el) => {
      await nextTick()
      if (!el) return
      trap = createFocusTrap(el, {
        initialFocus: initialFocusEl.value as FocusTarget,
        ...focusLockOptions,
        onActivate() {
          hasFocus.value = true

          // In some cases the initial focus element
          // may not yet be active. So just in case,
          // There's a fallback call here to focus the
          // element after the initial focus element is focused.
          const initialFocus = initialFocusEl.value ?? getFirstFocusable(el)
          console.log('initialFocusElement', initialFocus)
          setTimeout(() => focus(initialFocus))

          // Apply if consumer provides onActivate option
          if (options.onActivate) options.onActivate()
        },
        onDeactivate() {
          hasFocus.value = false
          // Apply if consumer provides onDeactivate option
          if (options.onDeactivate) options.onDeactivate()
        },
      })

      // Focus if immediate is set to true
      if (immediate) activate()
    },
    { flush: 'post', immediate: true }
  )

  // Cleanup on unmount
  onBeforeUnmount(() => {
    deactivate()
  })

  return {
    lock,
    initialFocus,
    hasFocus,
    isPaused,
    activate,
    deactivate,
    pause,
    unpause,
  }
}
