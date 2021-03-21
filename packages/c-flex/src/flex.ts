import { h, defineComponent, PropType, reactive } from 'vue'
import type CSS from 'csstype'
import { chakra, DOMElements, ThemingProps } from '@chakra-ui/vue-system'

type ArrayOrStringProp<T> = T | T[]

export interface FlexProps {
  /**
   * Shorthand for `alignItems` style prop
   * @type SystemStyleObject["alignItems"]
   * SystemStyleObject because prop can be String, Array or Object
   */
  align?: ArrayOrStringProp<CSS.Properties['alignItems']>

  /**
   * Shorthand for `justifyContent` style prop
   * @type SystemStyleObject["justifyContent"]
   */
  justify?: ArrayOrStringProp<CSS.Properties['justifyContent']>

  /**
   * Shorthand for `flexWrap` style prop
   * @type SystemStyleObject["flexWrap"]
   */
  wrap?: ArrayOrStringProp<CSS.Properties['flexWrap']>

  /**
   * Shorthand for `flexDirection` style prop
   * @type SystemStyleObject["flexDirection"]
   */
  direction?: ArrayOrStringProp<CSS.Properties['flexDirection']>

  /**
   * Shorthand for `flexBasis` style prop
   * @type SystemStyleObject["flexBasis"]
   */
  basis?: ArrayOrStringProp<CSS.Properties['flexBasis']>

  /**
   * Shorthand for `flexGrow` style prop
   * @type SystemStyleObject["flexGrow"]
   */
  grow?: ArrayOrStringProp<CSS.Properties['flexGrow']>

  /**
   * Shorthand for `flexShrink` style prop
   * @type SystemStyleObject["flexShrink"]
   */
  shrink?: ArrayOrStringProp<CSS.Properties['flexShrink']>
}

const CFlex = defineComponent({
  props: {
    as: {
      type: [Object, String] as PropType<DOMElements>,
      default: 'div',
    },
    align: [Object, String, Array] as PropType<FlexProps['align']>,
    justify: [Object, String, Array] as PropType<FlexProps['justify']>,
    wrap: [Object, String, Array] as PropType<FlexProps['wrap']>,
    direction: {
      type: [Object, String, Array] as PropType<FlexProps['direction']>,
      default: 'row',
    },
    basis: [Object, String, Array] as PropType<FlexProps['basis']>,
    grow: [Object, String, Array] as PropType<FlexProps['grow']>,
    shrink: [Object, String, Array] as PropType<FlexProps['shrink']>,
    size: String as PropType<ThemingProps['size']>,
  },
  setup(props, { slots, attrs }) {
    const styles = reactive({
      display: 'flex',
      flexDirection: props.direction,
      alignItems: props.align,
      justifyContent: props.justify,
      flexWrap: props.wrap,
      flexBasis: props.basis,
      flexGrow: props.grow,
      flexShrink: props.shrink,
      h: props.size,
      w: props.size,
    })
    return () =>
      h(
        chakra(props.as),
        {
          __css: styles,
          ...attrs,
        },
        slots
      )
  },
})

export default CFlex
