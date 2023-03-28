/* eslint vue/no-side-effects-in-computed-properties: 0  */
import { useMultiStyleConfig, chakra } from "@chakra-ui/vue-system"
import { SystemStyleObject } from "@chakra-ui/styled-system"
import {
  getValidChildren,
  SNAO,
  vueThemingProps,
  useThemingProps,
  mergeWith,
} from "@chakra-ui/vue-utils"
import { filterUndefined } from "@chakra-ui/utils"

import {
  h,
  Fragment,
  defineComponent,
  computed,
  PropType,
  cloneVNode,
} from "vue"
import { baseStyle } from "./c-avatar"
import type * as CSS from "csstype"

export const avatarGroupProps = {
  max: {
    type: Number as PropType<number>,
    default: 2,
  },
  spacing: {
    type: SNAO as PropType<SystemStyleObject["margin"]>,
    default: "-0.75rem",
  },
  borderRadius: {
    type: SNAO as PropType<SystemStyleObject["borderRadius"]>,
    default: "full",
  },
  borderColor: SNAO as PropType<SystemStyleObject["borderColor"]>,
  ...vueThemingProps,
}

/**
 * CAvatarGroup displays a number of avatars grouped together in a stack.
 */
export const CAvatarGroup = defineComponent({
  name: "CAvatarGroup",
  props: avatarGroupProps,
  setup(props, { slots, attrs }) {
    const mergedProps = computed(() => mergeWith({}, props, attrs))
    const themingProps = useThemingProps(mergedProps.value)
    const styles = useMultiStyleConfig("Avatar", themingProps.value)

    const validChildren = computed(() => getValidChildren(slots))
    const visibleChildren = computed(() =>
      validChildren.value.slice(0, props.max)
    )
    const excessChildrenCount = computed(
      () => validChildren.value.length - props.max
    )

    /**
     * Reversing the children is a great way to avoid using zIndex
     * to overlap the avatars
     */
    const reversedVisibleChildren = computed(() =>
      visibleChildren.value.reverse()
    )

    const clonedChildren = computed(() =>
      reversedVisibleChildren.value.map((vnode, index) => {
        const isFirstAvatar = index === 0
        const childProps = filterUndefined({
          marginEnd: isFirstAvatar ? 0 : props.spacing,
          size: props.size,
          borderColor: vnode?.props?.borderColor ?? props.borderColor,
          showBorder: true,
        })
        return cloneVNode(vnode, childProps)
      })
    )

    const groupStyles = computed<SystemStyleObject>(() => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      flexDirection: "row-reverse",
      ...styles.value.group,
    }))

    const excessStyles = computed<SystemStyleObject>(() => ({
      borderRadius: props.borderRadius,
      marginStart: props.spacing,
      ...baseStyle,
      ...styles.value.excessLabel,
    }))

    return () => (
      <chakra.div
        role="group"
        __label="avatar__group"
        __css={groupStyles.value}
      >
        <>
          {excessChildrenCount.value > 0 && (
            <chakra.span __label="avatar__excess" __css={excessStyles.value}>
              {`+${excessChildrenCount.value}`}
            </chakra.span>
          )}
          {clonedChildren.value}
        </>
      </chakra.div>
    )
  },
})
