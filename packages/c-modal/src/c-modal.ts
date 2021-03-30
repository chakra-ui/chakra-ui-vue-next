import { h, defineComponent, PropType } from 'vue'
import { chakra, DOMElements } from '@chakra-ui/vue-system'

export const CModal = defineComponent({
  props: {
    as: {
      type: [Object, String] as PropType<DOMElements>,
      default: 'div',
    },
  },
  setup(props, { slots, attrs }) {
    return () => h(chakra(props.as), { ...attrs }, slots)
  },
})
