import {
  type DOMElements,
  type HTMLChakraProps,
  chakra,
} from "@chakra-ui/vue-system"
import {
  type Component,
  type DefineComponent,
  type PropType,
  defineComponent,
} from "vue"
import { useTabsContext, useTabsStyles } from "./tabs.context"
import type { connect } from "@zag-js/tabs"

type GetContentProps = Parameters<
  ReturnType<typeof connect>["getContentProps"]
>[0]

export type CTabPanelProps = HTMLChakraProps<"div"> & GetContentProps

export const CTabPanel = defineComponent({
  name: "CTabPanel",
  props: {
    as: {
      type: [Object, String] as PropType<
        DOMElements | Component | DefineComponent
      >,
      default: "div",
    },
    value: {
      type: String as PropType<CTabPanelProps["value"]>,
      required: true,
    },
  },
  setup(props, { attrs, slots }) {
    const api = useTabsContext()
    const styles = useTabsStyles()

    return () => (
      <chakra.div
        as={props.as}
        {...api.value.getContentProps({ value: props.value })}
        __label="tabs__tabpanel"
        __css={styles.value.tabpanel}
        {...attrs}
      >
        {slots.default?.()}
      </chakra.div>
    )
  },
})
