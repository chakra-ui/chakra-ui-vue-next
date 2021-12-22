import { ComputedRef, Ref, VNodeProps } from "vue"
import { TemplateRef } from "./dom"

/**
 * Value may or may not be a `ref`.
 *
 * ```ts
 * type MaybeRef<T> = T | Ref<T>
 * ```
 */
export type MaybeRef<T> = T | Ref<T> | ComputedRef<T>

/**
 * May be a simple ref (nor computed ref)
 */
export type MaybeBaseRef<T> = T | Ref<T>

/** VNodeProps Object */
export interface MergedVNodeProps extends VNodeProps {
  ref: TemplateRef | ((el: TemplateRef | null) => void)
}

/**
 * Any function
 */
export type Fn = () => void
