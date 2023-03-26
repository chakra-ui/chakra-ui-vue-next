import { HTMLChakraProps, chakra } from "@chakra-ui/vue-system"
import { defineComponent } from "vue"
import { useTabsContext } from "./tabs.context"

export type CTabPanelsProps = HTMLChakraProps<"div">
export const CTabPanels = defineComponent({
  name: "CTabPanels",
  setup(_, { attrs, slots }) {
    const api = useTabsContext()
    return () => (
      <chakra.div {...attrs} {...api.value.contentGroupProps}>
        {slots.default?.()}
      </chakra.div>
    )
  },
})
