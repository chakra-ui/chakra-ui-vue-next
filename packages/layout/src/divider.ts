import { h, defineComponent, PropType, computed } from 'vue'
import {
  chakra,
  ThemingProps,
  useStyleConfig,
  HTMLChakraProps,
  extractStyleAttrs,
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
    return () => {
      const themingProps = computed<ThemingProps>(() =>
        filterUndefined({
          colorScheme: props.colorScheme,
          styleConfig: props.styleConfig,
          orientation: props.orientation,
        })
      )
      // to support border attrs like borderBottomWidth etc
      const styleAttrs = extractStyleAttrs(attrs).styles

      const allProps = {
        ...themingProps.value,
        ...styleAttrs,
      }

      const styles = useStyleConfig('Divider', allProps as DividerProps)
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

      return h(
        chakra('hr', { label: 'divider' }),
        {
          'aria-orientation': props.orientation,
          ...styles.value,
          __css: {
            ...stylesRest,
            border: '0',

            borderColor,
            borderStyle,
            ...dividerStyles[props.orientation!],
          },
          ...attrs,
        },
        slots
      )
    }
  },
})
