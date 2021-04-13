import {
  Component,
  computed,
  ConcreteComponent,
  DefineComponent,
  defineComponent,
  h,
  HTMLAttributes,
  PropType,
  resolveComponent,
} from 'vue'
import {
  css,
  ResponsiveValue,
  SystemProps,
  SystemStyleObject,
} from '@chakra-ui/styled-system'
import { cx, isFunction, isObject, memoizedGet as get } from '@chakra-ui/utils'
import { css as _css, CSSObject } from '@emotion/css'
import { extractStyleAttrs } from './system.attrs'
import { domElements, DOMElements } from './system.utils'
import { useTheme } from './composables/use-chakra'
import { SNAO } from '@chakra-ui/vue-utils'

interface StyleResolverProps extends SystemProps {
  __css?: SystemStyleObject
  sx?: SystemStyleObject
  css?: CSSObject
  noOfLines?: ResponsiveValue<number>
  isTruncated?: boolean
  layerStyle?: ResponsiveValue<string>
  textStyle?: ResponsiveValue<string>
  apply?: ResponsiveValue<string>
  componentName?: String
  label?: string
  baseStyle?: SystemStyleObject
  /**
   * User provided styles from component/chakra API
   */
  styles?: SystemStyleObject
}

interface StyleResolverOptions extends StyleResolverProps {
  truncateStyle?: CSSObject
  theme?: any
}

interface ChakraFactoryOptions extends StyleResolverProps {}

const chakraProps = {
  __css: Object as PropType<StyleResolverProps['__css']>,
  sx: Object as PropType<StyleResolverProps['sx']>,
  css: Object as PropType<StyleResolverProps['css']>,
  noOfLines: SNAO as PropType<StyleResolverProps['noOfLines']>,
  baseStyle: Object as PropType<StyleResolverProps['baseStyle']>,
  isTruncated: Boolean as PropType<StyleResolverProps['isTruncated']>,
  layerStyle: String as PropType<StyleResolverProps['layerStyle']>,
  textStyle: String as PropType<StyleResolverProps['textStyle']>,
  apply: String as PropType<StyleResolverProps['apply']>,
  label: String as PropType<StyleResolverOptions['label']>,
}

export type ChakraBaseComponentProps = typeof chakraProps

/**
 * Chakra factory serves as an object of chakra enabled HTML elements,
 * and also a function that can be used to enable custom component receive chakra's style props.
 * @param tag Tag or Component
 * @param options resolver options
 * 
 * How does it work?
 *
 * 1. Components returned from the chakra factory can be styled after consuming them
 *    @example
 *    ```js
 *    const Form = chakra('form') // returns a VNode you can use in the template directly
 *    ```
 * 
 * 2. Chakra components can directly be styled upon creation using the options object of type `StyleResolverProps`
 *    This resolves style object for component styles defined in the theme.
 * 
 *    Styling components using the chakra factory function can be done using the following keys from the theme:
 *    - `baseStyle`
 *    - `layerStyle`
 *    - `textStyle`
 * 
 *    @example
 *    ```js
 *    const MyCustomButton = chakra('button', {
 *     baseStyle: {
         bg: 'papayawhip,
         color: 'red.500,
         px: 4,
         py: 3
       }
 *    })
 *    ```
 *    ```html
 *    <my-custom-button>Hello Papaya Button</my-custom-button>
 *    ```
 * 
 *    See more about the style resolution in the `resolveStyles` function.
 * 
 * 3. Chakra components created and styled using the `chakra` factory can be overriden in the template by applying
 *    style properties directly
 * 
 *    @example
 *    ```html
 *    <my-custom-button bg="blue.400">
 *      Papaya button goes blue
 *    </my-custom-button>
 *    ```
 */
