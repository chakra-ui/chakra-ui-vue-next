import { vueThemingProps } from '@chakra-ui/vue-utils'
import {
  chakra,
  DOMElements,
  ThemingProps,
  useStyleConfig,
  HTMLChakraProps,
  extractStyleAttrs,
} from '@chakra-ui/vue-system'
import { computed, defineComponent, h, PropType } from '@vue/runtime-core'
import { filterUndefined } from '@chakra-ui/utils'

export interface KbdProps extends HTMLChakraProps<'kbd'>, ThemingProps<'Kbd'> {}

/**
 * Semantic component to render a keyboard shortcut
 * within an application.
 *
 * @example
 *
 * ```jsx
 * <Kbd>⌘ + T</Kbd>
 * ```
 *
 * @see Docs https://chakra-ui.com/docs/data-display/kbd
 */
export const CKbd = defineComponent({
  props: {
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
    const styles = useStyleConfig('Kbd', themingProps.value)

    return () => {
      return h(
        chakra('kbd', {
          label: 'kbd',
          ...attrs,
          __css: {
            fontFamily: 'mono',
            ...styles.value,
          },
        }),
        {},
        slots
      )
    }
  },
})
