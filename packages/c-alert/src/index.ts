import { h, defineComponent, PropType } from 'vue'
import { chakra } from '@chakra-ui/system-vue'
import { DOMElements } from '@chakra-ui/system-vue/dist/types/system.utils'

const CAlert = defineComponent({
  name: 'CAlert',
  props: {
    as: {
      type: [String, Object] as PropType<DOMElements>,
      default: 'div',
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        chakra(props.as, 'alert'),
        {
          ...attrs,
          role: 'alert',
        },
        slots
      )
  },
})

export default CAlert
