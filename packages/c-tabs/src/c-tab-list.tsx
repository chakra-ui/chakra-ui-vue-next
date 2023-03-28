import {
  HTMLChakraProps,
  SystemStyleObject,
  chakra,
} from "@chakra-ui/vue-system"
import { computed, defineComponent, watchEffect } from "vue"
import { useTabsContext, useTabsStyles } from "./tabs.context"

export type CTabListProps = HTMLChakraProps<"div">

/**
 * `<CTabList />` is used to wrap all the tab components
 */
export const CTabList = defineComponent({
  name: "CTabList",
  setup(_, { attrs, slots }) {
    const api = useTabsContext()

    const styles = useTabsStyles()

    const tablistStyles = computed<SystemStyleObject>(() => ({
      display: "flex",
      ...styles.value.tablist,
    }))

    return () => (
      <chakra.div
        __label="tabs__tablist"
        __css={tablistStyles.value}
        {...api.value.tablistProps}
        {...attrs}
      >
        {slots.default?.()}
      </chakra.div>
    )
  },
})
