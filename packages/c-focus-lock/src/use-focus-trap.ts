import {
  onUnmounted,
  onUpdated,
  ref,
  watchEffect,

  // Types
  Ref,
  ComputedRef,
  onBeforeMount,
  onBeforeUnmount,
} from "vue"

import {
  contains,
  Focus,
  focusElement,
  focusIn,
  FocusResult,
  getSelector,
  Keys,
} from "@chakra-ui/vue-utils"
import { useWindowEvent } from "@chakra-ui/vue-composables"

export function useFocusTrap(
  containers: Ref<Set<HTMLElement>> | ComputedRef<Set<HTMLElement>>,
  enabled: Ref<boolean> | ComputedRef<boolean> = ref(true),
  options:
    | Ref<{ initialFocus?: HTMLElement | null }>
    | ComputedRef<{ initialFocus?: HTMLElement | null }> = ref({})
) {
  let restoreElement = ref<HTMLElement | null>(
    typeof window !== "undefined"
      ? (document.activeElement as HTMLElement)
      : null
  )
  let previousActiveElement = ref<HTMLElement | null>(null)

  function handleFocus() {
    if (!enabled.value) return
    if (containers.value.size !== 1) return
    let { initialFocus } = options.value

    let activeElement = document.activeElement as HTMLElement

    if (initialFocus) {
      if (initialFocus === activeElement) {
        return // Initial focus ref is already the active element
      }
    } else if (contains(containers.value, activeElement)) {
      return // Already focused within Dialog
    }

    restoreElement.value = activeElement

    // Try to focus the initialFocus ref
    if (initialFocus) {
      focusElement(initialFocus)
    } else {
      let couldFocus = false
      for (let container of containers.value) {
        let result = focusIn(container, Focus.First)
        if (result === FocusResult.Success) {
          couldFocus = true
          break
        }
      }

      if (!couldFocus)
        console.warn("There are no focusable elements inside the <FocusTrap />")
    }

    previousActiveElement.value = document.activeElement as HTMLElement
  }

  // Restore when `enabled` becomes false
  function restore() {
    // @ts-expect-error - focusElement is not typed
    focusElement(restoreElement.value)
    restoreElement.value = null
    previousActiveElement.value = null
  }

  // Handle initial focus
  watchEffect(handleFocus)

  onUpdated(() => {
    enabled.value ? handleFocus() : restore()
  })
  onUnmounted(restore)

  // Handle Tab & Shift+Tab keyboard events
  useWindowEvent("keydown", (event) => {
    if (!enabled.value) return
    if (event.key !== Keys.Tab) return
    if (!document.activeElement) return
    if (containers.value.size !== 1) return

    event.preventDefault()

    for (let element of containers.value) {
      let result = focusIn(
        element,
        (event.shiftKey ? Focus.Previous : Focus.Next) | Focus.WrapAround
      )

      if (result === FocusResult.Success) {
        previousActiveElement.value = document.activeElement as HTMLElement
        break
      }
    }
  })

  // Prevent programmatically escaping
  useWindowEvent(
    "focus",
    (event) => {
      if (!enabled.value) return
      if (containers.value.size !== 1) return

      let previous = previousActiveElement.value
      if (!previous) return

      let toElement = event.target as HTMLElement | null

      if (toElement && toElement instanceof HTMLElement) {
        if (!contains(containers.value, toElement)) {
          event.preventDefault()
          event.stopPropagation()
          // @ts-expect-error - focusElement is not typed
          focusElement(previous)
        } else {
          previousActiveElement.value = toElement
          focusElement(toElement)
        }
      } else {
        // @ts-expect-error - focusElement is not typed
        focusElement(previousActiveElement.value)
      }
    },
    true
  )
}

export function useReturnFocusSelector(shouldTrack: Ref<boolean>) {
  const lastFocused = ref<EventTarget | null>(null)
  const lastFocusedSelector = ref<string | undefined>()

  const trackFocus = (event: Event) => {
    if (!shouldTrack.value) {
      lastFocusedSelector.value = getSelector(event.target as HTMLElement)
    }
  }

  onBeforeMount(() => {
    document.addEventListener("focusin", trackFocus)
  })

  onBeforeUnmount(() => {
    document.removeEventListener("focusin", trackFocus)
    lastFocused.value = null
    lastFocusedSelector.value = undefined
  })

  return {
    lastFocused,
    lastFocusedSelector,
  }
}
