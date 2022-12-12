import {
  computed,
  unref,
  ComputedRef,
  ImgHTMLAttributes,
  ref,
  watchSyncEffect,
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

  let imageRef: HTMLImageElement | null

  const flush = () => {
    if (imageRef) {
      imageRef.onload = null
      imageRef.onerror = null
      imageRef = null
    }
  }

  const load = () => {
    if (!src) return

    flush()

    // Create instance to check content for status
    const img = new Image()
    img.src = src
    if (crossOrigin) img.crossOrigin = crossOrigin
    if (srcSet) img.srcset = srcSet
    if (sizes) img.sizes = sizes
    if (loading) img.loading = loading

    img.onload = (event: Event) => {
      flush()
      status.value = "loaded"
      onLoad?.(event as unknown as Event)
    }

    img.onerror = (error) => {
      flush()
      status.value = "failed"
      onError?.(error as any)
    }

    imageRef = img
  }

  watchSyncEffect(() => {
    /**
     * If user opts out of the fallback/placeholder
     * logic, let's bail out.
     */
    if (unref(ignoreFallback)) return undefined

    if (src) {
      // Loading...
      load()
    }
  })

  /**
   * If user opts out of the fallback/placeholder
   * logic, let's just return 'loaded'
   */
  return computed(() => (unref(ignoreFallback) ? "loaded" : status.value))
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
