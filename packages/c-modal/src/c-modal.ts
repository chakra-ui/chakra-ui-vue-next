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
  mergeProps,
  onMounted,
  watchEffect,
  UnwrapRef,
  watch,
  ref,
  cloneVNode,
  getCurrentInstance,
  withDirectives,
  nextTick,
  unref,
  Transition,
  onUnmounted,
} from 'vue'
import {
  chakra,
  StylesProvider,
  SystemStyleObject,
  useMultiStyleConfig,
  useStyles,
} from '@chakra-ui/vue-system'
import {
  createContext,
  TemplateRef,
  useRef,
  VueComponentInstance,
} from '@chakra-ui/vue-utils'
import { CPortal } from '@chakra-ui/c-portal'
import {
  CFocusLock,
  FocusLockProps,
  useFocusLock,
} from '@chakra-ui/c-focus-lock'
import { CScrollLock, BodyScrollLockDirective } from '@chakra-ui/c-scroll-lock'
import { CMotion } from '@chakra-ui/c-motion'
import { MotionDirective } from '@vueuse/motion'

import { useModal, UseModalOptions, UseModalReturn } from './use-modal'
import { focus, FocusableElement } from '@chakra-ui/utils'
import { FocusTarget } from 'focus-trap'

type ScrollBehavior = 'inside' | 'outside'
type MotionPreset = 'slideInBottom' | 'slideInRight' | 'scale' | 'none'

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
  motionPreset?: MotionPreset
}

type IUseModalOptions = ToRefs<
  Omit<
    CModalProps,
    | 'closeModal'
    | 'handleEscape'
    | 'preserveScrollBarGap'
    | 'allowPinchZoom'
    | 'motionPreset'
    | 'trapFocus'
    | 'autoFocus'
  >
>

interface CModalContext extends IUseModalOptions, UseModalReturn {
  //   /** The transition to be used for the CModal */
  //   motionPreset?: MotionPreset
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
      default: 'scale',
    },
  },
  emits: ['update:is-open', 'escape', 'close'],
  setup(props, { slots, attrs, emit }) {
    const closeModal = () => {
      emit('update:is-open', false)
    }

    const handleEscape = (event: KeyboardEvent) => {
      emit('escape', event)
    }

    const styles = useMultiStyleConfig('Modal', mergeProps(props, attrs))
    const modalOptions = {
      ...toRefs(reactive(props)),
      closeModal,
      handleEscape,
    }
    // @ts-expect-error
    const modal = useModal(modalOptions)

    console.log(modal)

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
        h(CMotion, () => [
          props.isOpen && h(chakra('span'), () => slots?.default?.()),
        ]),
      ])
  },
})

export const CModalFocusScope = defineComponent({
  name: 'CModalFocusScope',
  setup(_, { attrs, slots }) {
    const {
      isOpen,
      initialFocusRef,
      returnFocusOnClose,
      finalFocusRef,
      blockScrollOnMount,
    } = useModalContext()

    const finalFocusEl = computed(() =>
      typeof finalFocusRef?.value === 'function'
        ? finalFocusRef.value()
        : finalFocusRef?.value
    )

    return () => {
      return h(
        CFocusLock,
        {
          finalFocusEl: finalFocusEl.value,
          ...attrs,
        },
        () => [
          h(
            CScrollLock,
            {
              enabled: blockScrollOnMount?.value,
            },
            () => slots.default?.()
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
    const context = useModalContext()

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

    const dialogStyles = computed<SystemStyleObject>(() => ({
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      width: '100%',
      outline: 0,
      ...styles.value.dialog,
    }))

    return () => {
      return withDirectives(
        h(
          chakra('div', {
            label: 'modal__content-container',
            __css: dialogContainerStyles.value,
          }),
          context.value.dialogContainerProps.value,
          () => [
            h(
              CFocusLock,
              {
                allowOutsideClick: true,
                initialFocusRef: context.value.initialFocusRef?.value,
                finalFocusRef: context.value.finalFocusRef?.value,
                restoreFocus: context.value.returnFocusOnClose?.value,
              },
              () =>
                h(
                  Transition,
                  {
                    css: false,
                  },
                  () =>
                    context.value.isOpen.value && [
                      withDirectives(
                        h(
                          chakra('section', {
                            __css: dialogStyles.value,
                            label: 'modal__content',
                          }),
                          {
                            ...attrs,
                            ...context.value.dialogProps.value,
                          },
                          slots
                        ),
                        [
                          [
                            MotionDirective,
                            {
                              initial: {
                                scale: 0.5,
                                opacity: 0,
                              },
                              enter: {
                                scale: 1,
                                opacity: 1,
                                translateY: 0,
                              },
                              leave: {
                                scale: 0.5,
                                opacity: 0,
                              },
                            },
                          ],
                        ]
                      ),
                    ]
                )
            ),
          ]
        ),
        [[BodyScrollLockDirective, context.value.blockScrollOnMount?.value]]
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
            }),
            {
              __css: {
                ...overlayStyle.value,
              },
              ...attrs,
            }
          ),
        ]
      )
  },
})

export const CModalHeader = defineComponent({
  name: 'CModalHeader',
  setup(_, { attrs, slots }) {
    const context = useModalContext()
    const styles = useStyles()
    const headerStyles = computed<SystemStyleObject>(() => ({
      flex: 0,
      ...styles.value.header,
    }))

    const [headerRef, headerEl] = useRef()

    watch(headerEl, (el) => {
      context.value.hasHeader.value = !!el
    })

    return () =>
      h(
        chakra('header', {
          __css: headerStyles.value,
        }),
        {
          ...attrs,
          ref: headerRef,
          id: context.value.headerId.value,
        },
        slots
      )
  },
})
