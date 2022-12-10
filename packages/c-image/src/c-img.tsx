import {
  chakra,
  ComponentWithProps,
  DeepPartial,
  HTMLChakraProps,
} from "@chakra-ui/vue-system"
import { h, defineComponent } from "vue"
import { CImageProps } from "./c-image"
import { CNativeImage, NativeImageOptions } from "./c-native-image"

export interface ImgProps extends HTMLChakraProps<"img">, NativeImageOptions {}

/**
 * Fallback component for SSR users who want to use the native `img` with
 * support for chakra props
 */
export const CImg: ComponentWithProps<DeepPartial<CImageProps>> =
  defineComponent({
    name: "CImg",
    setup(_, { attrs }) {
      return () => {
        return <chakra.img as={CNativeImage} class="chakra-image" {...attrs} />
      }
    },
  })
