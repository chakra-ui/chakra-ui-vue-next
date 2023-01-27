import { ComponentWithProps, DeepPartial } from "@chakra-ui/vue-system"
import { defineComponent, PropType, h, computed } from "vue"
import {
  CModal,
  CModalContent,
  CModalProps,
  modalProps,
  CModalContentProps,
} from "./c-modal"

import {
  CModalBody,
  CModalCloseButton,
  CModalFooter,
  CModalHeader,
  CModalOverlay,
} from "./c-modal"

export interface CAlertDialogProps
  extends Omit<CModalProps, "initialFocusRef" | "closeModal" | "handleEscape"> {
  leastDestructiveRef: CModalProps["initialFocusRef"]
}

/**
 * CAlertDialog
 * Data wrapper for the alert dialog component
 */
export const CAlertDialog = defineComponent({
  name: "CAlertDialog",
  props: {
    ...modalProps,
    leastDestructiveRef: [Function, String] as PropType<
      CModalProps["initialFocusRef"]
    >,
  },
  emits: ["update:modelValue", "close", "escape"],
  setup(props, { attrs, slots, emit }) {
    const isOpen = computed(() => props.modelValue!)

    const handleUpdateModelValue = (val: boolean) => {
      emit("update:modelValue", val)
    }

    return () => {
      const {
        modelValue,
        "onUpdate:modelValue": updateModelValue,
        ...rest
      } = props
      return (
        <CModal
          {...rest}
          {...attrs}
          modelValue={isOpen.value}
          /* eslint-disable-next-line */
          onUpdate:modelValue={handleUpdateModelValue}
          label="alertdialog"
          initialFocusRef={props.leastDestructiveRef}
        >
          {slots}
        </CModal>
      )
    }
  },
})

/**
 * CAlertDialogContent
 * Wrapper for the alert dialog content
 */
export const CAlertDialogContent = defineComponent({
  name: "CAlertDialogContent",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => (
      <CModalContent {...attrs} role="alertdialog">
        {slots}
      </CModalContent>
    )
  },
})

export const CAlertDialogBody = defineComponent({
  name: "CAlertDialogBody",
  extends: CModalBody,
})

export const CAlertDialogCloseButton = defineComponent({
  name: "CAlertDialogCloseButton",
  extends: CModalCloseButton,
})

export const CAlertDialogFooter = defineComponent({
  name: "CAlertDialogFooter",
  extends: CModalFooter,
})

export const CAlertDialogHeader = defineComponent({
  name: "CAlertDialogHeader",
  extends: CModalHeader,
})

export const CAlertDialogOverlay = defineComponent({
  name: "CAlertDialogOverlay",
  extends: CModalOverlay,
})
