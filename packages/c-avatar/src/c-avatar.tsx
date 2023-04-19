/**
 * Hey! Welcome to @chakra-ui/vue-next CAvatar
 *
 * The avatar component is used to represent user and displays the profile picture initials or fallback icon
 *
 * @see Docs     https://next.vue.chakra-ui.com/c-avatar
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/main/packages/c-avatar/src/c-avatar/c-avatar.ts
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 */

import {
  h,
  defineComponent,
  PropType,
  computed,
  Fragment,
  ref,
  ComputedRef,
  VNode,
  DefineComponent,
} from "vue"
import { match, SNAO, useThemingProps } from "@chakra-ui/vue-utils"
import { createContext, vueThemingProps } from "@chakra-ui/vue-utils"
import { mergeWith, filterUndefined, dataAttr } from "@chakra-ui/utils"
import { chakra, ComponentWithProps, DeepPartial } from "@chakra-ui/vue-system"
import { extractImgAttrs, getInitials } from "./utils"
import {
  omitThemingProps,
  SystemStyleObject,
  ThemingProps,
} from "@chakra-ui/styled-system"
import {
  createStylesContext,
  DOMElements,
  useMultiStyleConfig,
} from "@chakra-ui/vue-system"
import { CAvatarImage } from "./c-avatar-image"
import { createIconComponent } from "@chakra-ui/c-icon"

export const baseStyle: SystemStyleObject = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  textTransform: "uppercase",
  fontWeight: "medium",
  position: "relative",
  flexShrink: 0,
}

type BorderRadiusType = SystemStyleObject["borderRadius"]
type BorderColorType = SystemStyleObject["borderColor"]

export interface AvatarOptions {
  /**
   * The name of the person in the avatar.
   *
   * - if `src` has loaded, the name will be used as the `alt` attribute of the `img`
   * - If `src` is not loaded, the name will be used to create the initials
   */
  name?: string
  /**
   * If `true`, the `Avatar` will show a border around it.
   *
   * Best for a group of avatars
   *
   * @default false
   */
  showBorder?: boolean

  /**
   * The image url of the `Avatar`
   */
  src?: string
  /**
   * List of sources to use for different screen resolutions
   */
  srcset?: string
  /**
   * Defines loading strategy
   */
  loading?: "eager" | "lazy"
  /**
   * The border color of the avatar
   * @type SystemProps["borderColor"]
   */
  borderColor?: SystemStyleObject["borderColor"]

  /**
   * Initials override for the avatar
   */
  initials?: string
  /**
   * Defining which referrer is sent when fetching the resource.
   */
  referrerPolicy?: HTMLImageElement["referrerPolicy"]
}

const [AvatarStylesProvider, useAvatarStyles] = createStylesContext("Avatar")
export { AvatarStylesProvider, useAvatarStyles }

export interface CAvatarContext {
  icon: ComputedRef<VNode | undefined>
  isLoaded: ComputedRef<boolean>
}
const [AvatarContextProvider, useAvatarContext] = createContext<CAvatarContext>(
  {
    name: "AvatarContext",
    strict: true,
  }
)

export { AvatarContextProvider, useAvatarContext }

export interface CAvatarProps extends AvatarOptions, ThemingProps<"Avatar"> {
  /**
   * Icon name or component
   */
  icon?: string | DefineComponent
  iconLabel?: string
  /**
   * If `true`, opt out of the avatar's `fallback` logic and
   * renders the `img` at all times.
   *
   * @default false
   */
  ignoreFallback?: boolean
}

/**
 * CAvatar Component
 */
export const CAvatar = defineComponent({
  name: "CAvatar",
  props: {
    as: {
      type: [Object, String] as PropType<DOMElements>,
      default: "span",
    },
    src: {
      type: String as PropType<CAvatarProps["src"]>,
      default: "",
    },
    srcSet: {
      type: String as PropType<string>,
      default: "",
    },
    name: {
      type: String as PropType<CAvatarProps["name"]>,
      default: "",
    },
    initials: {
      type: String as PropType<CAvatarProps["initials"]>,
      default: "",
    },
    loading: String as PropType<CAvatarProps["loading"]>,
    showBorder: Boolean as PropType<CAvatarProps["showBorder"]>,
    iconLabel: String as PropType<CAvatarProps["iconLabel"]>,
    borderRadius: {
      type: SNAO as PropType<SystemStyleObject["borderRadius"]>,
      default: "full",
    },
    borderColor: SNAO as PropType<SystemStyleObject["borderColor"]>,
    ignoreFallback: SNAO as PropType<CAvatarProps["ignoreFallback"]>,
    icon: [String, Object] as PropType<CAvatarProps["icon"]>,
    ...vueThemingProps,
  },
  emits: ["load", "error"],
  setup(props, { slots, attrs, emit }) {
    const themingProps = useThemingProps(props)
    const mergedProps = computed(() => mergeWith({}, props, attrs))
    const ownProps = computed(() =>
      filterUndefined(omitThemingProps(mergedProps.value))
    )
    const extractedAttrs = computed(() => extractImgAttrs(ownProps.value))

    const isLoaded = ref(false)

    const styles = useMultiStyleConfig(
      "Avatar",
      computed(() => ({
        ...themingProps.value,
        name: props.name,
      }))
    )

    function handleLoaded(value: unknown) {
      if (value) {
        isLoaded.value = true
        emit("load", value)
      }
    }

    const ResolvedAvatarIcon = computed<VNode | undefined>(() => {
      // Here we prioritize the icon slot
      const iconSlot = slots.icon?.() as VNode[]
      if (iconSlot) {
        if (iconSlot) {
          const [firstChild] = iconSlot
          return firstChild
        }
      } else if (props.icon) {
        return match(typeof props.icon as any, {
          string: h(createIconComponent(props.icon as string) as any),
          object: h(props.icon as any),
        })
      }

      return undefined
    })

    const avatarStyles = computed<SystemStyleObject>(() => ({
      borderRadius: props.borderRadius,
      borderWidth: props.showBorder ? "2px" : undefined,
      ...baseStyle,
      ...styles.value.container,
      ...(props.borderColor && { borderColor: props.borderColor }),
    }))

    AvatarStylesProvider(styles)
    AvatarContextProvider({
      icon: ResolvedAvatarIcon,
      isLoaded: computed(() => isLoaded.value),
    })

    return () => (
      <chakra.span
        __label="avatar"
        data-loaded={dataAttr(isLoaded.value)}
        __css={avatarStyles.value}
        {...attrs}
      >
        <CAvatarImage
          src={props.src}
          srcSet={props.srcSet}
          loading={props.loading}
          onLoad={handleLoaded}
          onError={(e) => emit("error", e)}
          initials={props.initials}
          name={props.name}
          // @ts-ignore
          borderRadius={props.borderRadius}
          iconLabel={props.iconLabel}
          ignoreFallback={props.ignoreFallback}
          {...extractedAttrs.value.imgAttrs}
        />
        {slots?.default?.()}
      </chakra.span>
    )
  },
}) as any as ComponentWithProps<CAvatarProps>
