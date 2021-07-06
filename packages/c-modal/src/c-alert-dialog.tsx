import { ComponentWithProps, DeepPartial } from '@chakra-ui/vue-system'
import { defineComponent, PropType, h, ref, watch } from 'vue'
import {
  CModal,
  CModalContent,
  CModalProps,
  modalProps,
  CModalContentProps,
} from './c-modal'

export interface CAlertDialogProps
  extends Omit<CModalProps, 'initialFocusRef' | 'closeModal' | 'handleEscape'> {
  leastDestructiveRef: CModalProps['initialFocusRef']
}

/**
 * CAlertDialog
 * Data wrapper for the alert dialog component
 */
export const CAlertDialog: ComponentWithProps<
  DeepPartial<CAlertDialogProps>
> = defineComponent({
  name: 'CAlertDialog',
  props: {
    ...modalProps,
    leastDestructiveRef: [String, Object] as PropType<
      CModalProps['initialFocusRef']
    >,
  },
  emits: ['update:modelValue', 'close', 'escape'],
  setup(props, { attrs, slots, emit }) {
    const handleUpdateModelValue = (val: boolean) => {
      emit('update:modelValue', val)
    }
    const closeDrawer = () => {
      emit('update:modelValue', false)
    }

    const isOpen = ref(props.modelValue)

    watch(isOpen, (newVal) => {
      emit('update:modelValue', newVal)
    })

    return () => (
      <CModal
        {...props}
        {...attrs}
        label='alertdialog'
        v-model={isOpen.value}
        onClose={closeDrawer}
        initialFocusRef={props.leastDestructiveRef}
      >
        {slots}
      </CModal>
    )
  },
})

/**
 * CAlertDialogContent
 * Wrapper for the alert dialog content
 */
export const CAlertDialogContent: ComponentWithProps<
  DeepPartial<CModalContentProps>
> = defineComponent({
  name: 'CAlertDialogContent',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => (
      <CModalContent {...attrs} role="alertdialog">
        {slots}
      </CModalContent>
    )
  },
})

export {
  CModalBody as CAlertDialogBody,
  CModalCloseButton as CAlertDialogCloseButton,
  CModalFooter as CAlertDialogFooter,
  CModalHeader as CAlertDialogHeader,
  CModalOverlay as CAlertDialogOverlay,
} from './c-modal'
