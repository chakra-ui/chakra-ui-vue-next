import { chakra, HTMLChakraProps } from '@chakra-ui/vue-system'
import { defineComponent, h } from '@vue/runtime-core'

export interface SpacerProps extends HTMLChakraProps<'div'> {}

/**
 * A flexible flex spacer that expands along the major axis of its containing flex layout.
 * It renders a `div` by default, and takes up any available space.
 *
 * @see Docs https://chakra-ui.com/docs/layout/flex#using-the-spacer
 */
export const CSpacer = defineComponent({
  setup(_, { slots }) {
    return () => {
      return h(
        chakra('div', {
          label: 'spacer',
          baseStyle: {
            flex: 1,
            justifySelf: 'stretch',
            alignSelf: 'stretch',
          },
        }),
        {},
        slots
      )
    }
  },
})
