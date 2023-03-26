import { HTMLChakraProps, chakra } from "@chakra-ui/vue-system"
import { defineComponent, watchEffect } from "vue"
import { useTabsContext } from "./tabs.context"

export type CTabListProps = HTMLChakraProps<"div">

/**
 * `<CTabList />` is used to wrap all the tab components
 */
export const CTabList = defineComponent({
  name: "CTabList",
  setup(_, { attrs, slots }) {
    const api = useTabsContext()

    return () => (
      <chakra.div {...api.value.tablistProps} {...attrs}>
        {slots.default?.()}
      </chakra.div>
    )
  },
})
