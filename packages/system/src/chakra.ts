import { computed, DefineComponent, defineComponent, h, PropType } from 'vue'
import {
  css,
  ResponsiveValue,
  SystemProps,
  SystemStyleObject,
} from '@chakra-ui/styled-system'
import { cx, memoizedGet as get, objectAssign } from '@chakra-ui/vue-utils'
import { css as _css, CSSObject } from '@emotion/css'
import { extractStyleAttrs } from './system.attrs'
import { domElements, DOMElements } from './system.utils'
import { useTheme } from './composables/use-chakra'

interface StyleResolverProps extends SystemProps {
  __css?: SystemStyleObject
  sx?: SystemStyleObject
  css?: CSSObject
  noOfLines?: ResponsiveValue<number>
  isTruncated?: boolean
  layerStyle?: string
  textStyle?: string
  apply?: ResponsiveValue<string>
  componentName?: String
}

interface ChakraFactoryOptions extends StyleResolverProps {
  label?: string
  baseStyle?: SystemStyleObject
}

const chakraProps = {
  __css: Object as PropType<StyleResolverProps['__css']>,
  sx: Object as PropType<StyleResolverProps['sx']>,
  css: Object as PropType<StyleResolverProps['css']>,
  noOfLines: Number as PropType<StyleResolverProps['noOfLines']>,
  baseStyle: Object as PropType<ChakraFactoryOptions['baseStyle']>,
  isTruncated: Boolean as PropType<StyleResolverProps['isTruncated']>,
  layerStyle: String as PropType<StyleResolverProps['layerStyle']>,
  textStyle: String as PropType<StyleResolverProps['textStyle']>,
  apply: String as PropType<StyleResolverProps['apply']>,
}

export type ChakraBaseComponentProps = typeof chakraProps

/**
 * Creates a Chakra UI Vue component
 * @param tag Tag
 * @param componentName Component name
 */
// @ts-expect-error
export const chakra: IChakraFactory = (
  tag: DOMElements,
  options?: ChakraFactoryOptions
): DefineComponent => {
  return defineComponent({
    inheritAttrs: false,
    props: chakraProps,
    setup(props, { slots, attrs }) {
      const theme = useTheme()
      // Separate component style attributes from raw HTML attributes

      const layerStyle = computed(() => props.layerStyle || options?.layerStyle)
      const textStyle = computed(() => props.textStyle || options?.textStyle)
      const baseStyle = computed(() => props.baseStyle || options?.baseStyle)
      const noOfLines = computed(() => props.noOfLines || options?.noOfLines)
      const isTruncated = computed(
        () => props.isTruncated || options?.isTruncated
      )
      const __css = computed(() => props.__css || options?.__css)
      const sx = computed(() => props.sx || options?.sx)
      const apply = computed(() => props.apply || options?.apply)

      const { class: inheritedClass, ...rest } = attrs
      const _layerStyle = get(theme, `layerStyles.${layerStyle.value}`, {})
      const _textStyle = get(theme, `textStyles.${textStyle.value}`, {})
      const { styles, attrs: elementAttributes } = extractStyleAttrs(rest)

      let truncateStyle: any = {}
      if (noOfLines.value != null) {
        truncateStyle = {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: noOfLines.value,
        }
      } else if (isTruncated.value) {
        truncateStyle = {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }
      }

      const finalStyles = objectAssign(
        {},
        __css.value,
        baseStyle.value,
        { apply: apply.value },
        _layerStyle,
        _textStyle,
        truncateStyle,
        styles,
        sx.value
      )

      const className = _css(css(finalStyles)({ theme }))
      const _componentName = options?.label ? `chakra-${options?.label}` : ''

      return () =>
        h(
          tag,
          {
            class: cx(inheritedClass, _componentName, className),
            ...props,
            ...elementAttributes,
          },
          slots
        )
    },
  })
}

type IChakraFactory = {
  [key in DOMElements]: DefineComponent
} & {
  (tag: DOMElements, componentName?: string): DefineComponent
}

domElements.forEach((tag) => {
  chakra[tag] = chakra(tag)
})

export { domElements }
