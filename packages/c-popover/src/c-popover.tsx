/**
 * Hey! Welcome to @chakra-ui/vue-next CPopover
 *
 * Popover is a non modal dialog that floats around a trigger
 *
 * @see Docs     https://next.vue.chakra-ui.com/c-popover
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/main/packages/c-popover/src/c-popover/c-popover.ts
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 */

import type * as PP from "@zag-js/popover"
import type * as P from "@zag-js/popper"

import { computed, defineComponent, mergeProps, PropType } from "vue"
import { PopoverProvider, PopoverStylesProvider } from "./popover.context"
import { usePopover, type UsePopoverProps } from "./use-popover"
import { wait } from "./popover.utils"
import { useId } from "@chakra-ui/vue-composables"
import { useMultiStyleConfig } from "@chakra-ui/vue-system"
import { vueThemingProps } from "@chakra-ui/vue-utils"

type PopoverPropsContext = UsePopoverProps["context"]

export interface CPopoverProps extends PopoverPropsContext {
  trigger: "click" | "hover"
}

const props = {
  autoFocus: {
    type: Boolean as PropType<CPopoverProps["autoFocus"]>,
  },
  closeOnEsc: {
    type: Boolean as PropType<CPopoverProps["closeOnEsc"]>,
  },
  closeOnInteractOutside: {
    type: Boolean as PropType<CPopoverProps["closeOnInteractOutside"]>,
  },
  getRootNode: {
    type: Function as PropType<CPopoverProps["getRootNode"]>,
  },
  id: {
    type: String as PropType<CPopoverProps["id"]>,
  },
  ids: {
    type: Object as PropType<CPopoverProps["ids"]>,
  },
  initialFocusEl: {
    type: [Object, Function] as PropType<CPopoverProps["initialFocusEl"]>,
  },
  isOpen: {
    type: Boolean as PropType<CPopoverProps["isOpen"]>,
  },
  modal: {
    type: Boolean as PropType<CPopoverProps["modal"]>,
  },
  portalled: {
    type: Boolean as PropType<CPopoverProps["portalled"]>,
  },
  positioning: {
    type: Object as PropType<CPopoverProps["positioning"]>,
  },
  trigger: {
    type: String as PropType<CPopoverProps["trigger"]>,
    default: "click",
  },
  ...vueThemingProps,
}

export const CPopover = defineComponent({
  name: "CPopover",
  props,
  emits: [
    "open-change",
    "escape-key-down",
    "pointer-down-outside",
    "focus-outside",
    "interact-outside",
  ],
  setup(props, { slots, attrs, emit }) {
    const popoverProps = computed<UsePopoverProps>(() => ({
      context: props,
      emit,
    }))

    const mergedProps = computed(() => mergeProps(props, attrs))

    const styles = useMultiStyleConfig("Popover", mergedProps.value)

    const transitionId = useId(
      popoverProps.value.context.id,
      "transition:popover:"
    )

    const api = usePopover(popoverProps.value)

    const popoverApi = computed(() => ({
      ...api.value,
      wait,
      trigger: props.trigger,
      close: () => api.value.close(),
    }))

    PopoverProvider(popoverApi)
    PopoverStylesProvider(styles)
    return () => slots.default?.(api.value)
  },
})
