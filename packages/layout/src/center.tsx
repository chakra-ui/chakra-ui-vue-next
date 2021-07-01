import { defineComponent, h, PropType } from 'vue'
import {
  chakra,
  ComponentWithProps,
  DeepPartial,
  DOMElements,
  HTMLChakraProps,
} from '@chakra-ui/vue-system'

export interface CCenterProps extends HTMLChakraProps<'div'> {}

/**
 * Vue component used to horizontally and vertically center its child.
 * It uses the popular `display: flex` centering technique.
 *
 * @see Docs https://vue.chakra-ui.com/docs/layout/center
 */
export const CCenter: ComponentWithProps<
  DeepPartial<CCenterProps>
> = defineComponent({
  name: 'CCenter',
  props: {
    as: {
      type: [String, Object] as PropType<DOMElements>,
      default: 'div',
    },
  },
  setup(props, { slots, attrs }) {
    return () => {
      return (
        <chakra.div
          __label="center"
          __css={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          {...props}
          {...attrs}
        >
          {slots}
        </chakra.div>
      )
    }
  },
})