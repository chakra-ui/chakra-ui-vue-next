/**
 * Hey! Welcome to @chakra-ui/vue-next CModal
 *
 * An accessible dialog modal component for chakra ui vue.
 *
 * @see Docs     https://next.vue.chakra-ui.com/modal
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/master/packages/c-modal/src/c-modal.ts
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 */

import {
  h,
  defineComponent,
  PropType,
  reactive,
  ComputedRef,
  Ref,
  toRefs,
  computed,
  ToRefs,
  unref,
  ref,
  mergeProps,
  Fragment,
  watch,
} from 'vue'
import {
  chakra,
  DOMElements,
  StylesProvider,
  SystemStyleObject,
  useMultiStyleConfig,
  useStyles,
} from '@chakra-ui/vue-system'
import { createContext, TemplateRef } from '@chakra-ui/vue-utils'
import { CPortal } from '@chakra-ui/c-portal'
import { FocusLockOptions, useFocusLock } from '@chakra-ui/c-focus-lock'
import { CScrollLock } from '@chakra-ui/c-scroll-lock'

import { useModal, UseModalOptions, UseModalReturn } from './use-modal'
import { FocusableElement } from '@chakra-ui/utils'

type ScrollBehavior = 'inside' | 'outside'
type MotionPreset = 'slideInBottom' | 'slideInRight' | 'scale' | 'none'

export interface ModalOptions
  extends Omit<FocusLockOptions, 'enabled' | 'closeModal' | 'handleEscape'> {
  /**
   *  If `true`, the modal will be centered on screen.
   * @default false
   */
  isCentered?: boolean
  /**
   * Where scroll behavior should originate.
   * - If set to `inside`, scroll only occurs within the `ModalBody`.
   * - If set to `outside`, the entire `ModalContent` will scroll within the viewport.
   *
   * @default "outside"
   */
  scrollBehavior?: ScrollBehavior
}

export interface CModalProps extends UseModalOptions, ModalOptions {
  /**
   * If `true`, the modal will display
   *
   * @default true
   */
  isOpen: boolean
  /**
   * If `false`, focus lock will be disabled completely.
   *
   * This is useful in situations where you still need to interact with
   * other surrounding elements.
   *
   * 🚨Warning: We don't recommend doing this because it hurts the
   * accessibility of the modal, based on WAI-ARIA specifications.
   *
   * @default true
   */
  trapFocus?: boolean
  /**
   * If `true`, the modal will autofocus the first enabled and interactive
   * element within the `ModalContent`
   *
   * @default true
   */
  autoFocus?: boolean
  /**
   * The `ref` of element to receive focus when the modal opens.
   */
  initialFocusRef?: () => FocusableElement
  /**
   * The `ref` of element to receive focus when the modal closes.
   */
  finalFocusRef?: () => FocusableElement
  /**
   * If `true`, the modal will return focus to the element that triggered it when it closes.
   * @default true
   */
  returnFocusOnClose?: boolean
  /**
   * If `true`, scrolling will be disabled on the `body` when the modal opens.
   *  @default true
   */
  blockScrollOnMount?: boolean
  /**
   * Handle zoom/pinch gestures on iOS devices when scroll locking is enabled.
   * Defaults to `false`.
   */
  allowPinchZoom?: boolean
  /**
   * If `true`, a `padding-right` will be applied to the body element
   * that's equal to the width of the scrollbar.
   *
   * This can help prevent some unpleasant flickering effect
   * and content adjustment when the modal opens
   */
  preserveScrollBarGap?: boolean
  /**
   * The transition that should be used for the modal
   */
  motionPreset?: MotionPreset
}

type IUseModalOptions = ToRefs<Omit<CModalProps, 'closeModal' | 'handleEscape'>>

interface CModalContext extends IUseModalOptions, UseModalReturn {
  //   /** The transition to be used for the CModal */
  //   motionPreset?: MotionPreset
  dialogRef: (el: TemplateRef) => void
  overlayRef: (el: TemplateRef) => void
  closeModal: () => void
}

const [ModalContextProvider, useModalContext] = createContext<CModalContext>({
  strict: true,
  name: 'ModalContext',
  errorMessage:
    'useModalContext: `context` is undefined. Seems you forgot to wrap modal components in `<CModal />`',
})

export { ModalContextProvider, useModalContext }

