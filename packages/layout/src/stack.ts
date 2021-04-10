import { SystemProps } from '@chakra-ui/styled-system'
import {
  h,
  defineComponent,
  PropType,
  Component,
  computed,
  Fragment,
  createVNode,
} from 'vue'
import { chakra, DOMElements } from '@chakra-ui/vue-system'
import {
  getDividerStyles,
  getStackStyles,
  selector,
  StackDirection,
} from './stack.utils'
import { getValidChildren } from '@chakra-ui/vue-utils'

interface StackProps {
  /**
   * Shorthand for `alignItems` style prop
   * @type SystemStyleObject["alignItems"]
   */
  align?: SystemProps['alignItems']
  /**
   * Shorthand for `justifyContent` style prop
   * @type SystemStyleObject["justifyContent"]
   */
  justify?: SystemProps['justifyContent']
  /**
   * Shorthand for `flexWrap` style prop
   * @type SystemStyleObject["flexWrap"]
   */
  wrap?: SystemProps['flexWrap']
  /**
   * The space between each stack item
   * @type SystemStyleObject["margin"]
   */
  spacing?: SystemProps['margin']
  /**
   * The direction to stack the items.
   */
  direction?: StackDirection
  /**
   * If `true`, each stack item will show a divider
   * @type React.ReactElement
   */
  divider?: Component
  /**
   * If `true`, the children will be wrapped in a `Box` with
   * `display: inline-block`, and the `Box` will take the spacing props
   */
  shouldWrapChildren?: boolean
  /**
   * If `true` the items will be stacked horizontally.
   */
  isInline?: boolean
}

export const CStackDivider = defineComponent({
  setup(_, { attrs }) {
    console.log(attrs.__css)
    return () => {
      return h(
        chakra('div', {
          label: 'stack__divider',
          borderWidth: 0,
          alignSelf: 'stretch',
          borderColor: 'inherit',
          width: 'auto',
          height: 'auto',
          __css: attrs.__css as any,
        })
      )
    }
  },
})

export const CStackItem = defineComponent({
  setup(_, { attrs }) {
    return () => {
      return h(
        chakra('div', {
          label: 'stack__item',
          ...attrs,
          display: 'inline-block',
          flex: '0 0 auto',
          minWidth: 0,
          __css: attrs.__css as any,
        })
      )
    }
  },
})

const stackProps = {
  as: {
    type: [Object, String] as PropType<DOMElements>,
    default: 'div',
  },
  align: [Object, String, Array] as PropType<StackProps['align']>,
  justify: [Object, String, Array] as PropType<StackProps['justify']>,
  wrap: [Object, String, Array] as PropType<StackProps['wrap']>,
  spacing: {
    type: [Object, String, Array] as PropType<StackProps['spacing']>,
    default: '0.5rem',
  },
  direction: {
    type: [Object, String, Array] as PropType<StackProps['direction']>,
    default: 'row',
  },
  // todo: divider
  divider: [Object, Boolean] as PropType<StackProps['divider']>,
  shouldWrapChildren: [Boolean] as PropType<StackProps['shouldWrapChildren']>,
  isInline: [Boolean] as PropType<StackProps['isInline']>,
}

export const CStack = defineComponent({
  name: 'CStack',
  props: stackProps,
  setup(props, { slots, attrs }) {
    const direction = computed(() =>
      props.isInline ? 'row' : props.direction ?? 'column'
    )

    const styles = computed(() =>
      getStackStyles({ direction: direction.value, spacing: props.spacing })
    )

    const dividerStyle = computed(() =>
      getDividerStyles({ spacing: props.spacing, direction: direction.value })
    )

    const hasDivider = computed(() => !!props.divider)

    const shouldUseChildren = computed(
      () => !props.shouldWrapChildren && !hasDivider.value
    )

    return () => {
      const validChildren = getValidChildren(slots)
      const clones = shouldUseChildren.value
        ? validChildren
        : validChildren.map((child, index) => {
            const isLast = index + 1 === validChildren.length
            const wrappedChild = createVNode(CStackItem, { key: index }, child)
            const _child = props.shouldWrapChildren ? wrappedChild : child

            if (!hasDivider.value) return _child

            // todo: temporary divider
            const clonedDivider = createVNode(CStackDivider, {
              borderColor: 'blue.200',
              __css: dividerStyle.value,
            })

            const _divider = isLast ? null : clonedDivider

            return createVNode(Fragment, { key: index }, [_child, _divider])
          })

      return h(
        chakra('div', {
          label: attrs.label ? (attrs.label as string) : 'stack', // CHStack and CVStack
          display: 'flex',
          alignItems: props.align,
          justifyContent: props.justify,
          flexDirection: styles.value.flexDirection,
          flexWrap: props.wrap,
          __css: hasDivider.value ? {} : { [selector]: styles.value[selector] },
        }),
        () => clones
      )
    }
  },
})

// will change this with HTMLChakraProps
type SystemAndStackProps = StackProps & SystemProps

/**
 * A view that arranges its children in a horizontal line.
 */
export const CHStack = defineComponent({
  name: 'CHStack',
  props: stackProps,
  setup(props, { attrs, slots }) {
    return () => {
      return h(
        CStack,
        {
          label: 'stack-horizontal',
          align: 'center',
          ...props,
          ...attrs,
          direction: 'row',
        } as SystemAndStackProps,
        slots
      )
    }
  },
})

/**
 * A view that arranges its children in a vertical line.
 */
export const CVStack = defineComponent({
  name: 'CVStack',
  props: stackProps,
  setup(props, { attrs, slots }) {
    return () => {
      return h(
        CStack,
        {
          label: 'stack-vertical',
          align: 'center',
          ...props,
          ...attrs,
          direction: 'column',
        } as SystemAndStackProps,
        slots
      )
    }
  },
})
