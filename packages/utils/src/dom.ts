import { ComponentOptions, onBeforeUpdate, Ref, ref } from 'vue'

/**
 * Interface for node provided by template ref
 */
export interface TemplateRef extends ComponentOptions, HTMLElement {
  $el?: HTMLElement | null
}

/**
 * For internal use
 *
 * Creates refs that will be bound to the template/render function.
 *
 * Why not just use the regular `ref(null)` and bind it to the element?
 * 1. To avoid unwrapping template refs which maybe components. This hook will always
 *    give us the actual element being bound the the element, and not the component
 *    options.
 *
 * @returns []
 */
export function useRef(): [(el: TemplateRef) => void, Ref<HTMLElement | null>] {
  const refEl = ref<HTMLElement | null>(null)

  onBeforeUpdate(() => {
    // clear refs before DOM updates
    refEl.value = null
  })

  /**
   * Getter function to bind ref to value
   * @param el Template ref value provided by Vue
   */
  const _ref = (el: TemplateRef) => {
    refEl.value = el?.$el || el
  }

  return [_ref, refEl]
}
