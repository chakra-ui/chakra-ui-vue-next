/**
 * Hey! Welcome to @chakra-ui/vue-next CPopover
 *
 * Popover is a non modal dialog that floats around a trigger
 *
 * @see Docs     https://next.vue.chakra-ui.com/c-popover
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/main/packages/c-popover/src/c-popover/c-popover.ts
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 */

import { computed, defineComponent, PropType } from "vue"
import { PopoverProvider } from "./popover.context"
import { usePopover, UsePopoverProps } from "./use-popover"
import type * as Z from "@zag-js/types"
import type * as PO from "@zag-js/popover"
import type * as PP from "@zag-js/popper"

type PopoverPropsContext = UsePopoverProps["context"]

export type CPopoverProps = PopoverPropsContext

const VuePopoverProps = {
  autoFocus: {
    type: Boolean as PropType<CPopoverProps["autoFocus"]>,
  },
  closeOnEsc: {
    type: Boolean as PropType<CPopoverProps["closeOnEsc"]>,
  },
  closeOnInteractOutside: {
    type: Boolean as PropType<CPopoverProps["closeOnInteractOutside"]>,
  },
  defaultOpen: {
    type: Boolean as PropType<CPopoverProps["defaultOpen"]>,
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
}

export const CPopover = defineComponent({
  name: "CPopover",
  props: VuePopoverProps,
  emits: [
    "open-change",
    "escape-key-down",
    "pointer-down-outside",
    "focus-outside",
    "interact-outside",
  ],
  setup(props, { slots, emit }) {
    const popoverProps = computed<UsePopoverProps>(() => ({
      context: props,
      emit,
    }))

    const api = usePopover(popoverProps.value)

    PopoverProvider(api)

    return () => slots.default?.()
  },
})
