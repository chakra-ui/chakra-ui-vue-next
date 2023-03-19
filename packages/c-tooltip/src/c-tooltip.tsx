import {
  PropType,
  defineComponent,
  h,
  Fragment,
  mergeProps,
  computed,
} from "vue"

import { getValidChildren, withSingleton } from "@chakra-ui/vue-utils"
import { CTooltipTrigger } from "./c-tooltip-trigger"
import { VueTooltipProps, CTooltipPropsBase } from "./tooltip.props"
import type * as PP from "@zag-js/popper"
import { CTooltipRoot } from "./c-tooltip-root"
import { chakra } from "@chakra-ui/vue-system"
import { CTooltipContent } from "./c-tooltip-content"
import { CTooltipArrow } from "./c-tooltip-arrow"

export type CTooltipPlacement = PP.Placement

export const CTooltip = defineComponent({
  name: "CTooltip",
  props: {
    ...VueTooltipProps,
    placement: {
      type: String as PropType<PP.Placement>,
      default: "bottom",
    },
    label: String as PropType<string>,
    hasArrow: Boolean as PropType<boolean>,
  },
  inheritAttrs: false,
  emits: ["open", "close"],
  setup(props, { slots, emit, attrs }) {
    const mergedProps = mergeProps(props, {
      positioning: {
        ...props.positioning,
        placement: props.placement,
      },
    })
    const shouldWrapChildren = computed(
      () => typeof getValidChildren(slots)?.[0]?.children === "string"
    )
    return () => {
      if (!props.label) return slots.default?.()
      const { label, hasArrow, ...rest } = mergedProps

      return (
        <CTooltipRoot
          {...rest}
          onOpen={(...e) => emit("open", ...e)}
          onClose={(...e) => emit("close", ...e)}
        >
          <CTooltipTrigger>
            {shouldWrapChildren.value ? (
              <chakra.span display={"inline-block"} tabindex={0}>
                {slots?.default?.()}
              </chakra.span>
            ) : (
              withSingleton(slots, "CTooltip")
            )}
          </CTooltipTrigger>
          <CTooltipContent {...attrs}>
            {props.hasArrow && <CTooltipArrow />}
            {props.label}
          </CTooltipContent>
        </CTooltipRoot>
      )
    }
  },
})
