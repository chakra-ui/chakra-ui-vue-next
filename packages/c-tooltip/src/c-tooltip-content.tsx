import { computed, defineComponent, mergeProps } from "vue"
import { useTooltipContext } from "./tooltip.context"
import {
  HTMLChakraProps,
  ThemingProps,
  chakra,
  useStyleConfig,
} from "@chakra-ui/vue-system"
import { CTooltipPositioner } from "./c-tooltip-positioner"
import { filterUndefined } from "@chakra-ui/utils"
import { vueThemingProps } from "@chakra-ui/vue-utils"

export type CTooltipContentProps = HTMLChakraProps<"div">
export const CTooltipContent = defineComponent({
  name: "CTooltipContent",
  props: vueThemingProps,
  setup(props, { slots, attrs }) {
    const api = useTooltipContext()

    const mergedProps = computed(() => mergeProps(props, attrs))
    const themingProps = computed<ThemingProps>(() =>
      filterUndefined({
        colorScheme: mergedProps.value.colorScheme,
        variant: mergedProps.value.variant,
        size: mergedProps.value.size,
        styleConfig: mergedProps.value.styleConfig,
      })
    )
    console.log("styles", themingProps.value)
    const styles = useStyleConfig("Tooltip", themingProps.value)

    return () => (
      <CTooltipPositioner>
        <chakra.div __css={styles.value} {...api.value.contentProps} {...attrs}>
          {slots.default?.()}
        </chakra.div>
      </CTooltipPositioner>
    )
  },
})
