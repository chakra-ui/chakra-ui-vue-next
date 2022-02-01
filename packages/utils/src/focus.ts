/** Contains some helpers to extend the focus utils in @chakra-ui/utils */

// Credit:
// Adapted from the good folks at @headlessui/vue

import { getAllFocusable } from "@chakra-ui/utils"

export enum Focus {
  /** Focus the first non-disabled element */
  First = 1 << 0,

  /** Focus the previous non-disabled element */
  Previous = 1 << 1,

  /** Focus the next non-disabled element */
  Next = 1 << 2,

  /** Focus the last non-disabled element */
  Last = 1 << 3,

  /** Wrap tab around */
  WrapAround = 1 << 4,

  /** Prevent scrolling the focusable elements into view */
  NoScroll = 1 << 5,
}

export enum FocusResult {
  Error,
  Overflow,
  Success,
  Underflow,
}

enum Direction {
  Previous = -1,
  Next = 1,
}

export function focusElement(element: HTMLElement | null) {
  element?.focus({ preventScroll: true })
}

export function focusIn(container: HTMLElement | HTMLElement[], focus: Focus) {
  let elements = Array.isArray(container)
    ? container.slice().sort((a, z) => {
        let position = a.compareDocumentPosition(z)

        if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1
        if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1
        return 0
      })
    : (() => {
        const focusables = getAllFocusable(container).filter(
          (el) => el !== container
        )
        return focusables
      })()
  let active = document.activeElement as HTMLElement

  let direction = (() => {
    if (focus & (Focus.First | Focus.Next)) return Direction.Next
    if (focus & (Focus.Previous | Focus.Last)) return Direction.Previous

    throw new Error(
      "Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last"
    )
  })()

  let startIndex = (() => {
    if (focus & Focus.First) return 0
    if (focus & Focus.Previous) return Math.max(0, elements.indexOf(active)) - 1
    if (focus & Focus.Next) return Math.max(0, elements.indexOf(active)) + 1
    if (focus & Focus.Last) return elements.length - 1

    throw new Error(
      "Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last"
    )
  })()

  let focusOptions = focus & Focus.NoScroll ? { preventScroll: true } : {}

  let offset = 0
  let total = elements.length
  let next = undefined
  do {
    // Guard against infinite loops
    if (offset >= total || offset + total <= 0) return FocusResult.Error

    let nextIdx = startIndex + offset

    if (focus & Focus.WrapAround) {
      nextIdx = (nextIdx + total) % total
    } else {
      if (nextIdx < 0) return FocusResult.Underflow
      if (nextIdx >= total) return FocusResult.Overflow
    }

    next = elements[nextIdx]

    // Try the focus the next element, might not work if it is "hidden" to the user.
    next?.focus(focusOptions)

    // Try the next one in line
    offset += direction
  } while (next !== document.activeElement)

  // This is a little weird, but let me try and explain: There are a few scenario's
  // in chrome for example where a focused `<a>` tag does not get the default focus
  // styles and sometimes they do. This highly depends on whether you started by
  // clicking or by using your keyboard. When you programmatically add focus `anchor.focus()`
  // then the active element (document.activeElement) is this anchor, which is expected.
  // However in that case the default focus styles are not applied *unless* you
  // also add this tabindex.
  if (!next.hasAttribute("tabindex")) next.setAttribute("tabindex", "0")

  return FocusResult.Success
}
