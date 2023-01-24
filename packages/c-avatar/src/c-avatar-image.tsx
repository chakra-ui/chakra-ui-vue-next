import {
  defineComponent,
  h,
  Fragment,
  cloneVNode,
  computed,
  PropType,
  watchEffect,
} from "vue"
import { CImageProps, useImage } from "@chakra-ui/c-image"
import { SNAO } from "@chakra-ui/vue-utils"
import { CAvatarName } from "./c-avatar-name"
import { CDefaultAvatarIcon } from "./c-default-avatar-icon"
import { chakra, ComponentWithProps, DeepPartial } from "@chakra-ui/vue-system"
import { useAvatarContext } from "./c-avatar"

export interface CAvatarImageProps extends CImageProps {
  initials?: string
  borderRadius?: CImageProps["borderRadius"]
  iconLabel?: string
  name?: string
}

export const CAvatarImage = defineComponent({
  name: "CAvatarImage",
  props: {
    src: {
      type: String as PropType<CAvatarImageProps["src"]>,
      default: "",
    },
    srcSet: {
      type: String as PropType<CAvatarImageProps["src"]>,
      default: "",
    },
    name: {
      type: String as PropType<CAvatarImageProps["name"]>,
      default: "",
    },
    initials: String as PropType<CAvatarImageProps["initials"]>,
    iconLabel: String as PropType<CAvatarImageProps["iconLabel"]>,
    loading: String as PropType<CAvatarImageProps["loading"]>,
    borderRadius: SNAO as PropType<CAvatarImageProps["borderRadius"]>,
    ignoreFallback: Boolean as PropType<CAvatarImageProps["ignoreFallback"]>,
    referrerPolicy: SNAO as PropType<CAvatarImageProps["referrerPolicy"]>,
  },
  emits: ["load", "error"],
  setup(props, { slots, emit, attrs }) {
    const { status } = useImage({
      ...props,
      ignoreFallback: props.ignoreFallback,
    })
    const hasLoaded = computed(() => status.value === "loaded")

    /**
     * Fallback avatar applies under 2 conditions:
     * - If `src` was passed and the image has not loaded or failed to load
     * - If `src` wasn't passed
     *
     * In this case, we'll show either the name avatar or default avatar
     */
    const showFallback = computed(() => !props.src || !hasLoaded.value)

    const { icon } = useAvatarContext()

    const Icon = computed(() => {
      if (icon.value) {
        return defineComponent(() => {
          return () => cloneVNode(icon.value!)
        })
      } else {
        return defineComponent(() => {
          return () => cloneVNode(h(CDefaultAvatarIcon))
        })
      }
    })

    return () => {
      const showFallback = !props.src || !hasLoaded.value
      if (showFallback) {
        return props.name ? (
          <CAvatarName {...attrs} name={props.name} hidden={hasLoaded.value} />
        ) : (
          <Icon.value {...attrs} />
        )
      }
      return (
        <>
          <chakra.img
            {...attrs}
            __label="avatar__img"
            src={props.src}
            srcset={props.srcSet}
            alt={props.name}
            onLoad={() => emit("load", [props.src, props.srcSet])}
            onError={(e) => emit("error", e)}
            referrerPolicy={props.referrerPolicy}
            loading={props.loading}
            __css={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: props.borderRadius,
            }}
          />
        </>
      )
    }
  },
})