// @ts-expect-error
export const chakra: IChakraFactory = (tag, options = {}): DefineComponent => {
  return defineComponent({
    name: `chakra-factory-${String(tag)}`,
    inheritAttrs: false,
    props: chakraProps,
    setup(props, { slots, attrs }) {
      return () => {
        const { class: inheritedClass, ...rest } = attrs
        const {
          layerStyle,
          baseStyle,
          textStyle,
          noOfLines,
          isTruncated,
          __css,
          css,
          sx,
          apply,
          label,
          ...otherStyles
        } = options

        // Separate component style attributes from raw HTML attributes
        const { styles, attrs: elementAttributes } = extractStyleAttrs<
          any,
          HTMLAttributes
        >({
          ...otherStyles,
          // Prioritize user provided styles
          ...rest,
        })

        const theme = useTheme()

        const layerStyle$ = computed(
          () => props.layerStyle || options?.layerStyle
        )
        const textStyle$ = computed(() => props.textStyle || options?.textStyle)
        const baseStyle$ = computed(() => props.baseStyle || options?.baseStyle)
        const noOfLines$ = computed(() => props.noOfLines || options?.noOfLines)
        const isTruncated$ = computed(
          () => props.isTruncated || options?.isTruncated
        )
        const __css$ = computed(() => props.__css || options?.__css)
        const css$ = computed(() => props.css || options?.css)
        const sx$ = computed(() => props.sx || options?.sx)
        const apply$ = computed(() => props.apply || options?.apply)

        const resolvedComponentStyles = resolveStyles({
          __css: __css$.value,
          baseStyle: baseStyle$.value,
          apply: apply$.value,
          layerStyle: layerStyle$.value,
          noOfLines: noOfLines$.value,
          isTruncated: isTruncated$.value,
          textStyle: textStyle$.value,
          sx: sx$.value,
          css: css$.value,
          ...(styles as SystemProps),
          theme,
        })

        const className = _css(resolvedComponentStyles)
        const _componentName = label ? `chakra-${label}` : ''

        let componentOrTag = tag

        // if tag is not a dom element like as="div" and an object (vue component as an object) like v-bind:as="RouterLink"
        if (
          !isObject(componentOrTag) &&
          !domElements.includes(componentOrTag as any)
        ) {
          // it's a string like as="router-link"
          componentOrTag = resolveComponent(componentOrTag)
        }

        return h(
          componentOrTag as any,
          {
            class: cx(inheritedClass, _componentName, className),
            ...elementAttributes,
          },
          slots
        )
      }
    },
  })
}

export const resolveStyles = (
  resolvers = {} as StyleResolverOptions
): CSSObject => {
  const {
    layerStyle,
    baseStyle,
    textStyle,
    noOfLines,
    isTruncated,
    __css,
    css: cssProp,
    sx,
    apply,
    theme,
    ...otherStyles
  } = resolvers

  const _layerStyle = get(theme as object, `layerStyles.${layerStyle}`, {})
  const _textStyle = get(theme as object, `textStyles.${textStyle}`, {})

  let truncateStyle: any = {}
  if (noOfLines != null) {
    truncateStyle = {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: noOfLines,
    }
  } else if (isTruncated) {
    truncateStyle = {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }
  }

  const finalStyles = css(
    Object.assign(
      {},
      __css,
      baseStyle,
      { apply: apply },
      _layerStyle,
      _textStyle,
      truncateStyle,
      otherStyles,
      sx
    )
  )(theme)

  const cssObject: CSSObject = Object.assign(
    finalStyles,
    isFunction(cssProp) ? cssProp(theme) : cssProp
  )
  return cssObject
}

/**
 * @example
 * h(chakra(RouterLink, { to: 'https://chakraui' }), {}, slots)
 */
type UserProvidedProps = { [key: string]: any }

type IChakraFactory = {
  [key in DOMElements]: DefineComponent | JSX.Element
} & {
  (
    tag: DOMElements | Component | ConcreteComponent | string,
    options?: StyleResolverOptions & UserProvidedProps
  ): DefineComponent | JSX.Element
}

domElements.forEach((tag) => {
  chakra[tag] = chakra(tag, {})
})

export { domElements }
