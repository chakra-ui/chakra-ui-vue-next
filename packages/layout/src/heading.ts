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

export interface HeadingProps
  extends HTMLChakraProps<'h2'>,
    ThemingProps<'Heading'> {}

export const CHeading = defineComponent({
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
    const styles = useStyleConfig('Heading', themingProps.value)
    // convert attrs like `is-truncated` to `isTruncated`
    const styleAttrs = extractStyleAttrs(attrs).styles as any

    return () => {
      return h(
        chakra(props.as, {
          label: 'heading',
          ...styleAttrs,
          __css: styles.value,
        }),
        {},
        slots
      )
    }
  },
})
