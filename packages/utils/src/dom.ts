import {
  ComponentOptions,
  defineComponent,
  onBeforeUpdate,
  Ref,
  ref,
  unref,
  UnwrapRef,
} from 'vue'
import { MaybeRef } from './types'

/**
 * Interface for node provided by template ref
 */
export type TemplateRef = Element | VueComponentInstance | undefined | null

/**
 * For internal use
 *
 * Creates refs that will be bound to the template/render function.
 *
 * Why not just use the regular `ref(null)` and bind it to the element?
 *
 * 1. To avoid unwrapping template refs which maybe components. This hook will always
 *    give us the actual element being bound the the element, and not the component
 *    options.
 *
 * 2. In some cases where we need an up-to-date value of the ref node,
 *    from the consuming component, we can use this hook.
 *
 * @returns []
 */
export function useRef(): [
  (el: TemplateRef | null) => void,
  Ref<HTMLElement | null>
] {
  const refEl = ref<HTMLElement | null>(null)

  onBeforeUpdate(() => {
    // clear refs before DOM updates
    refEl.value = null
  })

  /**
   * Getter function to bind ref to value
   * @param el Template ref value provided by Vue
   */
  const _ref = (el: TemplateRef | null) => {
    refEl.value = (el as VueComponentInstance)?.$el ?? el
  }

  return [_ref, refEl]
}

/** Vue Component HTML Element Instance */
export type VueComponentInstance = InstanceType<
  ReturnType<typeof defineComponent>
>

/** Ref may or may not be an HTML Element or VueComponent instance */
export type MaybeElementRef = MaybeRef<
  Element | VueComponentInstance | undefined | null
>

/**
 * Unwraps element from ref
 * @param elementRef Ref of template node
 */
export function unrefElement(
  elementRef: MaybeElementRef
): UnwrapRef<MaybeElementRef> {
  const node = unref(elementRef)
  return (node as VueComponentInstance)?.$el ?? node
}
