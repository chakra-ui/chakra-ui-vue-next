import { DOMElements, ThemingProps } from "@chakra-ui/vue-system"
import { computed, PropType } from "vue"
import { filterUndefined } from "@chakra-ui/utils"

export const vueThemingProps = {
  colorScheme: String as PropType<ThemingProps["colorScheme"]>,
  variant: String as PropType<ThemingProps["variant"]>,
  size: String as PropType<ThemingProps["size"]>,
  styleConfig: String as PropType<ThemingProps["styleConfig"]>,
}

export const SNA = [Number, String, Array]
export const SAO = [String, Array, Object]
export const SNAO = [Number, String, Array, Object]

export interface BaseThemedComponentProps
  extends Pick<
    ThemingProps,
    "colorScheme" | "variant" | "size" | "styleConfig"
  > {
  as?: DOMElements | "router-link" | "nuxt-link"
}

export const useThemingProps = <O extends ThemingProps & {}>(props: O) =>
  computed<ThemingProps>(() =>
    filterUndefined({
      colorScheme: props.colorScheme,
      variant: props.variant,
      size: props.size,
      styleConfig: props.styleConfig,
    })
  )
