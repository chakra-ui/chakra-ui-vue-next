/**
 * Hey! Welcome to @chakra-ui/vue-next CBreadcrumb
 *
 * Breadcrumbs help users visualize their current location in relation to the rest of the website or application by showing the hierarchy of pages
 *
 * @see Docs     https://next.vue.chakra-ui.com/breadcrumb
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/master/packages/c-breadcrumb/src/c-breadcrumb/c-breadcrumb.ts
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 */

import { h, defineComponent, PropType, ConcreteComponent, Component, computed, cloneVNode, VNode, VNodeProps, mergeProps } from 'vue'
import {
  chakra,
  HTMLChakraProps,
  SystemProps,
  ThemingProps,
  StylesProvider,
  useMultiStyleConfig,
  useStyles,
  SystemStyleObject
} from '@chakra-ui/vue-system'
import { filterUndefined } from '@chakra-ui/utils'
import { getValidChildren, SNA, SNAO } from '@chakra-ui/vue-utils'

/**
 * CBreadcrumb (root)
 */


export interface BreadcrumbOptions {
  /**
   * The visual separator between each breadcrumb item
   * @type string | ConcreteComponent | Component
   */
  separator?: string | ConcreteComponent | Component
  /**
   * The left and right margin applied to the separator
   * @type SystemProps["mx"]
   */
  spacing?: SystemProps['mx']
}

export interface BreadcrumbProps
  extends HTMLChakraProps<'nav'>,
    BreadcrumbOptions,
    ThemingProps<'Breadcrumb'> {}


/**
 * CBreadcrumb is used to render a breadcrumb navigation landmark.
 * It renders a `nav` element with `aria-label` set to `breadcrumb`
 *
 * @see Docs https://next.vue.chakra-ui.com/breadcrumb
 */
export const CBreadcrumb = defineComponent(
  (props: BreadcrumbProps, { attrs, slots }) => {
    const themingProps = computed<ThemingProps>(() =>
      filterUndefined({
        colorScheme: props.colorScheme,
        variant: props.variant,
        size: props.size,
        styleConfig: props.styleConfig,
      })
    )

    const styles = useMultiStyleConfig('Breadcrumb', themingProps.value)
    StylesProvider(styles)

    const separator = computed(() => slots?.separator?.() || props.separator)

    return () => {
      const validChildren = getValidChildren(slots)
      const count = validChildren.length

      const children = validChildren.map((vnode: VNode<unknown, unknown, BreadcrumbOptions>, index: number) => cloneVNode(vnode, {
        separator: separator.value,
        spacing: props.spacing,
        isLastChild: count === index + 1,
      }))

      return (
        <chakra.nav
          as={props.as}
          aria-label="breadcrumb"
          __css={styles.value.container}
          {...attrs}
        >
          <chakra.ol __label="chakra-breadcrumb__list">
            {() => children}
          </chakra.ol>
        </chakra.nav>
      )
    }
  }
)

// @ts-ignore "name" property is typically read-only for functional components
CBreadcrumb.name = 'CBreadcrumb'
CBreadcrumb.props = {
  separator: {
    type: SNAO as PropType<BreadcrumbOptions['separator']>,
    default: '/'
  },
  spacing: {
    type: SNA as PropType<BreadcrumbOptions['spacing']>,
    default: '0.5rem'
  },
  as: {
    type: [String, Object] as PropType<DOMElements | Component | string>,
    default: 'nav',
  },
}


/**
 * CBreadcrumbSeparator
 */

export interface BreadcrumbSeparatorProps extends HTMLChakraProps<"div"> {
  /**
   * @type SystemProps["mx"]
   */
  spacing?: SystemProps["mx"]
}

/**
 * The `CBreadcrumbSeparator` component is the separator for
 * each breacrumb item.
 */
