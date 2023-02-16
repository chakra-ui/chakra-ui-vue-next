import { getValidChildren, vueThemingProps } from "@chakra-ui/vue-utils"
import { h, defineComponent, PropType, computed } from "vue"
import {
  chakra,
  DOMElements,
  ThemingProps,
  useStyleConfig,
} from "@chakra-ui/vue-system"
import { filterUndefined } from "@chakra-ui/utils"

export const CCode = defineComponent({
  props: {
    as: {
      type: [Object, String] as PropType<DOMElements>,
      default: "code",
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
    const styles = useStyleConfig("Code", themingProps)

    return () => {
      return (
        <chakra.code
          as={props.as}
          __css={{
            display: "inline-block",
            verticalAlign: "middle",
            fontSize: "sm",
            px: "0.2em",
            fontFamily: "mono",
            rounded: "sm",
            ...styles.value,
          }}
          {...attrs}
        >
          {() => getValidChildren(slots)}
        </chakra.code>
      )
    }
  },
})
