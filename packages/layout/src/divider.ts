import { h, defineComponent, PropType, computed } from 'vue'
import {
  chakra,
  ThemingProps,
  useStyleConfig,
  HTMLChakraProps,
} from '@chakra-ui/vue-system'
import { filterUndefined } from '@chakra-ui/utils'
import { vueThemingProps } from '@chakra-ui/vue-utils'

export interface DividerProps
  extends HTMLChakraProps<'div'>,
    ThemingProps<'Container'> {
  orientation?: 'horizontal' | 'vertical'
}

/**
 * Layout component used to visually separate content in a list or group.
 * It display a thin horizontal or vertical line, and renders a `hr` tag.
 *
 * @see Docs https://vue.chakra-ui.com/docs/data-display/divider
 */
export const CDivider = defineComponent({
  props: {
    orientation: {
      type: [String] as PropType<DividerProps['orientation']>,
      default: 'horizontal',
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
        orientation: props.orientation,
      })
    )

    const styles = useStyleConfig('Divider', themingProps.value)

    const {
      borderLeftWidth,
      borderBottomWidth,
      borderTopWidth,
      borderRightWidth,
      borderWidth,
      borderStyle,
      borderColor,
      ...stylesRest
    } = styles.value

    const dividerStyle = computed(() => {
      const dividerStyles = {
        vertical: {
          borderLeftWidth:
            borderLeftWidth || borderRightWidth || borderWidth || '1px',
          height: '100%',
        },
        horizontal: {
          borderBottomWidth:
            borderBottomWidth || borderTopWidth || borderWidth || '1px',
          width: '100%',
        },
      }
      return dividerStyles[props.orientation!]
    })

    return () => {
      return h(
        chakra('hr', {
          label: 'divider',
          'aria-orientation': props.orientation,
          __css: {
            ...stylesRest,
            border: '0',

            borderColor,
            borderStyle,
            ...dividerStyle.value,
          },
        }),
        {
          ...attrs,
        },
        slots
      )
    }
  },
})
