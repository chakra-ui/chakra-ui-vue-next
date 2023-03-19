/**
 * Hey! Welcome to @chakra-ui/vue-next CTooltip
 *
 * A tooltip is a brief informative message that appears when a user interacts with an element
 *
 * @see Docs     https://next.vue.chakra-ui.com/c-tooltip
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/main/packages/c-tooltip/src/c-tooltip/c-tooltip.ts
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 */

import {
  computed,
  defineComponent,
  h,
  Fragment,
  PropType,
  watch,
  mergeProps,
  watchEffect,
} from "vue"
import { TooltipProvider } from "./tooltip.context"
import { UseTooltipProps, useTooltip } from "./use-tooltip"
import type * as PP from "@zag-js/popper"
import { filterUndefined } from "@chakra-ui/utils"
import { useId } from "@chakra-ui/vue-composables"
import { VueTooltipProps, CTooltipPropsBase } from "./tooltip.props"

export type { CTooltipPropsBase as CTooltipProps }

/**
 * Ths tooltip compoennt is a wrapper for the tooltip root and trigger
 * and will display the tooltip content
 */
export const CTooltipRoot = defineComponent({
  name: "CTooltipRoot",
  props: VueTooltipProps,
  emits: ["open", "close"],
  setup(props, { slots, emit, attrs }) {
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
