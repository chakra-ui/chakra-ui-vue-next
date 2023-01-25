/**
 * Hey! Welcome to @chakra-ui/vue-next CImage
 *
 * Image
 *
 * @see Docs     https://next.vue.chakra-ui.com/c-image
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/main/packages/c-image/src/c-image/c-image.ts
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 */

import {
  h,
  defineComponent,
  PropType,
  computed,
  ref,
  unref,
  watchEffect,
  reactive,
  DefineComponent,
} from "vue"
import {
  chakra,
  ComponentWithProps,
  DOMElements,
  SystemProps,
  HTMLChakraProps,
  ChakraFactoryComponent,
} from "@chakra-ui/vue-system"
import {
  FallbackStrategy,
  shouldShowFallbackImage,
  useImage,
  UseImageProps,
} from "./use-image"
import { CNativeImage, NativeImageOptions } from "./c-native-image"
import { filterUndefined, omit } from "@chakra-ui/utils"

interface ImageOptions extends NativeImageOptions {
  /**
   * Fallback image `src` to show if image is loading or image fails.
   *
   * Note 🚨: We recommend you use a local image
   */
  fallbackSrc?: string
  /**
   * Defines loading strategy
   */
  loading?: "eager" | "lazy"
  /**
   * How the image to fit within its bounds.
   * It maps to css `object-fit` property.
   * @type SystemProps["objectFit"]
   */
  fit?: SystemProps["objectFit"]
  /**
   * How to align the image within its bounds.
   * It maps to css `object-position` property.
   * @type SystemProps["objectPosition"]
   */
  align?: SystemProps["objectPosition"]

  /**
   * - beforeLoadOrError(default): loads the fallbackImage while loading the src
   * - onError: loads the fallbackImage only if there is an error fetching the src
   *
   * @default "beforeLoadOrError"
   */
  fallbackStrategy?: FallbackStrategy
  /**
   * Defining which referrer is sent when fetching the resource.
   */
  referrerPolicy?: ReferrerPolicy
}

export interface CImageProps extends UseImageProps, ImageOptions {}

export const CImage = defineComponent({
  name: "CImage",
  props: {
    as: {
      type: [Object, String] as PropType<DOMElements>,
      default: "img",
    },
    fallbackSrc: String as PropType<CImageProps["fallbackSrc"]>,
    loading: String as PropType<CImageProps["loading"]>,
    fit: String as PropType<CImageProps["fit"]>,
    align: String as PropType<CImageProps["align"]>,
    ignoreFallback: Boolean as PropType<CImageProps["ignoreFallback"]>,
    fallbackStrategy: {
      type: String as PropType<CImageProps["fallbackStrategy"]>,
      default: "beforeLoadOrError",
    },
    referrerPolicy: String as PropType<CImageProps["referrerPolicy"]>,
    htmlWidth: [String, Number] as PropType<CImageProps["htmlWidth"]>,
    htmlHeight: [String, Number] as PropType<CImageProps["htmlHeight"]>,
    src: String as PropType<CImageProps["src"]>,
    srcSet: String as PropType<CImageProps["srcSet"]>,
    sizes: String as PropType<CImageProps["sizes"]>,
    onLoad: Function as PropType<CImageProps["onLoad"]>,
    onError: Function as PropType<CImageProps["onError"]>,
    crossOrigin: String as PropType<CImageProps["crossOrigin"]>,
  },
  setup(props, { slots, attrs }) {
    const rest = reactive({
      width: props.htmlWidth,
      height: props.htmlHeight,
      onLoad: props.onLoad,
      onError: props.onError,
    })

    const providedFallback = computed(
      () => props.fallbackSrc !== undefined || !!slots?.default?.()
    )

    const shouldIgnoreFallbackImage = ref<boolean>()

    const showFallbackImage = ref<boolean>(false)
    const { status } = useImage({
      ...props,
      ignoreFallback: computed(() => shouldIgnoreFallbackImage.value),
    })

    watchEffect(() => {
      shouldIgnoreFallbackImage.value =
        props.loading != null ||
        unref(props.ignoreFallback) ||
        !providedFallback.value

      showFallbackImage.value = shouldShowFallbackImage(
        status.value,
        props.fallbackStrategy!
      )
    })

    const shared = computed(() => ({
      objectFit: props.fit,
      objectPosition: props.align,
      ...attrs,
      ...(shouldIgnoreFallbackImage.value
        ? rest
        : omit(rest, ["onError", "onLoad"])),
    }))

    return () => {
      if (showFallbackImage.value) {
        if (slots.default) return slots.default()

        return (
          <chakra.img
            as={CNativeImage}
            class="chakra-image__placeholder"
            src={props.fallbackSrc}
            {...shared.value}
          />
        )
      }

      return (
        <chakra.img
          as={CNativeImage}
          src={props.src}
          srcset={props.srcSet}
          crossOrigin={props.crossOrigin}
          loading={props.loading}
          referrerPolicy={props.referrerPolicy}
          class="chakra-image"
          {...filterUndefined(shared.value)}
        />
      )
    }
  },
}) as any as ChakraFactoryComponent<CImageProps>
