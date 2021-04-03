import { h, defineComponent, PropType, computed } from 'vue'
import {
  chakra,
  DOMElements,
  ThemingProps,
  useStyleConfig,
} from '@chakra-ui/vue-system'
import { filterUndefined } from '@chakra-ui/utils'

const CCode = defineComponent({
  props: {
    as: {
      type: [Object, String] as PropType<DOMElements>,
      default: 'div',
    },
    colorScheme: String as PropType<ThemingProps['colorScheme']>,
    styleConfig: String as PropType<ThemingProps['styleConfig']>,
  },
  setup(props, { slots, attrs }) {
    return () => {
      const themingProps = computed<ThemingProps>(() =>
        filterUndefined({
          colorScheme: props.colorScheme,
          styleConfig: props.styleConfig,
        })
      )
      const styles = useStyleConfig('Code', themingProps.value)

      return h(
        chakra(props.as),
        {
          __css: {
            display: 'inline-block',
            verticalAlign: 'middle',
            fontSize: 'sm',
            px: '0.2em',
            fontFamily: 'mono',
            rounded: 'sm',
            ...styles.value,
          },
          ...attrs,
        },
        slots
      )
    }
  },
})

export default CCode
