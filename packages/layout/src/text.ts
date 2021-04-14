import { filterUndefined } from '@chakra-ui/utils'
import {
  chakra,
  HTMLChakraProps,
  ThemingProps,
  SystemProps,
  useStyleConfig,
  DOMElements,
} from '@chakra-ui/vue-system'
import { SNAO, vueThemingProps } from '@chakra-ui/vue-utils'
import { computed, defineComponent, h, PropType } from '@vue/runtime-core'

export interface TextProps extends HTMLChakraProps<'p'>, ThemingProps<'Text'> {
  /**
   * The CSS `text-align` property
   * @type SystemProps["textAlign"]
   */
  align?: SystemProps['textAlign']
  /**
   * The CSS `text-decoration` property
   * @type SystemProps["textDecoration"]
   */
  decoration?: SystemProps['textDecoration']
  /**
   * The CSS `text-transform` property
   * @type SystemProps["textTransform"]
   */
  casing?: SystemProps['textTransform']
}

/**
 * Used to render texts or paragraphs.
 *
 * @see Docs https://vue.chakra-ui.com/docs/typography/text
 */
export const CText = defineComponent({
  props: {
    as: {
      type: [Object, String] as PropType<DOMElements>,
      default: 'p',
    },
    align: SNAO as PropType<TextProps['textAlign']>,
    decoration: SNAO as PropType<TextProps['textDecoration']>,
    casing: SNAO as PropType<TextProps['textTransform']>,
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
    const styles = useStyleConfig('Text', themingProps.value)

    const aliasedProps = computed(() =>
      filterUndefined({
        textAlign: props.align,
        textDecoration: props.decoration,
        textTransform: props.casing,
      })
    )

    return () => {
      return h(
        chakra(props.as, {
          label: 'text',
          ...aliasedProps.value,
          __css: styles.value,
          ...attrs,
        }),
        {},
        slots
      )
    }
  },
})
