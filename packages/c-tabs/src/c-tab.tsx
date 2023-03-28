import {
  HTMLChakraProps,
  chakra,
  type DOMElements,
} from "@chakra-ui/vue-system"
import {
  defineComponent,
  type Component,
  type DefineComponent,
  type PropType,
} from "vue"
import { CTabTrigger, CTabTriggerProps } from "./c-tab-trigger"
import { useTabsContext } from "./tabs.context"

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
    const api = useTabsContext()

    return () => (
      <CTabTrigger {...props} {...attrs}>
        <chakra.button>{slots.default?.()}</chakra.button>
      </CTabTrigger>
    )
  },
})
