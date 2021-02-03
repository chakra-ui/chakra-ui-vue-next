import { h, defineComponent, PropType } from 'vue'
import { chakra, DOMElements } from '@chakra-ui/system-vue'

const CButton = defineComponent({
  name: 'CButton',
  props: {
    as: {
      type: String as PropType<DOMElements>,
      default: 'button',
    },
  },
  setup(_, { attrs, slots }) {
    return () =>
      h(
        chakra('button', 'button'),
        {
          ...attrs,
        },
        slots
      )
  },
})

export default CButton
