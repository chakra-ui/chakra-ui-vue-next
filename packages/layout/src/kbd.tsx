import { vueThemingProps } from '@chakra-ui/vue-utils'
import {
  chakra,
  DOMElements,
  ThemingProps,
  useStyleConfig,
  HTMLChakraProps,
  extractStyleAttrs,
  ComponentWithProps,
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
 * <CKbd>⌘ + T</CKbd>
 * ```
 *
 * @see Docs https://vue.chakra-ui.com/docs/data-display/kbd
 */
export const CKbd: ComponentWithProps<KbdProps> = defineComponent({
  name: 'CKbd',
  props: {
    as: {
      type: [String, Object] as PropType<DOMElements>,
      default: 'h2',
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
    const styles = useStyleConfig('Kbd', themingProps.value)

    return () => {
      return (
        <chakra.kbd label="kdb" __css={{ fontFamily: 'mono', ...styles.value }} {...attrs}>
          {slots?.default?.()}
        </chakra.kbd>
      )
    }
  },
})
