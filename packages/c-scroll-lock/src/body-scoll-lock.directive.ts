import { Directive, DirectiveBinding } from 'vue'
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock'

export const BodyScrollLockDirective: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<{ value: boolean }>) {
    if (el && binding.value) {
      disableBodyScroll(el)
    } else if (el && !binding.value) {
      enableBodyScroll(el)
    }
  },
  updated(el: HTMLElement, binding: DirectiveBinding<{ value: boolean }>) {
    if (el && binding.value) {
      disableBodyScroll(el)
    } else if (el && !binding.value) {
      enableBodyScroll(el)
    }
  },
  unmounted(el: HTMLElement, binding: DirectiveBinding<{ value: boolean }>) {
    if (el) {
      enableBodyScroll(el)
    }
  },
}
