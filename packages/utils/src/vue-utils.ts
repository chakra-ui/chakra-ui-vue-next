import { Dict, isObject } from "@chakra-ui/utils"
import {
  inject,
  InjectionKey,
  provide,
  isVNode,
  Slots,
  VNode,
  ComputedRef,
  Ref,
  computed,
  ref,
  cloneVNode,
  h,
  reactive,
} from "vue"
import { MaybeComputedRef, MaybeRef } from "./types"

export interface CreateContextOptions {
  /**
   * If `true`, Vue will throw if context is `null` or `undefined`
   * In some cases, you might want to support nested context, so you can set it to `false`
   */
  strict?: boolean
  /**
   * Error message to throw if the context is `undefined`
   */
  errorMessage?: string
  /**
   * The display name of the context
   */
  name?: string
}

type CreateContextReturn<T> = [(opts: T) => void, (fallback?: T) => T, Symbol]

/**
 * Creates a named context, provider, and hook.
 *
 * @param options create context options
 */
export function createContext<ContextType>(
  options: CreateContextOptions = {},
  defaults?: ContextType
) {
  const {
    strict = true,
    errorMessage = "useContext: `context` is undefined. Seems you forgot to wrap component within the Provider",
    name,
  } = options

  let contextSymbol = Symbol(`${name}Symbol`) as InjectionKey<ContextType>

  function Provider(payload: ContextType) {
    provide<ContextType>(contextSymbol, payload)
  }

  function useContext(fallback: ContextType | null = null) {
    const context = inject(contextSymbol, fallback)

    if (!context && strict) {
      throw new Error(errorMessage)
    }

    return context
  }

  return [
    Provider,
    useContext,
    contextSymbol,
  ] as CreateContextReturn<ContextType>
}

/**
 * Gets only the valid children of a component,
 * and ignores any nullish or falsy child.
 *
 * @param slots vue slots
 *
 * see https://github.com/vuejs/vue-next/blob/HEAD/packages/runtime-core/src/helpers/renderSlot.ts
 */
export function getValidChildren(slots: Slots | null): VNode[] {
  const slotArray = slots?.default?.() || []
  return slotArray.filter((child) => {
    return isVNode(child)
  })
}

/**
 * Returns a copy of only the valid default slot
 *
 * @param slots - the slots object from the component setup
 * @param componentName component display name for thrown errors
 * @returns A VNode clone of the default slot
 */
export function withSingleton(
  slots: Slots,
  componentName: string,
  props?: Dict
) {
  const validChildren = getValidChildren(slots)
  if (validChildren.length > 1) {
    const errorMessage = `[${componentName}] : ${componentName} can only have one root element.`
    console.error(errorMessage)
    throw new SyntaxError(errorMessage)
  }

  const finalSlot = cloneVNode(validChildren[0])

  return h(finalSlot, props)
}

/**
 * For the component composables -- takes in the props object
 * and returns the props with a reactive context object
 */
export function transformComposableProps<T extends { context: object }>(
  props: T
): T {
  return {
    ...props,
    context: reactive(props.context),
  }
}

export interface CouldBeObjectComponent {
  setup?: FunctionConstructor
  render?: FunctionConstructor
}

/** Checkes whether a provided object is a component */
export function isObjectComponent<T extends CouldBeObjectComponent>(
  subject: T
) {
  const validComponentTypes = ["function", "object"]
  if (!validComponentTypes.includes(typeof subject)) return false

  // Is sub
  if (isObject(subject)) {
    // Is object component with render function
    if (typeof subject?.render === "function" && isVNode(subject.render()))
      return true
    // Is object component with setup function
    else if (typeof subject?.setup === "function") return true
  }

  return false
}

/**
 * Normalize value/ref/getter to `ref` or `computed`.
 * Adapted from @vueuse/shared
 */
export function resolveRef<T>(r: MaybeComputedRef<T>): ComputedRef<T>
export function resolveRef<T>(r: MaybeRef<T>): Ref<T>
export function resolveRef<T>(r: T): Ref<T>
export function resolveRef<T>(r: MaybeComputedRef<T>) {
  return typeof r === "function" ? computed<T>(r as any) : ref(r)
}
