import { chakra, DOMElements, SystemStyleObject } from '@chakra-ui/vue-system'
import { defineComponent, h, PropType } from '@vue/runtime-core'

// export interface BoxProps extends HTMLChakraProps<"div"> {}
interface BoxProps {
  width: object | string | number
}

// export const CBox = chakra('div') // as prop doesnt work this way

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
          label: attrs.label ? (attrs.label as string) : 'box', // for CSquare
        }),
        {
          ...attrs,
        },
        slots
      )
    }
  },
})

interface SquareProps {
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
    const styles: SystemStyleObject = props.centerContent
      ? { display: 'flex', alignItems: 'center', justifyContent: 'center' }
      : {}
    return () => {
      return h(
        chakra(CBox, {
          label: attrs.label ? (attrs.label as string) : 'square', // for CCircle
          boxSize: props.size,
          __css: {
            ...styles,
            flexShrink: 0,
            flexGrow: 0,
          },
          ...attrs,
        }),
        {},
        slots
      )
    }
  },
})

export const CCircle = defineComponent({
  props: {
    size: [Object, String, Number] as PropType<SquareProps['size']>,
    centerContent: {
      type: [Boolean] as PropType<SquareProps['centerContent']>,
      default: true,
    },
  },
  setup(props, { slots, attrs }) {
    return () => {
      return h(
        CSquare,
        {
          label: 'circle',
          borderRadius: '9999px',
          size: props.size,
          ...attrs,
        },
        slots
      )
    }
  },
})
