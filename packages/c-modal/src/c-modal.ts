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
  toRefs,
  computed,
  ToRefs,
  mergeProps,
  UnwrapRef,
  watch,
  unref,
  withDirectives,
} from 'vue'
import {
  chakra,
  StylesProvider,
  SystemStyleObject,
  useMultiStyleConfig,
  useStyles,
} from '@chakra-ui/vue-system'
import { createContext, TemplateRef, useRef } from '@chakra-ui/vue-utils'
import { CPortal } from '@chakra-ui/c-portal'
import { FocusLockProps } from '@chakra-ui/c-focus-lock'
import { CMotion } from '@chakra-ui/c-motion'
import { CCloseButton } from '@chakra-ui/c-close-button'
import { MotionDirective, useMotions } from '@vueuse/motion'
import { useModal, UseModalOptions, UseModalReturn } from './use-modal'
import { DialogMotionPreset, dialogMotionPresets } from './modal-transitions'

type ScrollBehavior = 'inside' | 'outside'

export interface ModalOptions
  extends Omit<
    FocusLockProps,
    'enabled' | 'closeModal' | 'isActive' | 'handleEscape'
  > {
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

export interface CModalProps extends UnwrapRef<UseModalOptions>, ModalOptions {
  /**
   * If `true`, the modal will display
   *
   * @default true
   */
  modelValue: boolean
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
  autoFocus: boolean
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
  motionPreset: DialogMotionPreset
}

type IUseModalOptions = ToRefs<
  Omit<
    CModalProps,
    | 'closeModal'
    | 'handleEscape'
    | 'preserveScrollBarGap'
    | 'allowPinchZoom'
    | 'trapFocus'
    | 'autoFocus'
  >
>

interface CModalContext extends IUseModalOptions, UseModalReturn {
  dialogRef: (el: TemplateRef) => void
  overlayRef: (el: TemplateRef) => void
  closeModal: () => void
}

type CModalReactiveContext = ComputedRef<CModalContext>

const [
  ModalContextProvider,
  useModalContext,
] = createContext<CModalReactiveContext>({
  strict: true,
  name: 'ModalContext',
  errorMessage:
    'useModalContext: `context` is undefined. Seems you forgot to wrap modal components in `<CModal />`',
})

export { ModalContextProvider, useModalContext }

export const CModal = defineComponent({
  name: 'CModal',
  props: {
    modelValue: {
      type: Boolean as PropType<CModalProps['modelValue']>,
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
    initialFocusRef: [String, Object, Function] as PropType<
      CModalProps['initialFocusRef']
    >,
    finalFocusRef: [String, Object, Function] as PropType<
      CModalProps['finalFocusRef']
    >,
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
      default: 'slideInBottom',
    },
  },
  emits: ['update:modelValue', 'escape', 'close'],
  setup(props, { slots, attrs, emit }) {
    const closeModal = () => {
      emit('update:modelValue', false)
    }

    const handleEscape = (event: KeyboardEvent) => {
      emit('escape', event)
    }

    const styles = useMultiStyleConfig('Modal', mergeProps(props, attrs))
    const modalOptions = reactive({
      ...toRefs(reactive(props)),
      closeModal,
      handleEscape,
    })
    // @ts-expect-error
    const modal = useModal(modalOptions)

    ModalContextProvider(
      computed(() => ({
        ...modal,
        ...toRefs(reactive(props)),
        closeModal,
      }))
    )

    StylesProvider(styles)
    return () =>
      h(CPortal, () => [
        h(CMotion, { type: 'fade' }, () => [
          props.modelValue && h(chakra('span'), () => slots?.default?.()),
        ]),
      ])
  },
})

/**
 * ModalContent is used to group modal's content. It has all the
 * necessary `aria-*` properties to indicate that it is a modal
 */
export const CModalContent = defineComponent({
  name: 'CModalContent',
  inheritAttrs: false,
  emits: ['click', 'mousedown', 'keydown'],
  setup(_, { attrs, slots, emit }) {
    const {
      dialogContainerProps,
      dialogProps,
      modelValue,
      motionPreset,
    } = unref(useModalContext())
    const styles = useStyles()
    const transitionId = 'modal-content'

    /** Handles exit transition */
    const leave = (done: VoidFunction) => {
      const motions = useMotions()
      const instance = motions[transitionId]
      instance?.leave(() => {
        done()
      })
    }

    watch(modelValue, (newVal) => {
      if (!newVal) {
        leave(() => null)
      }
    })

    const dialogContainerStyles = computed<SystemStyleObject>(() => ({
      display: 'flex',
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      ...styles.value.dialogContainer,
    }))

    const dialogStyles = computed<SystemStyleObject>(() => ({
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      width: '100%',
      outline: 0,
      ...styles.value.dialog,
    }))

    return () => {
      return h(
        chakra('div', {
          label: 'modal__content-container',
          __css: dialogContainerStyles.value,
        }),
        dialogContainerProps.value({ emit }),
        () => [
          modelValue.value &&
            withDirectives(
              h(
                chakra('section', {
                  __css: dialogStyles.value,
                  label: 'modal__content',
                }),
                {
                  ...attrs,
                  ...dialogProps.value({ emit }),
                },
                slots
              ),
              [
                [
                  MotionDirective(dialogMotionPresets[motionPreset?.value]),
                  transitionId,
                ],
              ]
            ),
        ]
      )
    }
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
        CMotion,
        {
          type: 'fade',
        },
        () => [
          h(
            chakra('div', {
              label: 'modal__overlay',
              __css: overlayStyle.value,
            }),
            attrs
          ),
        ]
      )
  },
})

