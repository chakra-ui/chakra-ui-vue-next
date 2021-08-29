import { ComputedRef, Ref, VNodeProps } from 'vue'
import { TemplateRef } from './dom'

/**
 * Value may or may not be a `ref`.
 *
 * ```ts
 * type MaybeRef<T> = T | Ref<T>
 * ```
 */
export type MaybeRef<T> = T | Ref<T> | ComputedRef<T>

/** VNodeProps Object */
export interface MergedVNodeProps extends VNodeProps {
  ref: TemplateRef | ((el: TemplateRef | null) => void)
}