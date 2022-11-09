import { h, defineComponent, PropType } from "vue"
import { PropsOf } from "@chakra-ui/vue-system"

export interface NativeImageOptions {
  /**
   * The native HTML `width` attribute to the passed to the `img`
   */
  htmlWidth?: string | number
  /**
   * The native HTML `height` attribute to the passed to the `img`
   */
  htmlHeight?: string | number
}

interface NativeImageProps
  extends PropsOf<HTMLImageElement>,
    NativeImageOptions {}

export const CNativeImage = defineComponent({
  name: "CNativeImage",
  props: {
    htmlWidth: [String, Number] as PropType<NativeImageProps["htmlWidth"]>,
    htmlHeight: [String, Number] as PropType<NativeImageProps["htmlHeight"]>,
    alt: String as PropType<NativeImageProps["alt"]>,
  },
  setup(props, { attrs }) {
    return () => (
      <img
        width={props.htmlWidth}
        height={props.htmlHeight}
        alt={props.alt}
        {...attrs}
      />
    )
  },
})
