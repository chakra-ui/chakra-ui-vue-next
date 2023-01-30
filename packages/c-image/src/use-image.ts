import {
  computed,
  unref,
  ComputedRef,
  ImgHTMLAttributes,
  ref,
  watchPostEffect,
} from "vue"

type NativeImageProps = ImgHTMLAttributes

export interface UseImageProps {
  /**
   * The image `src` attribute
   */
  src?: string
  /**
   * The image `srcset` attribute
   */
  srcSet?: string
  /**
   * The image `sizes` attribute
   */
  sizes?: string
  /**
   * A callback for when the image `src` has been loaded
   */
  onLoad?: NativeImageProps["onLoad"]
  /**
   * A callback for when there was an error loading the image `src`
   */
  onError?: NativeImageProps["onError"]
  /**
   * If `true`, opt out of the `fallbackSrc` logic and use as `img`
   */
  ignoreFallback?: boolean | ComputedRef<boolean | undefined>
  /**
   * The key used to set the crossOrigin on the HTMLImageElement into which the image will be loaded.
   * This tells the browser to request cross-origin access when trying to download the image data.
   */
  crossOrigin?: HTMLImageElement["crossOrigin"]
  loading?: HTMLImageElement["loading"]
}

type Status = "failed" | "pending" | "loaded"

export type FallbackStrategy = "onError" | "beforeLoadOrError"

export function useImage(props: UseImageProps) {
  const {
    loading,
    src,
    srcSet,
    onLoad,
    onError,
    crossOrigin,
    sizes,
    ignoreFallback,
  } = props

  const status = ref<Status>("pending")

  const load = () => {
    if (!src) return

    const image = new Image()

    if (image) {
      image.src = src
      if (crossOrigin) image.crossOrigin = crossOrigin
      if (srcSet) image.srcset = srcSet
      if (sizes) image.sizes = sizes

      image.onload = (event: Event) => {
        status.value = "loaded"
        onLoad?.(event as unknown as Event)
      }

      image.onerror = (error) => {
        status.value = "failed"
        onError?.(error as any)
      }
    }
  }

  watchPostEffect(() => {
    /**
     * If user opts out of the fallback/placeholder
     * logic, let's bail out.
     */
    if (unref(ignoreFallback)) {
      return
    }

    if (src) {
      load()
    }
  })

  /**
   * If user opts out of the fallback/placeholder
   * logic, let's just return 'loaded'
   */
  return {
    status: computed(() => (unref(ignoreFallback) ? "loaded" : status.value)),
  }
}

export const shouldShowFallbackImage = (
  status: Status,
  fallbackStrategy: FallbackStrategy
) => {
  return (
    (status !== "loaded" && fallbackStrategy === "beforeLoadOrError") ||
    (status === "failed" && fallbackStrategy === "onError")
  )
}
