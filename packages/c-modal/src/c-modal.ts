/**
 * Hey! Welcome to @chakra-ui/vue-next CModal
 *
 * An accessible dialog modal component for chakra ui vue.
 *
 * @see Docs     https://next.vue.chakra-ui.com/modal
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/master/packages/c-modal/src/c-modal.ts
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 */

import { h, defineComponent, PropType, Prop } from 'vue'
import {
  chakra,
  DOMElements,
  StylesProvider,
  useMultiStyleConfig,
} from '@chakra-ui/vue-system'
import { createContext } from '@chakra-ui/vue-utils'
import { CPortal } from '@chakra-ui/c-portal'
import { useFocusLock } from '@chakra-ui/c-focus-lock'
import { UseModalOptions, UseModalReturn } from './use-modal'
import { FocusableElement } from '@chakra-ui/utils'

type ScrollBehavior = 'inside' | 'outside'
type MotionPreset = 'slideInBottom' | 'slideInRight' | 'scale' | 'none'

export interface CModalProps extends UseModalOptions {
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

interface CModalContext extends CModalProps, UseModalReturn {
  /** The transition to be used for the CModal */
  motionPreset?: MotionPreset
}

const [ModalContextProvider, useModalContext] = createContext<CModalContext>({
  strict: true,
  name: 'ModalContext',
  errorMessage:
    'useModalContext: `context` is undefined. Seems you forgot to wrap modal components in `<CModal />`',
})

export { ModalContextProvider, useModalContext }

export const CModal = defineComponent({
  props: {
    isOpen: Boolean as PropType<CModalProps['isOpen']>,
    id: String as PropType<CModalProps['id']>,
    closeOnOverlayClick: Boolean as PropType<
      CModalProps['closeOnOverlayClick']
    >,
    closeOnEsc: Boolean as PropType<CModalProps['closeOnEsc']>,
    useInert: Boolean as PropType<CModalProps['useInert']>,
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
  setup(props, { slots, attrs }) {
    const styles = useMultiStyleConfig('Modal', attrs)
    return () =>
      h(
        // @ts-expect-error
        ModalContextProvider,
        {
          value: props,
        },
        () => [
          // @ts-expect-error
          h(StylesProvider, {
            styles: styles.value,
          }),
        ]
      )
  },
})
