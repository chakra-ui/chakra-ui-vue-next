import { chakra, DOMElements } from '@chakra-ui/vue-system'
import { defineComponent, h, PropType } from '@vue/runtime-core'

/**
 * Vue component used to horizontally and vertically center its child.
 * It uses the popular `display: flex` centering technique.
 *
 * @see Docs https://vue.chakra-ui.com/docs/layout/center
 */
export const CCenter = defineComponent({
  props: {
    as: {
      type: [String, Object] as PropType<DOMElements>,
      default: 'div',
    },
  },
  setup(props, { slots, attrs }) {
    return () => {
      return h(
        chakra(props.as, {
          label: 'center',
          __css: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }),
        {
          ...attrs,
        },
        slots
      )
    }
  },
})
