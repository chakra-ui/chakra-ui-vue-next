import { watchEffect } from "vue"

export function useWindowEvent<T extends keyof WindowEventMap>(
  type: T,
  listener: (this: Window, ev: WindowEventMap[T]) => any,
  options?: boolean | AddEventListenerOptions
) {
  if (typeof window === "undefined") return

  watchEffect((onInvalidate) => {
    window.addEventListener(type, listener, options)

    onInvalidate(() => {
      window.removeEventListener(type, listener, options)
    })
  })
}
