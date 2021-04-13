import {
  chakra,
  DOMElements,
  SystemStyleObject,
  HTMLChakraProps,
} from '@chakra-ui/vue-system'
import { computed, defineComponent, h, PropType } from '@vue/runtime-core'

export interface BoxProps extends HTMLChakraProps<'div'> {}

/**
 * Box is the most abstract component on top of which other chakra
 * components are built. It renders a `div` element by default.
 *
 * @see Docs https://vue.chakra-ui.com/docs/layout/box
 */
export const CBox = defineComponent({
  props: {
    as: {
      type: [String, Object] as PropType<DOMElements>,
      default: 'div',
    },
  },
  setup(props, { slots, attrs }) {
    return () => {
      return h(
        chakra(props.as, {
          label: 'box',
          ...attrs,
        }),
        {},
        slots
      )
    }
  },
})

/**
 * As a constraint, you can't pass size related props
 * Only `size` would be allowed
 */
type Omitted = 'size' | 'boxSize' | 'width' | 'height' | 'w' | 'h'

export interface SquareProps extends Omit<BoxProps, Omitted> {
  /**
   * The size (width and height) of the square
   */
  size?: BoxProps['width']
  /**
   * If `true`, the content will be centered in the square
   */
  centerContent?: boolean
}

export const CSquare = defineComponent({
  props: {
    size: [Object, String, Number] as PropType<SquareProps['size']>,
    centerContent: {
      type: [Boolean] as PropType<SquareProps['centerContent']>,
      default: true,
    },
  },
  setup(props, { slots, attrs }) {
    const styles = computed<SystemStyleObject>(() =>
      props.centerContent
        ? { display: 'flex', alignItems: 'center', justifyContent: 'center' }
        : {}
    )
    return () => {
      return h(
        CBox,
        {
          label: 'square',
          boxSize: props.size,
          __css: {
            ...styles.value,
            flexShrink: 0,
            flexGrow: 0,
          },
          ...attrs,
        },
        slots
      )
    }
  },
})

export const CCircle = defineComponent({
  setup(_, { slots, attrs }) {
    return () => {
      return h(
        CSquare,
        {
          label: 'circle',
          borderRadius: '9999px',
          ...attrs,
        },
        slots
      )
    }
  },
})
