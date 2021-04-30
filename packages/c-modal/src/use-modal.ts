import {
  computed,
  getCurrentInstance,
  nextTick,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  ref,
  Ref,
  SetupContext,
  ToRefs,
  toRefs,
  VNodeProps,
  watch,
  watchEffect,
} from 'vue'
import { useIds } from '@chakra-ui/vue-composables'
import { FocusLockProps, useFocusLock } from '@chakra-ui/c-focus-lock'
import { MaybeElementRef, useRef } from '@chakra-ui/vue-utils'
import { hideOthers, Undo } from 'aria-hidden'
import { FocusTarget } from 'focus-trap'
import { focus, FocusableElement } from '@chakra-ui/utils'
import { useBodyScrollLock } from '@chakra-ui/c-scroll-lock'

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
   * The initial element to be focused when the focus lock is opened
   */
  initialFocusRef?: Ref<FocusLockProps['initialFocusRef']>
  /**
   * The initial element to be focused when the focus lock is opened
   */
  finalFocusRef?: Ref<FocusLockProps['finalFocusRef']>
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
  const {
    isOpen,
    id,
    closeOnOverlayClick,
    closeOnEsc,
    initialFocusRef,
    finalFocusRef,
    useInert,
  } = toRefs(options)

  const instance = getCurrentInstance()

  const finalFocusElement = computed(() => {
    let finalFocus
    if (finalFocusRef?.value) {
      const resolvedFinalFocusRef: MaybeElementRef =
        finalFocusRef.value?.() || finalFocusRef.value
      if (typeof resolvedFinalFocusRef === 'string') {
        finalFocus = document.querySelector<FocusableElement & Element>(
          resolvedFinalFocusRef
        )
      } else {
        finalFocus = resolvedFinalFocusRef?.$el || resolvedFinalFocusRef
      }
    }
    return finalFocus
  })

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
  const { lastFocused, lastFocusedSelector } = useReturnFocus(isOpen)

  const hasHeader = ref(false)
  const hasBody = ref(false)

  /** Initialize focus lock */
  const { lock, deactivate } = useFocusLock({
    escapeDeactivates: false,
    clickOutsideDeactivates: false,
    allowOutsideClick: true,
    returnFocusOnDeactivate: true,
    delayInitialFocus: true,
    initialFocus: initialFocusRef?.value as FocusTarget,
    onDeactivate() {
      console.log('lastFocused', lastFocused.value)
      setTimeout(() => {
        console.log('Getting last focused', lastFocusedSelector.value)
        const lastfocusedNode = document.querySelector(
          lastFocusedSelector.value as string
        )

        focus(lastfocusedNode as HTMLElement)
      }, 100)
      // if (finalFocusElement.value) {
      //   focus(finalFocusElement.value)
      // }
    },
    immediate: true,
  })
  const { scrollLockRef } = useBodyScrollLock(isOpen)

  watch(dialogRefEl, (newVal) => {
    if (newVal) {
      lock(newVal)
      scrollLockRef(newVal)
    } else {
      deactivate()
    }
  })

  /**
   * Dialog props
   */
  const dialogProps = computed<(context: any) => VNodeProps>(
    () => ({ emit }) => ({
      role: 'dialog',
      ref: dialogRef as any,
      id: dialogId.value,
      tabIndex: -1,
      'aria-modal': true,
      'aria-labelledby': hasHeader.value ? headerId.value : null,
      'aria-describedby': hasBody.value ? bodyId.value : null,
      onClick(event: MouseEvent) {
        event.stopPropagation()
        emit('click', event)
      },
    })
  )

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
  const dialogContainerProps = computed<(context: any) => VNodeProps>(
    () => ({ emit }) => ({
      ref: overlayRef as any,
      onClick: (event: MouseEvent) => {
        instance?.emit('update:is-open', !isOpen.value)
        instance?.emit('close')
        handleOverlayClick(event)
      },
      onKeyDown: (event: KeyboardEvent) => {
        emit('keydown', event)
        onKeyDown(event)
      },
      onMouseDown: (event: MouseEvent) => {
        mouseDownTarget.value = event.target
        emit('mousedown', event)
      },
    })
  )

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

/** Tracks last opened element before Modal is opened */
export function useReturnFocus(isOpen: Ref<boolean>) {
  const lastFocused = ref<EventTarget | null>(null)
  const lastFocusedSelector = ref<string | undefined>()

  const trackFocus = (event: Event) => {
    if (!isOpen.value) {
      lastFocusedSelector.value = getSelector(event.target as HTMLElement)
    }
  }

  onBeforeMount(() => {
    document.addEventListener('focusin', trackFocus)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('focusin', trackFocus)
    lastFocused.value = null
    lastFocusedSelector.value = undefined
  })

  return {
    lastFocused,
    lastFocusedSelector,
  }
}

function getSelector(node: HTMLElement) {
  var id = node.getAttribute('id')

  if (id) {
    return '#' + id
  }

  var path = ''

  while (node) {
    var name = node.localName
    var parent = node.parentNode

    if (!parent) {
      path = name + ' > ' + path
      continue
    }

    if (node.getAttribute('id')) {
      path = '#' + node.getAttribute('id') + ' > ' + path
      break
    }

    var sameTagSiblings = []
    var children = parent.childNodes
    children = Array.prototype.slice.call(children)

    children.forEach(function (child) {
      if (child.localName == name) {
        sameTagSiblings.push(child)
      }
    })

    // if there are more than one children of that type use nth-of-type

    if (sameTagSiblings.length > 1) {
      var index = sameTagSiblings.indexOf(node)
      name += ':nth-of-type(' + (index + 1) + ')'
    }

    if (path) {
      path = name + ' > ' + path
    } else {
      path = name
    }

    node = parent
  }

  return path
}
