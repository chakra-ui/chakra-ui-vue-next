import { defineComponent, h } from 'vue'
import { css } from '@chakra-ui/styled-system'
import theme from '@chakra-ui/vue-theme'
import { css as _css, cx } from '@emotion/css'
import { extractStyleAttrs } from './system.attrs'
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
      const { class: inheritedClass, ...rest } = attrs
      const { styles, attrs: _attrs } = extractStyleAttrs(rest)

      console.log(styles, attrs)
      const className = _css(css(styles)({ theme }))
      return () =>
        h(
          tag,
          {
            class: cx(inheritedClass as string, className),
            ...props,
            ..._attrs,
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
