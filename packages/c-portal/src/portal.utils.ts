import { isBrowser } from '@chakra-ui/vue-utils'

let __portal_id__: number = 0

export const createPortalTarget = () => {
  const portalId = `chakra__portal__${__portal_id__}`
  let target = document.getElementById(portalId)
  if (!target) {
    target = document.createElement('div')
    target.id = `chakra__portal__${__portal_id__++}`
    document.body.appendChild(target)
    return target
  }

  return target
}

export const ensureTarget = (selector: string) => {
  if (!isBrowser) {
    console.warn(
      `chakra-ui:portal: The CPortal component can only be used in the document`
    )
  }

  if (!document.querySelector(selector)) {
    console.warn(
      `chakra-ui:portal: the portal target "${selector}" cound not be found in the document. Portal children may not be rendered`
    )
  }
}
