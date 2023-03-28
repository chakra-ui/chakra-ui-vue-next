import {
  type HTMLChakraProps,
  chakra,
  type DOMElements,
  type SystemStyleObject,
} from "@chakra-ui/vue-system"
import {
  defineComponent,
  type Component,
  type DefineComponent,
  type PropType,
  computed,
} from "vue"
import { CTabTrigger, type CTabTriggerProps } from "./c-tab-trigger"
import { useTabsContext, useTabsStyles } from "./tabs.context"

export type CTabProps = HTMLChakraProps<"div">
export const CTab = defineComponent({
  name: "CTab",
  props: {
    as: {
      type: [Object, String] as PropType<
        DOMElements | Component | DefineComponent
      >,
      default: "button",
    },
    value: {
      type: String as PropType<CTabTriggerProps["value"]>,
      required: true,
    },
    disabled: {
      type: Boolean as PropType<CTabTriggerProps["disabled"]>,
    },
  },
  setup(props, { attrs, slots }) {
    const styles = useTabsStyles()
    const tabStyles = computed<SystemStyleObject>(() => ({
      outline: "0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ...styles.value.tab,
    }))

    return () => (
      <CTabTrigger
        {...props}
        {...attrs}
        __label="tabs__tab"
        __css={tabStyles.value}
      >
        <chakra.button>{slots.default?.()}</chakra.button>
      </CTabTrigger>
    )
  },
})
