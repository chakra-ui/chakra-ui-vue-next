import {
  Component,
  ComponentOptions,
  computed,
  ComputedRef,
  onMounted,
  Ref,
  ref,
  toRefs,
  watch,
  watchEffect,
} from 'vue'
import { useIds } from '@chakra-ui/vue-composables'
import { hideOthers, Undo } from 'aria-hidden'

type ScrollBehavior = 'inside' | 'outside'

export interface UseModalOptions {
  /**
   * If `true`, the modal will be open.
   */
  isOpen: boolean
  /**
   * The `id` of the modal
   */
  id?: string
  /**
   * If `true`, the modal will close when the overlay is clicked
   * @default true
   */
  closeOnOverlayClick?: boolean
  /**
   * If `true`, the modal will close when the `Esc` key is pressed
   * @default true
   */
  closeOnEsc?: boolean

  /**
   * A11y: If `true`, the siblings of the `modal` will have `aria-hidden`
   * set to `true` so that screen readers can only see the `modal`.
   *
   * This is commonly known as making the other elements **inert**
   *
   *  @default true
   */
  useInert?: boolean
}

/**
 * Modal hook to manage accessibility and state for the modal
 * dialog components
 * @param options
 * @returns
 */
export function useModal(options: UseModalOptions) {
  const { isOpen, id, closeOnOverlayClick, closeOnEsc, useInert } = toRefs(
    options
  )

  // DOM refs
  const dialogRef = ref<HTMLElement | null>(null)
  const overlayRef = ref<HTMLElement | null>(null)

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
  useAriaHidden(dialogRef, shouldHide)

  /**
   * Dialog props
   */
  // const dialogProps = ()

  console.log('HELLO useModal', {
    dialogId,
    headerId,
    bodyId,
  })

  // TODO
  // 1. Get

  return {
    isOpen,
    headerId,
    bodyId,
    // dialogRef: (el: DOMRef): void => {
    //   dialogRef.value = el?.$el || el
    // },
    // overlayRef: (el: DOMRef): void => {
    //   overlayRef.value = el?.$el || el
    // },
  }
}

export type UseModalReturn = ReturnType<typeof useModal>

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
  node: Ref<HTMLElement | null>,
  shouldHide: Ref<boolean> | ComputedRef<boolean | undefined>
) {
  console.log('invoked useAriaHidden')
  watchEffect(
    (onInvalidate) => {
      if (!node.value) return

      let undo: Undo | null = null

      if (shouldHide.value && node.value) {
        undo = hideOthers(node.value)
      }

      onInvalidate(() => {
        if (shouldHide.value) {
          undo?.()
        }
      })
    },
    {
      flush: 'post',
    }
  )
}
