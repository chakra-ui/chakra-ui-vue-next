import { h, defineComponent, PropType, computed } from 'vue'
import { chakra, DOMElements } from '@chakra-ui/vue-system'

const CFlex = defineComponent({
  props: {
    as: {
      type: [Object, String] as PropType<DOMElements>,
      default: 'div',
    },
    row: {
      type: Boolean,
      default: false,
    },
    column: {
      type: Boolean,
      default: false,
    },
    reverse: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots, attrs }) {
    const flexDirection = computed<String>(() => {
      if (props.row && !props.reverse) return 'row'
      if (props.row && props.reverse) return 'row-reverse'
      if (props.column && !props.reverse) return 'column'
      if (props.column && props.reverse) return 'column-reverse'
      if (props.reverse) return 'row-reverse'
      return 'row'
    })
    return () =>
      h(
        chakra(props.as),
        {
          __css: {
            display: 'flex',
            flexDirection: flexDirection.value || 'row',
          },
          ...attrs,
        },
        slots
      )
  },
})

export default CFlex
