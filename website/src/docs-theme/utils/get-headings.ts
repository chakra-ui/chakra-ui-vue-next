import { isVNode, Comment, Slots } from "vue"
import { getValidChildren } from "@chakra-ui/vue-utils"
import { isArray, isObject, isString } from "@chakra-ui/utils"

export interface Heading {
  level: "h2" | "h3"
  text: string
  id: string
}

function isHeading(child: any) {
  // mdxType
  if (child.props?.as) {
    return new Set(["h2", "h3"]).has(child.props.as)
  }
  return false
}

export function getHeadings(children: Slots) {
  const validChildren = getValidChildren(children)[0]?.children
  if (isString(validChildren)) return []
  if (!isArray(validChildren)) return []
  return validChildren
    .filter((child) => {
      if (!isObject(child)) return false
      if (isArray(child)) return false
      const valid = isVNode(child) && isHeading(child)
      return valid
    })
    .map((child) => {
      if (!isObject(child)) return false
      if (isArray(child)) return false
      const validChildren = getValidChildren(child.children as Slots)
      const textChildren = validChildren.filter((node) => node.type !== Comment)
      const text = textChildren[0]?.children

      return {
        level: child.props?.as,
        id: child.props?.id,
        text,
      }
    })
}
