/**
 * Hey! Welcome to @chakra-ui/vue-next CAvatar
 *
 * The avatar component is used to represent user and displays the profile picture initials or fallback icon
 *
 * @see Docs     https://next.vue.chakra-ui.com/c-avatar
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/master/packages/c-avatar/src/c-avatar/c-avatar.ts
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 */

import {
  h,
  defineComponent,
  PropType,
  computed,
  ref,
  Fragment,
  mergeProps,
  ComputedRef,
} from "vue"
import {
  chakra,
  ComponentWithProps,
  DOMElements,
  omitThemingProps,
  StylesProvider,
  SystemStyleObject,
  ThemingProps,
  useMultiStyleConfig,
  useStyles,
  useTheme,
} from "@chakra-ui/vue-system"
import { CBox } from "@chakra-ui/vue-layout"
import { getValidChildren, vueThemingProps } from "@chakra-ui/vue-utils"
import { Dict, filterUndefined } from "@chakra-ui/utils"
import { useAvatarGroup } from "./c-avatar-group"
import { extractImgAttrs, getInitials } from "./utils"

const useDynamicContainerStyles = (
  props: unknown,
  styles: ComputedRef<Dict<SystemStyleObject>>
) => {
  const theme = useTheme()
  const calculatedColorStyles = computed(
    () => theme.components?.Avatar?.baseStyle(props)?.container
  )

  return computed(() => ({
    ...styles.value.container,
    bg: calculatedColorStyles.value.bg,
    color: calculatedColorStyles.value.color,
    display: styles.value.container.display || "flex",
    alignItems: "center",
    justifyContent: "center",
  }))
}

const CAvatarDefaultImage = defineComponent({
  setup(props) {
    const styles = useStyles()
    const containerStyles = useDynamicContainerStyles(props, styles)

    return () => (
      <CBox __css={containerStyles.value}>
        <svg fill="#fff" viewBox="0 0 128 128" role="img">
          <g>
            <path d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z" />
            <path d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24" />
          </g>
        </svg>
      </CBox>
    )
  },
})

const CAvatarInitials = defineComponent({
  props: {
    name: {
      type: String,
      default: "",
    },
    initials: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const styles = useStyles()
    const containerStyles = useDynamicContainerStyles(props, styles)

    const labelStyles = computed(() => ({
      ...styles.value.label,
      fontWeight: "medium",
    }))

    return () => (
      <CBox __css={containerStyles.value}>
        <chakra.div
          role="img"
          aria-label={props.name}
          __css={labelStyles.value}
        >
          {props.initials
            ? props.initials
            : props.name && getInitials(props.name)}
        </chakra.div>
      </CBox>
    )
  },
})

export const avatarProps = {
  as: {
    type: [Object, String] as PropType<DOMElements>,
    default: "span",
  },
  src: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  initials: {
    type: String,
    default: "",
  },
  ...vueThemingProps,
}

export type CAvatarProps = typeof avatarProps

export const CAvatar: ComponentWithProps<CAvatarProps> = defineComponent({
  props: {
    ...avatarProps,
  },
  setup(props, { slots, attrs }) {
    // Props handling
    const mergedProps = computed(() => mergeProps({}, props, attrs))
    const ownProps = computed(() => omitThemingProps(mergedProps.value))
    const extractedAttrs = computed(() => extractImgAttrs(ownProps.value))

    // State handling
    const error = ref(false)
    const pending = ref(true)

    // Fetching custom icon
    const validChildren = ref(getValidChildren(slots))
    const customIcon = validChildren.value?.find((child, index) => {
      if ((child.type as any).name === "CIcon") {
        validChildren.value.splice(index, 1)
        return true
      }
    })

    // Handling styles
    const avatarGroupStyles = useAvatarGroup()

    const themingProps = computed<ThemingProps>(() =>
      filterUndefined({
        colorScheme: avatarGroupStyles?.value?.colorScheme || props.colorScheme,
        variant: avatarGroupStyles?.value?.variant || props.variant,
        size: avatarGroupStyles?.value?.size || props.size,
        styleConfig: avatarGroupStyles?.value?.styleConfig || props.styleConfig,
      })
    )

    const styles = useMultiStyleConfig("Avatar", themingProps)
    const containerStyles = useDynamicContainerStyles(props, styles)

    const imgStyles = computed(() => ({
      objectFit: "cover",
      ...containerStyles.value,
    }))

    StylesProvider(styles)

    return () => (
      <chakra.div
        __label="avatar"
        __css={containerStyles.value}
        {...extractedAttrs.value.rest}
      >
        {!error.value && (
          <chakra.img
            src={props.src}
            __css={imgStyles.value}
            onError={() => {
              error.value = true
              pending.value = false
            }}
            onLoad={() => {
              error.value = false
              pending.value = false
            }}
            alt={props.name}
            aria-label={props.name}
            display={
              pending.value ? "none" : (containerStyles.value.display as string)
            }
            {...extractedAttrs.value.imgAttrs}
          />
        )}
        {(pending.value || error.value) &&
          (props.name ? (
            <CAvatarInitials
              initials={props.initials}
              name={props.name}
              {...extractedAttrs.value.rest}
            />
          ) : (
            customIcon ?? <CAvatarDefaultImage {...extractedAttrs.value.rest} />
          ))}
        {validChildren.value}
      </chakra.div>
    )
  },
})
