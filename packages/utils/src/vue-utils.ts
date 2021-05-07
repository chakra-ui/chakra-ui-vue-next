import { inject, InjectionKey, provide, isVNode, Slots } from 'vue'

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

type CreateContextReturn<T> = [(opts: T) => void, () => T]

/**
 * Creates a named context, provider, and hook.
 *
 * @param options create context options
 */
export function createContext<ContextType>(options: CreateContextOptions = {}) {
  const {
    strict = true,
    errorMessage = 'useContext: `context` is undefined. Seems you forgot to wrap component within the Provider',
    name,
  } = options

  let contextSymbol = Symbol(`${name}Symbol`) as InjectionKey<ContextType>

  function Provider(payload: ContextType) {
    provide<ContextType>(contextSymbol, payload)
  }

  function useContext() {
    const context = inject(contextSymbol, null)

    if (!context && strict) {
      throw new Error(errorMessage)
    }

    return context
  }

  return [Provider, useContext] as CreateContextReturn<ContextType>
}

/**
 * Gets only the valid children of a component,
 * and ignores any nullish or falsy child.
 *
 * @param slots vue slots
 *
 * see https://github.com/vuejs/vue-next/blob/HEAD/packages/runtime-core/src/helpers/renderSlot.ts
 */
export function getValidChildren(slots: Slots | null) {
  const slotArray = slots?.default?.() || []
  return slotArray.filter((child) => {
    return isVNode(child)
  })
}
