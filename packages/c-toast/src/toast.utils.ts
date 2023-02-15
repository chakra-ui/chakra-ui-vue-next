import * as __toast__ from "@zag-js/toast"

export const placements = [
  "top-start",
  "top",
  "top-end",
  "bottom-start",
  "bottom",
  "bottom-end",
] as const

export type ToastPlacement = (typeof placements)[number]

export function getToastsByPlacement(toasts: __toast__.Service[]) {
  const result: Partial<Record<ToastPlacement, __toast__.Service[]>> = {
    "top-start": [],
    top: [],
    "top-end": [],
    "bottom-start": [],
    bottom: [],
    "bottom-end": [],
  }

  for (const toast of toasts) {
    const placement = toast.state.context.placement!
    result[placement] ||= []
    result[placement]!.push(toast)
  }

  return result
}

export { __toast__ }
