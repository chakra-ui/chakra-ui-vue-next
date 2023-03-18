import { PropType } from "vue"
import { type UseTooltipProps } from "./use-tooltip"

export type UseTooltipPropsContext = UseTooltipProps["context"]

export type CTooltipProps = UseTooltipPropsContext

export const VueTooltipProps = {
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
