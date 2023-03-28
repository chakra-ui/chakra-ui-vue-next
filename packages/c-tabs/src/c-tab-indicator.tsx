import { HTMLChakraProps, chakra } from "@chakra-ui/vue-system"
import { computed, defineComponent } from "vue"
import { useTabsContext } from "./tabs.context"

export type CTabIndicatorProps = HTMLChakraProps<"div">
export const CTabIndicator = defineComponent({
  name: "CTabIndicator",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    const api = useTabsContext()
    const tabIndicatorProps = computed(() => {
      const { indicatorStyles, ...otherProps } = api.value.indicatorProps || {}
      const { style, ...otherAttrs } = attrs || {}
      return {
        style: {
          ...(indicatorStyles || {}),
          ...(style || {}),
        },
        others: {
          ...otherProps,
          ...otherAttrs,
        },
      }
    })
    return () => (
      <chakra.div
        style={tabIndicatorProps.value.style}
        {...tabIndicatorProps.value.others}
        {...attrs}
      >
        {slots.default?.()}
      </chakra.div>
    )
  },
})
