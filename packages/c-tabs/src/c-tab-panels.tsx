import { HTMLChakraProps, chakra } from "@chakra-ui/vue-system"
import { defineComponent } from "vue"
import { useTabsContext, useTabsStyles } from "./tabs.context"

export type CTabPanelsProps = HTMLChakraProps<"div">
export const CTabPanels = defineComponent({
  name: "CTabPanels",
  setup(_, { attrs, slots }) {
    const api = useTabsContext()
    const styles = useTabsStyles()
    return () => (
      <chakra.div
        {...api.value.contentGroupProps}
        __label="tabs__tabpanels"
        __css={styles.value.tabpanels}
        {...attrs}
      >
        {slots.default?.()}
      </chakra.div>
    )
  },
})