/**
 * CModalHeader
 *
 * Component that houses the title of the modal.
 *
 * @see Docs https://next.vue.chakra-ui.com/docs/components/modal
 */
export const CModalHeader = defineComponent({
  name: 'CModalHeader',
  setup(_, { attrs, slots }) {
    const { hasHeader, headerId } = unref(useModalContext())
    const styles = useStyles()
    const headerStyles = computed<SystemStyleObject>(() => ({
      flex: 0,
      ...styles.value.header,
    }))

    const [headerRef, headerEl] = useRef()

    watch(headerEl, (el) => {
      hasHeader.value = !!el
    })

    return () =>
      h(
        chakra('header', {
          label: 'modal__header',
          __css: headerStyles.value,
        }),
        {
          ...attrs,
          ref: headerRef,
          id: headerId.value,
        },
        slots
      )
  },
})

/**
 * CModalBody
 *
 * Component that houses the body of the modal.
 *
 * @see Docs https://next.vue.chakra-ui.com/docs/components/modal
 */
export const CModalBody = defineComponent({
  name: 'CModalBody',
  setup(_, { slots, attrs }) {
    const { bodyId, hasBody } = unref(useModalContext())
    const styles = useStyles()

    const [bodyRef, bodyEl] = useRef()

    /**
     * Used to bind the `aria-descibedby` attribute
     */
    watch(bodyEl, (el) => {
      hasBody.value = !!el
    })

    return () =>
      h(
        chakra('div', {
          label: 'modal__body',
          __css: styles.value.body,
        }),
        {
          id: bodyId.value,
          ...attrs,
          ref: bodyRef,
        },
        slots
      )
  },
})

/**
 * CModalFooter
 *
 * Component that houses the footer of the modal.
 *
 * @see Docs https://next.vue.chakra-ui.com/docs/components/modal
 */
export const CModalFooter = defineComponent({
  name: 'CModalFooter',
  setup(_, { slots, attrs }) {
    const styles = useStyles()

    const footerStyles = computed<SystemStyleObject>(() => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      ...styles.value.footer,
    }))

    return () =>
      h(
        chakra('div', {
          label: 'modal__body',
          __css: footerStyles.value,
        }),
        attrs,
        slots
      )
  },
})

/**
 * CModalCloseButton
 *
 * Used to close the modal. It internally invokes the `closeModal` event,
 * but also emits the `@click` event to the user.
 *
 * @see Docs https://next.vue.chakra-ui.com/docs/components/modal
 */
export const CModalCloseButton = defineComponent({
  name: 'CModalCloseButton',
  emits: ['click'],
  setup(_, { attrs, emit }) {
    const { closeModal } = unref(useModalContext())
    const styles = useStyles()

    return () =>
      h(
        chakra(CCloseButton, {
          label: 'modal__close-button',
          __css: styles.value.closeButton,
        }),
        {
          ...attrs,
          onClick: (e: MouseEvent | TouchEvent) => {
            closeModal()
            emit('click', e)
          },
        }
      )
  },
})