export const CModal = defineComponent({
  name: 'CModal',
  props: {
    isOpen: {
      type: Boolean as PropType<CModalProps['isOpen']>,
      default: false,
    },
    id: String as PropType<CModalProps['id']>,
    closeOnOverlayClick: {
      type: Boolean as PropType<CModalProps['closeOnOverlayClick']>,
      default: true,
    },
    closeOnEsc: {
      type: Boolean as PropType<CModalProps['closeOnEsc']>,
      default: true,
    },
    useInert: {
      type: Boolean as PropType<CModalProps['useInert']>,
      default: true,
    },
    autoFocus: {
      type: Boolean as PropType<CModalProps['autoFocus']>,
      default: true,
    },
    trapFocus: {
      type: Boolean as PropType<CModalProps['trapFocus']>,
      default: true,
    },
    initialFocusRef: Function as PropType<CModalProps['initialFocusRef']>,
    finalFocusRef: Function as PropType<CModalProps['finalFocusRef']>,
    returnFocusOnClose: {
      type: Boolean as PropType<CModalProps['returnFocusOnClose']>,
      default: true,
    },
    blockScrollOnMount: {
      type: Boolean as PropType<CModalProps['blockScrollOnMount']>,
      default: true,
    },
    allowPinchZoom: Boolean as PropType<CModalProps['allowPinchZoom']>,
    preserveScrollBarGap: Boolean as PropType<
      CModalProps['preserveScrollBarGap']
    >,
    scrollBehaviour: {
      type: String as PropType<CModalProps['scrollBehavior']>,
      default: 'outside',
    },
    motionPreset: {
      type: String as PropType<CModalProps['motionPreset']>,
      default: 'scale',
    },
  },
  emits: ['update:is-open', 'escape'],
  setup(props, { slots, attrs, emit }) {
    const closeModal = () => {
      emit('update:is-open', false)
    }

    const handleEscape = (event: KeyboardEvent) => {
      emit('escape', event)
    }

    const styles = useMultiStyleConfig('Modal', mergeProps(props, attrs))
    const modalOptions = reactive({
      ...props,
      closeModal,
      handleEscape,
    })
    const modal = useModal(modalOptions)

    ModalContextProvider({
      ...modal,
      ...toRefs(props),
      closeModal,
    })

    StylesProvider(styles)
    return () =>
      h(Fragment, [
        h(CPortal, () => (props.isOpen ? slots?.default?.() : undefined)),
      ])
  },
})

export const CModalFocusScope = defineComponent({
  name: 'CModalFocusScope',
  setup(_, { attrs, slots }) {
    const {
      autoFocus,
      trapFocus,
      initialFocusRef,
      returnFocusOnClose,
      closeOnOverlayClick,
      closeOnEsc,
      blockScrollOnMount,
      dialogRef,
      allowPinchZoom,
      finalFocusRef,
      preserveScrollBarGap,
      ...rest
    } = useModalContext()

    console.log({ rest })

    const _enabled = ref<boolean>(trapFocus?.value || true)

    const enabled = computed({
      get() {
        return _enabled?.value
      },
      set(value: boolean) {
        _enabled.value = value
      },
    })
    trapFocus &&
      watch(trapFocus, (newVal) => {
        _enabled.value = Boolean(newVal)
      })

    const focusLockOptions: FocusLockOptions = reactive({
      enabled: enabled.value,
      autoFocus: autoFocus?.value,
      initialFocusRef: initialFocusRef?.value,
      returnFocus: returnFocusOnClose?.value,
      clickOutsideDeactivates: closeOnOverlayClick?.value,
      escapeDeactivates: closeOnEsc?.value,
    })

    const { lock } = useFocusLock(focusLockOptions)

    return () => {
      return h(
        chakra('div'),
        {
          ref: lock,
          ...attrs,
        },
        () => [
          h(
            CScrollLock,
            {
              enabled: blockScrollOnMount?.value,
            },
            slots
          ),
        ]
      )
    }
  },
})

/**
 * ModalContent is used to group modal's content. It has all the
 * necessary `aria-*` properties to indicate that it is a modal
 */
export const CModalContent = defineComponent({
  name: 'CModalContent',
  inheritAttrs: false,
  emits: ['click'],
  setup(_, { attrs, slots }) {
    const { dialogProps, dialogContainerProps } = useModalContext()
    const styles = useStyles()

    const dialogContainerStyles = computed<SystemStyleObject>(() => ({
      display: 'flex',
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      ...styles.value.dialogContainer,
    }))

    return () =>
      h(CModalFocusScope, {}, () => [
        h(
          chakra('div', {
            label: 'modal__content-container',
            __css: dialogContainerStyles.value,
          }),
          {
            ...dialogContainerProps.value,
            ...attrs,
          },
          slots
        ),
      ])
  },
})

/**
 * CModalOverlay renders a backdrop behind the modal. It is
 * also used as a wrapper for the modal content for better positioning.
 *
 * @see Docs https://next.chakra-ui.com/docs/overlay/modal
 */
export const CModalOverlay = defineComponent({
  name: 'CModalOverlay',
  setup(_, { attrs }) {
    const styles = useStyles()
    const overlayStyle = computed<SystemStyleObject>(() => ({
      pos: 'fixed',
      left: '0',
      top: '0',
      w: '100vw',
      h: '100vh',
      ...styles.value.overlay,
    }))
    return () =>
      h(
        chakra('div', {
          label: 'modal__overlay',
        }),
        {
          __css: {
            ...overlayStyle.value,
          },
          ...attrs,
        }
      )
  },
})
