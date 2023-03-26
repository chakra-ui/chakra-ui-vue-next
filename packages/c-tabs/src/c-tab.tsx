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
  watchEffect,
  onMounted,
  onUnmounted,
} from "vue"
import { CTabTrigger, CTabTriggerProps } from "./c-tab-trigger"
import { useTabsContext } from "./tabs.context"
import { useId } from "@chakra-ui/vue-composables"
import { useRef } from "@chakra-ui/vue-utils"

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
    const [ref, refEl] = useRef()

    const api = useTabsContext()
    onMounted(() => api.value.registerTab(refEl))
    onUnmounted(() => api.value.unregisterTab(refEl))

    return () => (
      <CTabTrigger {...props} {...attrs}>
        <chakra.button ref={ref}>{slots.default?.()}</chakra.button>
      </CTabTrigger>
    )
  },
})
