import { CIcon } from '@chakra-ui/c-icon'
import {
  HTMLChakraProps,
  SystemProps,
  ThemingProps,
  useMultiStyleConfig,
  useStyles,
  StylesProvider,
} from '@chakra-ui/vue-system'
import { h, defineComponent, PropType, computed } from 'vue'
import { chakra, DOMElements } from '@chakra-ui/vue-system'
import { getValidChildren, SNAO, SAO } from '@chakra-ui/vue-utils'

interface ListOptions {
  /**
   * Short hand prop for `listStyleType`
   * @type SystemProps["listStyleType"]
   */
  styleType?: SystemProps['listStyleType']
  /**
   * Short hand prop for `listStylePosition`
   * @type SystemProps["listStylePosition"]
   */
  stylePosition?: SystemProps['listStylePosition']
  /**
   * The space between each list item
   * @type SystemProps["margin"]
   */
  spacing?: SystemProps['margin']
}

export interface ListProps
  extends HTMLChakraProps<'ul'>,
    ThemingProps<'List'>,
    ListOptions {}

/**
 * List is used to display list items, it renders a `<ul>` by default.
 *
 * @see Docs https://vue.chakra-ui.com/docs/data-display/list
 */
export const CList = defineComponent({
  props: {
    as: {
      type: [Object, String] as PropType<DOMElements>,
      default: 'ul',
    },
    styleType: {
      type: SAO as PropType<ListProps['listStyleType']>,
      default: 'none',
    },
    stylePosition: SAO as PropType<ListProps['listStylePosition']>,
    spacing: SNAO as PropType<ListProps['margin']>,
  },
  setup(props, { slots, attrs }) {
    const styles = useMultiStyleConfig('List', props)
    StylesProvider(styles)
    const selector = '& > *:not(style) ~ *:not(style)'

    const spacingStyle = computed(() =>
      props.spacing ? { [selector]: { mt: props.spacing } } : {}
    )

    return () => {
      const validChildren = getValidChildren(slots)

      return h(
        chakra(props.as, {
          label: 'list',
          listStyleType: props.styleType,
          listStylePosition: props.stylePosition,
          role: 'list',
          __css: {
            ...styles.value.container,
            ...spacingStyle.value,
          },
          ...attrs,
        }),
        {},
        () => validChildren
      )
    }
  },
})

export const COrderedList = defineComponent({
  props: {},
  setup(props, { slots, attrs }) {
    return () => {
      return h(
        CList,
        {
          styleType: 'decimal',
          marginStart: '1em',
          ...attrs,
        },
        slots
      )
    }
  },
})

export const CUnorderedList = defineComponent({
  props: {},
  setup(props, { slots, attrs }) {
    return () => {
      return h(
        CList,
        {
          styleType: 'initial',
          marginStart: '1em',
          ...attrs,
        },
        slots
      )
    }
  },
})

export const CListItem = defineComponent({
  props: {},
  setup(props, { slots, attrs }) {
    const styles = useStyles()
    return () => {
      return h(
        chakra('li', {
          label: 'list__item',
          __css: {
            ...styles.value.item,
          },
        }),
        {
          ...attrs,
        },
        slots
      )
    }
  },
})

export const CListIcon = defineComponent({
  props: {},
  setup(props, { slots, attrs }) {
    const styles = useStyles()
    return () => {
      return h(
        CIcon,
        {
          role: 'presentation',
          ...attrs,
          __css: {
            ...styles.value.icon,
          },
        },
        slots
      )
    }
  },
})
