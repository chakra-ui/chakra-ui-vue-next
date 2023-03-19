import { PropType } from "vue"
import { type UseTooltipProps } from "./use-tooltip"

type UseTooltipPropsContext = UseTooltipProps["context"]
export type CTooltipPropsBase = UseTooltipPropsContext

export const VueTooltipProps = {
  ids: {
    type: Object as PropType<CTooltipPropsBase["ids"]>,
  },
  openDelay: {
    type: Number as PropType<CTooltipPropsBase["openDelay"]>,
    default: 0,
  },
  closeDelay: {
    type: Number as PropType<CTooltipPropsBase["closeDelay"]>,
    default: 0,
  },
  closeOnPointerDown: {
    type: Boolean as PropType<CTooltipPropsBase["closeOnPointerDown"]>,
  },
  closeOnEsc: {
    type: Boolean as PropType<CTooltipPropsBase["closeOnEsc"]>,
    default: true,
  },
  interactive: {
    type: Boolean as PropType<CTooltipPropsBase["interactive"]>,
  },
  "aria-label": {
    type: String as PropType<CTooltipPropsBase["aria-label"]>,
  },
  positioning: {
    type: Object as PropType<CTooltipPropsBase["positioning"]>,
  },
  disabled: {
    type: Boolean as PropType<CTooltipPropsBase["disabled"]>,
  },
  getRootNode: {
    type: Function as PropType<CTooltipPropsBase["getRootNode"]>,
  },
}
