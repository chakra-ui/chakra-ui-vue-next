import {
  ThemingProps,
  useMultiStyleConfig,
  chakra,
  ComponentWithProps,
  SystemProps,
  SystemStyleObject,
} from "@chakra-ui/vue-system"
import {
  createContext,
  getValidChildren,
  SNAO,
  vueThemingProps,
  useThemingProps
} from "@chakra-ui/vue-utils"
import { filterUndefined, mergeWith } from "@chakra-ui/utils"

import { h, defineComponent, computed, ComputedRef, PropType, cloneVNode } from "vue"
import { baseStyle } from './c-avatar'

type AvatarGroupContext = ComputedRef<ThemingProps>

const [AvatarGroupProvider, useAvatarGroup] = createContext<AvatarGroupContext>(
  {
    strict: false,
    name: "AvatarGroupContext",
  }
)

export { useAvatarGroup }


export const avatarGroupProps = {
  max: {
    type: Number,
    default: 2,
  },
  spacing: {
    type: SNAO as PropType<SystemProps["margin"]>,
    default: "-0.75rem"
  },
  borderRadius: {
    type: SNAO as PropType<SystemProps["borderRadius"]>,
    default: "full"
  },
  borderColor: SNAO as PropType<SystemProps["borderColor"]>,
  ...vueThemingProps,
}

/**
 * CAvatarGroup displays a number of avatars grouped together in a stack.
 */
// @ts-ignore complex type
export const CAvatarGroup = defineComponent({
  props: avatarGroupProps,
  setup(props, { slots, attrs }) {
    const mergedProps = computed(() => mergeWith({}, props, attrs))
    const themingProps = useThemingProps(mergedProps.value)
    const styles = useMultiStyleConfig("Avatar", themingProps.value)

    const validChildren = computed(() => getValidChildren(slots))
    const visibleChildren = computed(() =>
      validChildren.value.slice(0, props.max)
    )
    const excessChildrenCount = computed(() => validChildren.value.length - props.max)

    /**
     * Reversing the children is a great way to avoid using zIndex
     * to overlap the avatars
     */
    const reversedVisibleChildren = computed(() =>
      visibleChildren.value.reverse()
    )

    const clonedChildren = computed(() => reversedVisibleChildren.value.map((vnode, index) => {
      const isFirstAvatar = index === 0

      const childProps = filterUndefined({
        marginEnd: isFirstAvatar ? 0 : props.spacing,
        size: props.size,
        borderColor: vnode?.props?.borderColor ?? props.borderColor,
        showBorder: true,
      })

      console.log("childProps", childProps)

      return cloneVNode(vnode, childProps)
    }))

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
        __label='avatar__group'
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
