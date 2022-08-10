import { getActiveElement, isFocusable } from "@chakra-ui/utils"

export function focus(el: HTMLElement) {
  if (getActiveElement(el) === el) return
  if (!isFocusable(el)) return
  el.focus()
}

export function blur(el?: HTMLElement | null) {
  if (el == null) el = document.activeElement as HTMLElement
  if (el.tagName === "BODY") return
  if (getActiveElement(el) !== el) return
  if (el && "blur" in el) el.blur()
}
