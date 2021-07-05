import { ComponentWithProps, DeepPartial } from '@chakra-ui/vue-system'
import { defineComponent, PropType, h } from 'vue'
import { DrawerContentProps } from './c-drawer'
import { CModal, CModalContent, CModalProps, modalProps } from "./c-modal"

export interface CAlertDialogProps extends Omit<CModalProps, "initialFocusRef"> {
  leastDestructiveRef: CModalProps["initialFocusRef"]
}

/**
 * CAlertDialog
 * Data wrapper for the alert dialog component
 */
export const CAlertDialog: ComponentWithProps<DeepPartial<CAlertDialogProps>> = defineComponent({
  name: 'CAlertDialog',
  props: {
    ...modalProps,
    leastDestructiveRef: [String, Object] as PropType<CModalProps['initialFocusRef']>
  },
  setup(props, { attrs, slots, emit }) {
    const handleUpdateModelValue = (val: boolean) => {
      emit('update:modelValue', val)
    }
    const closeDrawer = () => {
      emit('update:modelValue', false)
    }
    return () => (
      // @ts-expect-error modelValue props
      <CModal {...props} {...attrs} modelValue={props.modelValue as boolean} onUpdate:modelValue={handleUpdateModelValue} onClose={closeDrawer} initialFocusRef={props.leastDestructiveRef}>
        {slots}
      </CModal>
    )
  }
})

/**
 * CAlertDialogContent
 * Wrapper for the alert dialog content
 */
export const CAlertDialogContent: ComponentWithProps<DeepPartial<DrawerContentProps>> = defineComponent({
  name: 'CAlertDialogContent',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => (
      // @ts-expect-error role HTMLAttribute
      <CModalContent {...attrs} role="alertdialog">
        {slots}
      </CModalContent>
    )
  }
})

export {
  CModalBody as CAlertDialogBody,
  CModalCloseButton as CAlertDialogCloseButton,
  CModalFooter as CAlertDialogFooter,
  CModalHeader as CAlertDialogHeader,
  CModalOverlay as CAlertDialogOverlay,
} from "./c-modal"