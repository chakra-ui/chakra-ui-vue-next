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
import {
  useDeferredDisclosure,
  usePopover,
  UsePopoverProps,
} from "./use-popover"
import type * as ZP from "@zag-js/popper"
import { useId } from "@chakra-ui/vue-composables"
import { useMotions } from "@vueuse/motion"

type PopoverPropsContext = UsePopoverProps["context"]

export interface CPopoverProps extends PopoverPropsContext {
  trigger: "click" | "hover"
}

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
  trigger: {
    type: String as PropType<CPopoverProps["trigger"]>,
    default: "click",
  },
}

function wait(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay))
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

    const transitionId = useId(
      popoverProps.value.context.id,
      "transition:popover:"
    )

    /** Handles exit transition */
    const leaveTransition = (done: VoidFunction) => {
      const motions = useMotions()
      const instance = motions[transitionId.value]
      instance?.leave(() => {
        done()
      })
    }

    const enterTransition = async (done: VoidFunction) => {
      const motions = useMotions()
      const instance = motions[transitionId.value]
      await instance.apply("enter")
      done()
    }

    const api = usePopover(popoverProps.value)
    const nativeIsOpen = computed(() => api.value.isOpen)

    const { isOpenDeferred } = useDeferredDisclosure(nativeIsOpen)
    const popoverApi = computed(() => ({
      ...api.value,
      deferredIsOpen: isOpenDeferred.value,
      leaveTransition,
      enterTransition,
      wait,
      transitionId: transitionId.value,
      trigger: props.trigger,
    }))

    PopoverProvider(popoverApi)
    return () => slots.default?.()
  },
})
