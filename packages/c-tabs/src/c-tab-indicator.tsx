import { HTMLChakraProps, chakra } from "@chakra-ui/vue-system"
import { defineComponent } from "vue"
import { useTabsContext } from "./tabs.context"

export type CTabIndicatorProps = HTMLChakraProps<"div">
export const CTabIndicator = defineComponent({
  name: "CTabIndicator",
  setup(_, { attrs, slots }) {
    const api = useTabsContext()
    return () => (
      <chakra.div {...api.value.indicatorProps} {...attrs}>
        {slots.default?.()}
      </chakra.div>
    )
  },
})
