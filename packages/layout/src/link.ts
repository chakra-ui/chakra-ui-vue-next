import { vueThemingProps } from '@chakra-ui/vue-utils'
import { HTMLChakraProps } from '@chakra-ui/vue-system'
import { h, defineComponent, PropType, computed } from 'vue'
import {
  chakra,
  DOMElements,
  ThemingProps,
  useStyleConfig,
} from '@chakra-ui/vue-system'
import { filterUndefined } from '@chakra-ui/utils'

export interface LinkProps extends HTMLChakraProps<'a'>, ThemingProps<'Link'> {
  /**
   *  If `true`, the link will open in new tab
   */
  isExternal?: boolean
}

/**
 * Links are accessible elements used primarily for navigation.
 *
 * It integrates well with other routing libraries like
 * Vue Router and Nuxt.js Link.
 *
 * @example
 *
 * ```vue
 * <CLink as="router-link" to="/home">Home</CLink>
 * ```
 *
 * @see Docs https://vue.chakra-ui.com/docs/layout/link
 */
export const CLink = defineComponent({
  props: {
    as: {
      type: [Object, String] as PropType<DOMElements>,
      default: 'a',
    },
    isExternal: Boolean as PropType<LinkProps['isExternal']>,
    ...vueThemingProps,
  },
  setup(props, { slots, attrs }) {
    return () => {
      const themingProps = computed<ThemingProps>(() =>
        filterUndefined({
          colorScheme: props.colorScheme,
          variant: props.variant,
          size: props.size,
          styleConfig: props.styleConfig,
        })
      )
      const styles = useStyleConfig('Link', themingProps.value)

      return h(
        chakra(props.as, { label: 'link' }),
        {
          target: props.isExternal ? '_blank' : undefined,
          rel: props.isExternal ? 'noopener noreferrer' : undefined,
          __css: styles.value,
          ...attrs,
        },
        slots
      )
    }
  },
})
