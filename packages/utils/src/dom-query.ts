interface IChildNode extends ChildNode {
  item?: any
  localName?: string
}

/**
 * Computes the selector of an element from the DOM
 *
 * The motivation for this method is to use it in the
 * resolve the issue where DOM nodes seem to be
 * removed from the DOM during patching for reactivity.
 *
 * This was breaking the behaviour of the `useFocusLock`
 * hook.
 */
export function getSelector(node: HTMLElement) {
  const id = node.getAttribute('id')

  if (id) return `#${id}`

  let path = ''

  while (node) {
    let name = node.localName
    const parent = node.parentNode

    if (!parent) {
      path = `${name} > ${path}`
      continue
    }

    const idAttr = node.getAttribute('id')
    if (idAttr) {
      path = '#' + node.getAttribute('id') + ' > ' + path
      path = `#${idAttr} > ${path}`
      break
    }

    const sameTagSiblings: any = []
    let children: NodeListOf<IChildNode> = parent.childNodes
    // @ts-ignore
    children = Array.prototype.slice.call(children)

    children.forEach((child) => {
      if (child.localName === name) {
        sameTagSiblings.push(child)
      }
    })

    // if there are more than one children
    // of that type use nth-of-type
    if (sameTagSiblings.length > 1) {
      const index = sameTagSiblings.indexOf(node)
      name += ':nth-of-type(' + (index + 1) + ')'
    }

    if (path) {
      path = name + ' > ' + path
    } else {
      path = name
    }

    node = parent as HTMLElement
  }

  return path
}
