import { h, defineComponent, PropType, computed } from 'vue'
import {
  chakra,
  DOMElements,
  ThemingProps,
  useStyleConfig,
} from '@chakra-ui/vue-system'
import { filterUndefined } from '@chakra-ui/vue-utils'

const CBadge = defineComponent({
  props: {
    as: {
      type: [Object, String] as PropType<DOMElements>,
      default: 'div',
    },
    colorScheme: String as PropType<ThemingProps['colorScheme']>,
    variant: String as PropType<ThemingProps['variant']>,
    size: String as PropType<ThemingProps['size']>,
    styleConfig: String as PropType<ThemingProps['styleConfig']>,
  },
  setup(props, { slots, attrs }) {
    const themingProps = computed(() =>
      filterUndefined<ThemingProps>({
        colorScheme: props.colorScheme,
        variant: props.variant,
        size: props.size,
        styleConfig: props.styleConfig,
      })
    )
    const styles = useStyleConfig('Badge', themingProps.value)
    return () =>
      h(
        chakra(props.as),
        {
          __css: {
            display: 'inline-block',
            whiteSpace: 'nowrap',
            verticalAlign: 'middle',
            ...styles.value,
          },
          ...attrs,
        },
        slots
      )
  },
})

export default CBadge
