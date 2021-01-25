import { DefineComponent, defineComponent, h } from 'vue'
import { css } from '@chakra-ui/styled-system'
import theme from '@chakra-ui/vue-theme'
import { cx } from '@chakra-ui/vue-utils'
import { css as _css } from '@emotion/css'
import { extractStyleAttrs } from './system.attrs'
import { domElements, DOMElements } from './system.utils'

/**
 * Creates a Chakra UI Vue component
 * @param tag Tag
 * @param componentName Component name
 */
// @ts-expect-error
export const chakra: IChakraFactory = (
  tag: DOMElements,
  componentName?: string
): DefineComponent => {
  return defineComponent({
    inheritAttrs: false,
    setup(props, { slots, attrs }) {
      // Separate component style attributes from raw HTML attributes
      const { class: inheritedClass, ...rest } = attrs
      const { styles, attrs: _attrs } = extractStyleAttrs(rest)
      const className = _css(css(styles)({ theme }))

      const _componentName = componentName ? `chakra-${componentName}` : ''

      return () =>
        h(
          tag,
          {
            class: cx(inheritedClass, _componentName, className),
            ...props,
            ..._attrs,
          },
          slots
        )
    },
  })
}

type IChakraFactory = {
  [key in DOMElements]: DefineComponent
} & {
  (tag: DOMElements, componentName?: string): DefineComponent
}

domElements.forEach((tag) => {
  chakra[tag] = chakra(tag)
})

export { domElements }
