/**
 * 1. When component mounts, initialize focus trap
 */

import { ref } from 'vue'
export interface FocusLockOptions {}

export const useFocusLock = () => {
  const content = ref<HTMLElement | null>(null)
  const setupFocusLock = () => {
    console.log('setup focus lock')
    console.log(content.value)
  }
  return {
    content: (el: any) => {
      if (el) {
        content.value = el.$el || el
        setupFocusLock()
      }
    },
  }
}
