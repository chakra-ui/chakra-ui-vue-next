import {
  CBox,
  CWrap,
  CWrapItem,
  CWrapProps,
  WrapProps,
} from "@chakra-ui/vue-layout"
import {
  ThemingProps,
  useMultiStyleConfig,
  chakra,
  ComponentWithProps,
} from "@chakra-ui/vue-system"
import {
  createContext,
  getValidChildren,
  vueThemingProps,
} from "@chakra-ui/vue-utils"
import { filterUndefined } from "@chakra-ui/utils"

import { h, defineComponent, computed, ComputedRef } from "vue"

type AvatarGroupContext = ComputedRef<ThemingProps>

const [AvatarGroupProvider, useAvatarGroup] = createContext<AvatarGroupContext>(
  {
    strict: false,
    name: "AvatarGroupContext",
  }
)

export { useAvatarGroup }

export const CAvatarText = defineComponent({
  props: {
    text: {
      type: String,
      default: "",
    },
    ...vueThemingProps,
  },
  setup(props, ctx) {
    const themingProps = computed<ThemingProps>(() =>
      filterUndefined({
        colorScheme: props.colorScheme,
        variant: props.variant,
        size: props.size,
        styleConfig: props.styleConfig,
      })
    )
    const styles = useMultiStyleConfig("Avatar", themingProps)
    const containerStyles = computed(() => ({
      ...styles.value.container,
      display: styles.value.container.display || "flex",
      alignItems: "center",
      justifyContent: "center",
    }))
    const labelStyles = computed(() => ({
      ...styles.value.label,
      fontWeight: "medium",
    }))

    return () => (
      <chakra.div __css={containerStyles.value} {...ctx.attrs}>
        <chakra.div role="img" __css={labelStyles.value}>
          {props.text}
        </chakra.div>
      </chakra.div>
    )
  },
})

export const avatarGroupProps = {
  max: {
    type: Number,
    default: 2,
  },
  ...CWrapProps,
  ...vueThemingProps,
}

export const CAvatarGroup: ComponentWithProps<typeof avatarGroupProps> =
  defineComponent({
    props: avatarGroupProps,
    setup(props, { slots, attrs }) {
      const wrapProps = computed(
        () =>
          ({
            spacing: props.spacing || "-0.75em",
            direction: props.direction || "row-reverse",
            justify: props.justify,
            align: props.align,
            shouldWrapChildren: props.shouldWrapChildren,
          } as WrapProps)
      )
      const themingProps = computed<ThemingProps>(() =>
        filterUndefined({
          colorScheme: props.colorScheme,
          variant: props.variant,
          size: props.size,
          styleConfig: props.styleConfig,
        })
      )
      const validChildren = computed(() => getValidChildren(slots))
      const visibleChildren = computed(() =>
        validChildren.value.slice(0, props.max)
      )
      const nbHidden = computed(() => validChildren.value.length - props.max)

      AvatarGroupProvider(themingProps)

      return () => (
        <CBox __label="avatar-group" display="flex" {...attrs}>
          <CWrap {...wrapProps.value}>
            {nbHidden.value > 0 && (
              <CWrapItem>
                <CAvatarText
                  {...themingProps.value}
                  text={`+${nbHidden.value}`}
                />
              </CWrapItem>
            )}
            {visibleChildren.value.map((child) => (
              <CWrapItem>{child}</CWrapItem>
            ))}
          </CWrap>
        </CBox>
      )
    },
  })
