import { vueThemingProps } from "@chakra-ui/vue-utils"
import {
  chakra,
  DOMElements,
  ThemingProps,
  useStyleConfig,
  HTMLChakraProps,
  ComponentWithProps,
  DeepPartial,
} from "@chakra-ui/vue-system"
import { computed, defineComponent, h, PropType } from "vue"
import { filterUndefined } from "@chakra-ui/utils"

export interface HeadingProps
  extends HTMLChakraProps<"h2">,
  ThemingProps<"Heading"> { }

export const CHeading: ComponentWithProps<DeepPartial<HeadingProps>> =
  defineComponent({
    name: "CHeading",
    props: {
      as: {
        type: [String, Object] as PropType<DOMElements>,
        default: "h2",
      },
      ...vueThemingProps,
    },
    setup(props, { slots, attrs }) {
      const themingProps = computed<ThemingProps>(() =>
        filterUndefined({
          colorScheme: props.colorScheme,
          variant: props.variant,
          size: props.size,
          styleConfig: props.styleConfig,
        })
      )
      const styles = useStyleConfig("Heading", themingProps)

      return () => (
        <chakra.h2
          as={props.as}
          __label="heading"
          __css={styles.value}
          {...attrs}
        >
          {slots}
        </chakra.h2>
      )
    },
  })
