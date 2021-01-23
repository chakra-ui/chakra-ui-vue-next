import { defineComponent, h } from 'vue'
import { domElements, DOMElements } from './system.utils'

/**
 * Creates a Chakra UI Vue component
 * @param tag Tag
 * @param componentProps Component Props
 */
// @ts-ignore
export const chakra: IChakraFactory = (
  tag: DOMElements,
  componentProps = {}
): any => {
  return defineComponent({
    inheritAttrs: false,
    props: componentProps,
    setup(props, { slots, attrs }) {
      return () =>
        h(
          tag,
          {
            ...props,
            ...attrs,
          },
          slots
        )
    },
  })
}

type IChakraFactory = {
  [key in DOMElements]: any
} & {
  (tag: DOMElements): any
}

domElements.forEach((tag) => {
  chakra[tag] = chakra(tag)
})
