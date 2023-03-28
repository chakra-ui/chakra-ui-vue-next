import {
  ComponentPublicInstance,
  customRef,
  defineComponent,
  onBeforeUpdate,
  Ref,
  ref,
  unref,
  UnwrapRef,
} from "vue"
import { debounce } from "./timers"
import { MaybeRef } from "./types"
import { canUseDOM } from "@chakra-ui/utils"

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
export function useRef<T extends HTMLElement>(): [
  (el: TemplateRef | null) => void,
  Ref<T | null>
] {
  const refEl = ref<T | null>(null)

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

  return [_ref, refEl as any as Ref<T | null>]
}

/** Vue Component HTML Element Instance */
export type VueComponentInstance = InstanceType<
  ReturnType<typeof defineComponent>
>

/** Ref may or may not be an HTML Element or VueComponent instance */
export type MaybeElementRef = MaybeRef<
  Element | ComponentPublicInstance | VueComponentInstance | undefined | null
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

/**
 * Creates a ref whose value updates are debounced
 *
 * @example Simple example
 *
 * ```ts
 * const foo = useDebouncedRef('bar')
 * foo.value = 'baz'
 *
 * // foo.value to be updated to 'baz' after the delay of 300ms
 * ```
 *
 * @example Custom delay
 *
 * ```ts
 * const foo = useDebouncedRef('bar', 500)
 * foo.value = 'baz'
 *
 * // foo.value to be updated to 'baz' after the delay of 500ms
 * ```
 */
export function useDebouncedRef<T = unknown>(
  initialValue: T,
  delay: number = 300,
  immediate: boolean = false
) {
  const state = ref<T>(initialValue)
  const debouncedRef = customRef((track, trigger) => ({
    get() {
      track()
      return state.value
    },
    set: debounce(
      (value: T) => {
        state.value = value as UnwrapRef<T>
        trigger()
      },
      delay,
      immediate
    ),
  }))

  return debouncedRef
}

export type DebouncedRef = Ref<unknown>

export function contains(containers: Set<HTMLElement>, element: HTMLElement) {
  for (let container of containers) {
    if (container.contains(element)) return true
  }

  return false
}

export interface ConfigurableWindow {
  /*
   * Specify a custom `window` instance, e.g. working with iframes or in testing environments.
   */
  window?: Window
}

export interface ConfigurableDocument {
  /*
   * Specify a custom `document` instance, e.g. working with iframes or in testing environments.
   */
  document?: Document
}

export interface ConfigurableDocumentOrShadowRoot {
  /*
   * Specify a custom `document` instance or a shadow root, e.g. working with iframes or in testing environments.
   */
  document?: DocumentOrShadowRoot
}

export interface ConfigurableNavigator {
  /*
   * Specify a custom `navigator` instance, e.g. working with iframes or in testing environments.
   */
  navigator?: Navigator
}

export interface ConfigurableLocation {
  /*
   * Specify a custom `location` instance, e.g. working with iframes or in testing environments.
   */
  location?: Location
}

export const defaultWindow = /* #__PURE__ */ canUseDOM() ? window : undefined
export const defaultDocument = /* #__PURE__ */ canUseDOM()
  ? window.document
  : undefined
export const defaultNavigator = /* #__PURE__ */ canUseDOM()
  ? window.navigator
  : undefined
export const defaultLocation = /* #__PURE__ */ canUseDOM()
  ? window.location
  : undefined

/**
 * Sorts an array of nodes by their position in the DOM
 * @param nodes
 * @param resolveKey
 * @returns
 */
export function sortByDomNode<T>(
  nodes: T[],
  resolveKey: (item: T) => HTMLElement | null = (i) =>
    i as unknown as HTMLElement | null
): T[] {
  return nodes.slice().sort((aItem, zItem) => {
    let a = resolveKey(aItem)
    let z = resolveKey(zItem)

    if (a === null || z === null) return 0

    let position = a.compareDocumentPosition(z)

    if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1
    if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1
    return 0
  })
}
