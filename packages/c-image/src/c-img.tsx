import { chakra, HTMLChakraProps } from "@chakra-ui/vue-system"
import { h, defineComponent, PropType } from "vue"
import { CNativeImage, NativeImageOptions } from "./c-native-image"

export interface CImgProps extends HTMLChakraProps<"img">, NativeImageOptions {}

/**
 * Fallback component for SSR users who want to use the native `img` with
 * support for chakra props
 */
export const CImg = defineComponent({
  name: "CImg",
  props: {
    htmlWidth: Number as PropType<number>,
    htmlHeight: Number as PropType<number>,
  },
  setup(props, { attrs }) {
    return () => {
      return (
        <chakra.img
          as={CNativeImage}
          class="chakra-image"
          {...props}
          {...attrs}
        />
      )
    }
  },
})
