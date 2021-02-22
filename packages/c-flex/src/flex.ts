import { h, defineComponent, PropType, computed } from 'vue'
import { chakra, DOMElements, ThemingProps } from '@chakra-ui/vue-system'

export type FlexProps = 'align' | 'justify' | 'wrap' | 'direction' | 'size'

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
    align: String as PropType<FlexProps>,
    justify: String as PropType<FlexProps>,
    wrap: String as PropType<FlexProps>,
    direction: String as PropType<FlexProps>,
    size: String as PropType<FlexProps>,
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
            flexDirection: props.direction || flexDirection.value,
            alignItems: props.align,
            justifyContent: props.justify,
            flexWrap: props.wrap,
            h: props.size,
            w: props.size,
          },
          ...attrs,
        },
        slots
      )
  },
})

export default CFlex
