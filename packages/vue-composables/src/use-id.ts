import { computed, ref } from "vue"

let _id = 0
const genId = () => ++_id

/**
 * Generates a unique id
 *
 * @param id external ID provided by consumer/user.
 * @param prefix prefix to append before the id
 */
export const useId = (id?: string, prefix?: string) => {
  const initialId = id || genId()
  const uid = ref(initialId)

  return computed(() => {
    const __id__ = uid.value !== null ? uid.value.toString() : undefined
    return (prefix ? `${prefix}-${__id__}` : __id__) as string
  })
}

/**
 * Hook to generate ids for use in compound components
 *
 * @param id the external id passed from the user
 * @param prefixes array of prefixes to use
 */
export function useIds(id?: string, ...prefixes: string[]) {
  const __id__ = useId(id)
  return prefixes.map((prefix) => computed(() => `${prefix}-${__id__.value}`))
}
