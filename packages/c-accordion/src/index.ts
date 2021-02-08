import { h, defineComponent, PropType } from 'vue'
import { chakra, DOMElements } from '@chakra-ui/vue-system'

const CAccordion = defineComponent({
  props: {
    as: {
      type: [String] as PropType<DOMElements>,
      default: 'div',
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(chakra(props.as, { label: 'accordion' }), { ...attrs }, slots)
  },
})

export default CAccordion
