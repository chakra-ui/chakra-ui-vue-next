import {
  enableBodyScroll,
  disableBodyScroll,
  BodyScrollOptions,
} from 'body-scroll-lock'
import { Ref, watch } from 'vue'
import { useRef } from '@chakra-ui/vue-utils'

/**
 * Enables body scroll locking
 * @param enable whether the scroll lock should be active or not
 * @param options BodyScrollLock options
 * @returns Ref of element to exclude from body scroll lock
 */
export function useBodyScrollLock(
  enable: Ref<boolean>,
  options?: BodyScrollOptions
) {
  const [scrollLockRef, scrollLockEl] = useRef()
  watch(
    [scrollLockEl, enable],
    ([target, isActive], [previousTarget]) => {
      if (!target || !enable.value) {
        previousTarget && enableBodyScroll(previousTarget)
      } else if (target && isActive) {
        disableBodyScroll(target, options)
      } else {
        enableBodyScroll(target)
      }
    },
    {
      immediate: true,
      flush: 'post',
    }
  )
  return {
    scrollLockRef,
  }
}
