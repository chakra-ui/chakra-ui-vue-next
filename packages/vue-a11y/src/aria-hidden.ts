/**
 * Hey! Welcome to @chakra-ui/vue-next VueA11y
 *
 * Accessibility composables for chakra ui vue
 *
 * @see Docs     https://next.vue.chakra-ui.com/vue-a11y
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/master/packages/vue-a11y/src/vue-a11y/vue-a11y.ts
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 *
 * Credit: Adapted from `aria-hidden`
 * https://npmjs.com/aria-hidden
 */

export type Undo = () => void

const getDefaultParent = (originalTarget: Element | Element[]) => {
  if (typeof document === "undefined") {
    return null
  }

  const sampleTarget = Array.isArray(originalTarget)
    ? originalTarget[0]
    : originalTarget
  return sampleTarget.ownerDocument.body
}

let counterMap = new WeakMap<Element, number>()
let uncontrolledNodes = new WeakMap<Element, boolean>()
let markerMap: Record<string, WeakMap<Element, number>> = {}
let lockCount = 0

export const hideOthers = (
  originalTarget: Element | Element[],
  parentNode = getDefaultParent(originalTarget),
  markerName = "chakra-aria-hidden"
): Undo => {
  const targets = Array.isArray(originalTarget)
    ? originalTarget
    : [originalTarget]

  if (!markerMap[markerName]) {
    markerMap[markerName] = new WeakMap()
  }
  const markerCounter = markerMap[markerName]
  const hiddenNodes: Element[] = []

  const deep = (parent: Element | null) => {
    if (!parent || targets.indexOf(parent) >= 0) {
      return
    }

    Array.prototype.forEach.call(parent.children, (node: Element) => {
      if (
        targets.some((target) => "contains" in node && node.contains(target))
      ) {
        deep(node)
      } else {
        const attr = node.getAttribute("aria-hidden")
        const alreadyHidden = attr !== null && attr !== "false"
        const counterValue = (counterMap.get(node) || 0) + 1
        const markerValue = (markerCounter.get(node) || 0) + 1

        counterMap.set(node, counterValue)
        markerCounter.set(node, markerValue)
        hiddenNodes.push(node)

        if (counterValue === 1 && alreadyHidden) {
          uncontrolledNodes.set(node, true)
        }

        if (markerValue === 1) {
          node.setAttribute(markerName, "true")
        }

        if (!alreadyHidden) {
          node.setAttribute("aria-hidden", "true")
        }
      }
    })
  }

  deep(parentNode)

  lockCount++

  return () => {
    // const ariaHiddenNodes = hiddenNodes
    //   .map((target) => getSelector(target as HTMLElement))
    //   .map((selector) => document.querySelector(selector) as Element)

    hiddenNodes.forEach((node) => {
      const counterValue = (counterMap.get(node) as number) - 1
      const markerValue = (markerCounter.get(node) as number) - 1

      counterMap.set(node, counterValue)
      markerCounter.set(node, markerValue)

      if (!counterValue) {
        if (!uncontrolledNodes.has(node)) {
          node.removeAttribute("aria-hidden")
        }
        uncontrolledNodes.delete(node)
      }

      if (!markerValue) {
        node.removeAttribute(markerName)
      }
    })

    lockCount--
    if (!lockCount) {
      // clear
      counterMap = new WeakMap()
      counterMap = new WeakMap()
      uncontrolledNodes = new WeakMap()
      markerMap = {}
    }
  }
}