export const CBreadcrumbSeparator = defineComponent((props: BreadcrumbSeparatorProps, { attrs, slots }) => {
  const styles = useStyles()
  const separatorStyles = computed<SystemStyleObject>(() => ({
    display: 'flex',
    mx: props.spacing,
    ...styles.value.separator,
  }))

  return () => (
    <chakra.span
      role="presentation"
      __label="chakra-breadcrumb__separator"
      {...attrs}
      __css={separatorStyles.value}
    >
      {slots}
    </chakra.span>
  )
})

CBreadcrumbSeparator.props = {
  spacing: CBreadcrumb.props.spacing,
}


// @ts-ignore "name" property is typically read-only for functional components
CBreadcrumbSeparator.name = 'CBreadcrumbSeparator'


/**
 * CBreadcrumbItem
 */

interface BreadcrumbItemOptions extends BreadcrumbOptions {
  isCurrentPage?: boolean
  isLastChild?: boolean
}

export interface BreadcrumbItemProps
  extends BreadcrumbItemOptions,
    HTMLChakraProps<"li"> {}

export const CBreadcrumbItem = defineComponent((props: BreadcrumbItemProps, { attrs, slots }) => {
  const styles = useStyles()
  const itemStyles = computed<SystemStyleObject>(() => ({
    display: "inline-flex",
    alignItems: "center",
    ...styles.value.item,
  }))

  return () => {
    const validChildren = getValidChildren(slots)
    const children = validChildren.map((vnode: VNode<unknown, unknown, BreadcrumbItemOptions>) => {
      // @ts-expect-error The "name" property is not typed on `VNodeTypes` but we need to access it during runtime
      if (vnode.type.name === 'CBreadcrumbLink') {
        return cloneVNode(vnode, {
          isCurrentPage: props.isCurrentPage,
        })
      }

      // @ts-expect-error The "name" property is not typed on `VNodeTypes` but we need to access it during runtime
      if (vnode.type.name === 'CBreadcrumbSeparator') {
        return cloneVNode(vnode, {
          spacing: props.spacing,
          children: vnode.children || { default: () => props.separator },
        })
      }

      return vnode
    })

    return (
      <chakra.li __label="chakra-breadcrumb__list-it" __css={itemStyles.value}>
        {children}
        {!props.isLastChild && (
          // @ts-expect-error
          <CBreadcrumbSeparator spacing={props.spacing}>
            {() => props.separator}
          </CBreadcrumbSeparator>
        )}
      </chakra.li>
    )
  }
})

// @ts-ignore "name" property is typically read-only for functional components
CBreadcrumbItem.name = 'CBreadcrumbItem'
CBreadcrumbItem.props = {
  ...CBreadcrumb.props,
  isLastChild: Boolean as PropType<boolean>,
  isCurrentPage: Boolean as PropType<boolean>,
}

/**
 * CBreadcrumbLink
 */

export interface BreadcrumbLinkProps extends HTMLChakraProps<"a"> {
  isCurrentPage?: boolean
}

/**
 * BreadcrumbLink link.
 *
 * It renders a `span` when it matches the current link. Otherwise,
 * it renders an anchor tag.
 */
export const CBreadcrumbLink = defineComponent((props: BreadcrumbLinkProps, { attrs, slots }) => {
  const styles = useStyles()
  
  return () => {
    if (props.isCurrentPage) {
      return (
        <chakra.span __label="chakra-breadcrumb__link" aria-current="page" __css={styles.value.link} as={props.as} {...attrs}>
          {slots}
        </chakra.span>
      )
    }

    return (
      <chakra.a __label="chakra-breadcrumb__link" as={props.as} __css={styles.value.link} {...attrs}>
        {slots}
      </chakra.a>
    )
  }
})

// @ts-ignore "name" property is typically read-only for functional components
CBreadcrumbLink.name = 'CBreadcrumbLink'
CBreadcrumbLink.props = {
  isCurrentPage: Boolean as PropType<boolean>,
}