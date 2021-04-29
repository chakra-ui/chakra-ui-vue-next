import {
  computed,
  ComputedRef,
  getCurrentInstance,
  ref,
  Ref,
  ToRefs,
  toRefs,
  VNodeProps,
  watch,
  watchEffect,
} from 'vue'
import { useIds } from '@chakra-ui/vue-composables'
import { useRef } from '@chakra-ui/vue-utils'
import { hideOthers, Undo } from 'aria-hidden'

type ScrollBehavior = 'inside' | 'outside'

export interface UseModalOptions {
  /**
   * If `true`, the modal will be open.
   */
  isOpen: Ref<boolean>
  /**
   * The `id` of the modal
   */
  id?: Ref<string>
  /**
   * If `true`, the modal will close when the overlay is clicked
   * @default true
   */
  closeOnOverlayClick?: Ref<boolean>
  /**
   * If `true`, the modal will close when the `Esc` key is pressed
   * @default true
   */
  closeOnEsc?: Ref<boolean>

  /**
   * A11y: If `true`, the siblings of the `modal` will have `aria-hidden`
   * set to `true` so that screen readers can only see the `modal`.
   *
   * This is commonly known as making the other elements **inert**
   *
   *  @default true
   */
  useInert?: Ref<boolean>
  /**
   * Emits event to close modal dialog
   */
  closeModal: () => void
  /**
   * Emits `escape` event to parent scope
   */
  handleEscape: (event: KeyboardEvent) => void
}

/**
 * Modal hook to manage accessibility and state for the modal
 * dialog components
 * @param options
 * @returns
 */
export function useModal(options: UseModalOptions) {
  const { handleEscape, closeModal } = options
  const { isOpen, id, closeOnOverlayClick, closeOnEsc, useInert } = toRefs(
    options
  )

  const instance = getCurrentInstance()

  // DOM refs
  const [dialogRef, dialogRefEl] = useRef()
  const dialogEl = ref()
  const [overlayRef, overlayEl] = useRef()

  /** We use this element to keep track of the currently clicked element */
  const mouseDownTarget = ref<EventTarget | null>(null)

  /**
   * Creates IDs for the dialog elements
   */
  const [dialogId, headerId, bodyId] = useIds(
    id?.value,
    `chakra-modal`,
    `chakra-modal--header`,
    `chakra-modal--body`
  )

  /**
   * `aria-hidden` attributes handling
   */
  const shouldHide = computed(() => isOpen.value && useInert?.value)
  useAriaHidden(dialogRefEl, shouldHide)

  const hasHeader = ref(false)
  const hasBody = ref(false)

  /**
   * Dialog props
   */
  const dialogProps = computed<VNodeProps>(() => ({
    role: 'dialog',
    ref: dialogRef as any,
    id: dialogId.value,
    tabIndex: -1,
    'aria-modal': true,
    'aria-labelledby': hasHeader.value ? headerId.value : null,
    'aria-describedby': hasBody.value ? bodyId.value : null,
    onClick(event: MouseEvent) {
      event.stopPropagation()
      instance?.emit('click', event)
    },
  }))

  const handleOverlayClick = (event: MouseEvent) => {
    event.stopPropagation()
    // @click.self modifier
    if (event.target !== event.currentTarget) return

    if (closeOnOverlayClick?.value) {
      closeModal()
    }
  }

  const onKeyDown = (event: KeyboardEvent) => {
    console.log('onKeyDown', event)
    if (event.key === 'Escape') {
      event.stopPropagation()

      if (closeOnEsc?.value) {
        closeModal()
      }

      handleEscape(event)
    }
  }

  /** Dialog container props */
  const dialogContainerProps = computed<VNodeProps>(() => ({
    ref: overlayRef as any,
    onClick: (event: MouseEvent) => {
      instance?.emit('update:is-open', !isOpen.value)
      instance?.emit('close')
      handleOverlayClick(event)
    },
    onKeyDown: (event: KeyboardEvent) => {
      instance?.emit('keydown', event)
      onKeyDown(event)
    },
    onMouseDown: (event: MouseEvent) => {
      mouseDownTarget.value = event.target
      instance?.emit('mousedown', event)
    },
  }))

  return {
    isOpen,
    headerId,
    bodyId,
    dialogRef,
    dialogEl,
    overlayRef,
    dialogProps,
    hasHeader,
    hasBody,
    dialogContainerProps,
  }
}

export type UseModalReturn = Omit<
  ToRefs<ReturnType<typeof useModal>>,
  'dialogRef' | 'overlayRef' | 'closeModal'
>

/**
 * Modal hook to polyfill `aria-modal`.
 *
 * It applies `aria-hidden` to elements behind the modal
 * to indicate that they're `inert`.
 *
 * @param ref ref of the node to be excluded from aria-hidden
 * @param shouldHide whether `aria-hidden` should be applied
 */
export function useAriaHidden(
  node: Ref<HTMLElement | undefined | null>,
  shouldHide: Ref<boolean | undefined>
) {
  let undo: Undo | null = null

  watchEffect(
    (onInvalidate) => {
      if (!node.value) return

      if (shouldHide.value && node.value) {
        undo = hideOthers(node.value)
      }

      onInvalidate(() => {
        undo?.()
      })
    },
    {
      flush: 'post',
    }
  )
}
