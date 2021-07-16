import { ComputedRef, Ref } from 'vue'

/**
 * Value may or may not be a `ref`.
 *
 * ```ts
 * type MaybeRef<T> = T | Ref<T>
 * ```
 */
export type MaybeRef<T> = T | Ref<T> | ComputedRef<T>
