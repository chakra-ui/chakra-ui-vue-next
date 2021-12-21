import { isBrowser, warn, __DEV__ } from "@chakra-ui/utils"

let __portal_id__: number = 0

export const createPortalTarget = (name: string = "default") => {
  const portalId = `chakra__${name}__portal__${__portal_id__}`
  let target = document.getElementById(portalId)
  if (!target) {
    target = document.createElement("div")
    target.id = `chakra__${name}__portal__${__portal_id__++}`
    /**
     * @todo
     *
     * This may not be the most effective way to hide
     * nodes that are still visible during transitions.
     *
     * So this is a bit of a hack to ensure that teh element
     * doesn't cause the page to jank
     */
    target.style.width = "0"
    target.style.height = "0"
    target.style.overflow = "hidden"
    document.body.appendChild(target)
    return target
  }

  return target
}

export const ensureTarget = (selector: string) => {
  if (!isBrowser) {
    console.warn(
      `[chakra-ui:portal]: The CPortal component can only be used in the document`
    )
  }

  if (!document.querySelector(selector)) {
    console.warn(
      `[chakra-ui:portal]: the portal target "${selector}" cound not be found in the document. Portal children may not be rendered`
    )
  }
}
/** Unmounts portal target when portal is unmounted */
export function unmountTarget(targetSelector: string) {
  const targetNode = document.querySelector(targetSelector)
  try {
    targetNode?.parentElement?.removeChild(targetNode)
  } catch {
    warn({
      condition: !targetNode,
      message: "Unable to unmount portal target instance",
    })
  }
}
