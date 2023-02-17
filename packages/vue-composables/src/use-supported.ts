import { tryOnMounted } from "@chakra-ui/vue-utils"
import type { Ref } from "vue"
import { ref } from "vue"

/**
 * SSR compatible way to check if something is supported. If it is, it returns true, otherwise false.
 *
 * ```ts
 *  import { useSupported } from '@vueuse/core'
 *
 *  const isSupported = useSupported(() => navigator && 'getBattery' in navigator)
 *
 *  if (isSupported.value) {
 *    // do something
 *    navigator.getBattery
 *  }
 *  ```
 *
 * @param callback
 * @param sync
 * @returns
 */
export function useSupported(callback: () => unknown, sync = false) {
  const isSupported = ref() as Ref<boolean>

  const update = () => (isSupported.value = Boolean(callback()))

  update()

  tryOnMounted(update, sync)
  return isSupported
}
