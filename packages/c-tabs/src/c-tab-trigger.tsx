import { HTMLChakraProps, chakra } from "@chakra-ui/vue-system"
import { PropType, defineComponent, onMounted, watchEffect } from "vue"
import { useTabsContext } from "./tabs.context"
import type { connect } from "@zag-js/tabs"
import { useRef, withSingleton } from "@chakra-ui/vue-utils"
import { useId } from "@chakra-ui/vue-composables"

export type CTabTriggerProps = Parameters<
  ReturnType<typeof connect>["getTriggerProps"]
>[0]
export const CTabTrigger = defineComponent({
  name: "CTabTrigger",
  props: {
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
    const id = useId()

    return () =>
      withSingleton(slots, "CTabTrigger", {
        ...api.value.getTriggerProps({
          value: props.value,
          disabled: props.disabled,
        }),
        ...attrs,
      })
  },
})
