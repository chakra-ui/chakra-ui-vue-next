/**
 * Hey! Welcome to @chakra-ui/vue-next CTooltip
 *
 * A tooltip is a brief informative message that appears when a user interacts with an element
 *
 * @see Docs     https://next.vue.chakra-ui.com/c-tooltip
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/main/packages/c-tooltip/src/c-tooltip/c-tooltip.ts
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 */

import { computed, defineComponent, h, Fragment, PropType, watch } from "vue"
import { TooltipProvider } from "./tooltip.context"
import { useTooltip, UseTooltipProps } from "./use-tooltip"
import type * as PP from "@zag-js/popper"
import { filterUndefined } from "@chakra-ui/utils"
import { useId } from "@chakra-ui/vue-composables"
import { useMotions } from "@vueuse/motion"

type UseTooltipPropsContext = UseTooltipProps["context"]

export type CTooltipProps = UseTooltipPropsContext

const VueTooltipProps = {
  ids: {
    type: Object as PropType<CTooltipProps["ids"]>,
  },
  openDelay: {
    type: Number as PropType<CTooltipProps["openDelay"]>,
    default: 0,
  },
  closeDelay: {
    type: Number as PropType<CTooltipProps["closeDelay"]>,
    default: 0,
  },
  closeOnPointerDown: {
    type: Boolean as PropType<CTooltipProps["closeOnPointerDown"]>,
  },
  closeOnEsc: {
    type: Boolean as PropType<CTooltipProps["closeOnEsc"]>,
    default: true,
  },
  interactive: {
    type: Boolean as PropType<CTooltipProps["interactive"]>,
  },
  "aria-label": {
    type: String as PropType<CTooltipProps["aria-label"]>,
  },
  positioning: {
    type: Object as PropType<CTooltipProps["positioning"]>,
  },
  disabled: {
    type: Boolean as PropType<CTooltipProps["disabled"]>,
  },
  getRootNode: {
    type: Function as PropType<CTooltipProps["getRootNode"]>,
  },
}

export const CTooltip = defineComponent({
  name: "Tooltip",
  props: VueTooltipProps,
  emits: ["open", "close"],
  setup(props, { slots, emit }) {
    const tooltipProps = computed<UseTooltipProps>(() => ({
      context: filterUndefined(props),
      emit,
    }))

    const transitionId = useId(undefined, "transition:toolip")

    const api = useTooltip(tooltipProps.value)

    const tooltipApi = computed(() => ({
      ...api.value,
      transitionId: transitionId.value,
    }))

    TooltipProvider(tooltipApi)
    return () => slots?.default?.()
  },
})
