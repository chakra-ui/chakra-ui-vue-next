import { h, defineComponent, PropType } from 'vue'
import { chakra, DOMElements } from '@chakra-ui/vue-system'

const CFlex = defineComponent({
  props: {
    as: {
      type: [Object, String] as PropType<DOMElements>,
      default: 'div',
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        chakra(props.as),
        {
          __css: {
            display: 'flex',
            flexDirection: 'row',
          },
          ...attrs,
        },
        slots
      )
  },
})

export default CFlex
