import { h, defineComponent, PropType, computed } from 'vue'
import {
  chakra,
  DOMElements,
  HTMLChakraProps,
  ThemingProps,
  useStyleConfig,
} from '@chakra-ui/vue-system'
import { filterUndefined } from '@chakra-ui/utils'
import { vueThemingProps } from '@chakra-ui/vue-utils'

export interface BadgeProps
  extends HTMLChakraProps<'span'>,
    ThemingProps<'Badge'> {}

/**
 * Vue component used to display notifications, messages, or
 * statuses in different shapes and sizes.
 *
 * @see Docs https://vue.chakra-ui.com/docs/data-display/badge
 */
export const CBadge = defineComponent({
  props: {
    as: {
      type: [Object, String] as PropType<DOMElements>,
      default: 'div',
    },
    ...vueThemingProps,
  },
  setup(props, { slots, attrs }) {
    const themingProps = computed<ThemingProps>(() =>
      filterUndefined({
        colorScheme: props.colorScheme,
        variant: props.variant,
        size: props.size,
        styleConfig: props.styleConfig,
      })
    )
    const styles = useStyleConfig('Badge', themingProps.value)
    return () => {
      return h(
        chakra(props.as, { label: 'badge' }),
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
    }
  },
})
