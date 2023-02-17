import {
  MaybeComputedRef,
  defaultWindow,
  ConfigurableWindow,
  resolveRef,
  tryOnScopeDispose,
} from "@chakra-ui/vue-utils"
import { useSupported } from "./use-supported"
import { ref, watchEffect } from "vue"

/**
 * Reactive Media Query.
 *
 * @param query
 * @param options
 */
export function useMediaQuery(
  query: MaybeComputedRef<string>,
  options: ConfigurableWindow = {}
) {
  const { window = defaultWindow } = options
  const isSupported = useSupported(
    () =>
      window &&
      "matchMedia" in window &&
      typeof window.matchMedia === "function"
  )

  let mediaQuery: MediaQueryList | undefined
  const matches = ref(false)

  const cleanup = () => {
    if (!mediaQuery) return
    if ("removeEventListener" in mediaQuery)
      mediaQuery.removeEventListener("change", update)
    // @ts-expect-error deprecated API
    else mediaQuery.removeListener(update)
  }

  const update = () => {
    if (!isSupported.value) return

    cleanup()

    mediaQuery = window!.matchMedia(resolveRef(query).value)
    matches.value = mediaQuery.matches

    if ("addEventListener" in mediaQuery)
      mediaQuery.addEventListener("change", update)
    // @ts-expect-error deprecated API
    else mediaQuery.addListener(update)
  }
  watchEffect(update)

  tryOnScopeDispose(() => cleanup())

  return matches
}
