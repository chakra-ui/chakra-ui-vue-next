import { chakra } from "@chakra-ui/vue-system"
import { computed, defineComponent, h } from "vue"
import { CPortal } from "@chakra-ui/c-portal"

import { useMenu, useStyles } from "./c-menu"
import { getValidChildren } from "@chakra-ui/vue-utils"

export const CMenuList = defineComponent({
  setup(_, { slots, attrs }) {
    const styles = useStyles()
    const listStyles = computed(() => ({
      outline: 0,
      ...styles.value.list,
    }))
    const { root } = useMenu()
    return () => (
      <CPortal to="body">
        <chakra.div
          __label="menu-list-container"
          {...root.value.positionerProps}
          {...attrs}
        >
          <chakra.ul
            __label="menu-list"
            __css={listStyles.value}
            {...root.value.contentProps}
          >
            {() => getValidChildren(slots)}
          </chakra.ul>
        </chakra.div>
      </CPortal>
    )
  },
})
