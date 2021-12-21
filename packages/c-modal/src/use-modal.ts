import {
  computed,
  getCurrentInstance,
  onBeforeMount,
  onBeforeUnmount,
  ref,
  Ref,
  ToRefs,
  toRefs,
  unref,
  VNodeProps,
  watch,
  watchEffect,
} from "vue"
import { useIds } from "@chakra-ui/vue-composables"
import { FocusLockProps, useFocusLock } from "@chakra-ui/c-focus-lock"
import {
  MaybeElementRef,
  useRef,
  getSelector,
  TemplateRef,
} from "@chakra-ui/vue-utils"
import { hideOthers, Undo } from "@chakra-ui/vue-a11y"
import { focus, FocusableElement, isFunction } from "@chakra-ui/utils"
import { useBodyScrollLock } from "@chakra-ui/c-scroll-lock"

export interface UseModalOptions {
  /**
   * If `true`, the modal will be open.
   */
  modelValue: Ref<boolean>
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
   * If `true`, the body will not be scollable when mounted
   * @default true
   */
  blockScrollOnMount?: Ref<boolean>
  /**
   * The initial element to be focused when the focus lock is opened
   */
  initialFocusRef?: Ref<FocusLockProps["initialFocusRef"]>
  /**
   * The initial element to be focused when the focus lock is opened
   */
  finalFocusRef?: Ref<FocusLockProps["finalFocusRef"]>
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

export interface MergedVNodeProps extends VNodeProps {
  ref: TemplateRef | ((el: TemplateRef | null) => void)
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
    modelValue,
    id,
    closeOnOverlayClick,
    closeOnEsc,
    initialFocusRef,
    finalFocusRef,
    useInert,
    blockScrollOnMount,
  } = toRefs(options)

  const instance = getCurrentInstance()

  const finalFocusElement = computed(() => {
    let finalFocus
    if (finalFocusRef?.value) {
      const resolvedFinalFocusRef: MaybeElementRef = isFunction(
        finalFocusRef.value
      )
        ? finalFocusRef.value?.()
        : finalFocusRef.value
      if (typeof resolvedFinalFocusRef === "string") {
        finalFocus = document.querySelector<FocusableElement & Element>(
          resolvedFinalFocusRef
        )
      } else {
        finalFocus = resolvedFinalFocusRef?.$el || resolvedFinalFocusRef
      }
    }
    return finalFocus
  })

  const initialFocusElement = computed(() => {
    let initialFocus
    if (initialFocusRef?.value) {
      let resolvedInitialFocusRef: MaybeElementRef =
        typeof initialFocusRef?.value === "function"
          ? initialFocusRef?.value()
          : initialFocusRef?.value

      resolvedInitialFocusRef = unref(resolvedInitialFocusRef)
      if (typeof resolvedInitialFocusRef === "string") {
        initialFocus = document.querySelector<FocusableElement & Element>(
          resolvedInitialFocusRef
        )
      } else {
        initialFocus = resolvedInitialFocusRef?.$el || resolvedInitialFocusRef
      }
    }

    return initialFocus
  })

  // DOM refs
  const [dialogRef, dialogRefEl] = useRef()
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

  const { lastFocusedSelector } = useReturnFocusSelector(modelValue)

  const hasHeader = ref(false)
  const hasBody = ref(false)

  /** Initialize focus lock */
  const { lock, deactivate } = useFocusLock({
    escapeDeactivates: false,
    clickOutsideDeactivates: false,
    allowOutsideClick: true,
    returnFocusOnDeactivate: true,
    delayInitialFocus: true,
    onActivate() {
      if (initialFocusElement.value) {
        setTimeout(() => {
          focus(initialFocusElement.value)
        })
      }
    },
    onDeactivate() {
      /**
       * There appears to be a bug in which
       * the DOM refreshes and elements are modified
       * in a way that completely replaces elements in the DOM
       * such that the targeted nodes are not found in the
       * browser even though we have them in JavaScript.
       *
       * At the time of writing this composable, I am
       * unable to ascertain where this issue came from.
       *
       * However, as a failsafe, ew allow the `useModal()`
       * hook to always track the last focused element
       * before it was activated using the `useReturnFocusSelector`
       *
       * @see useReturnFocusSelector Function
       */
      setTimeout(() => {
        const lastfocusedNode = document.querySelector(
          lastFocusedSelector.value as string
        )

        if (finalFocusElement.value) {
          focus(finalFocusElement.value)
        } else {
          focus(lastfocusedNode as HTMLElement)
        }
      }, 100)
    },
    immediate: true,
  })

  const { scrollLockRef } = useBodyScrollLock(
    blockScrollOnMount?.value ? modelValue : ref(false)
  )

  /**
   * This watcher is being used to track
   * the element refs for the dialog container
   * element.
   *
   * When the ref is bound, we activate
   * the focus lock and body scroll lock refs.
   */
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
  const dialogProps = computed<(context: any) => MergedVNodeProps>(
    () => ({ emit }) => ({
      role: "dialog",
      ref: dialogRef,
      id: dialogId.value,
      tabIndex: -1,
      "aria-modal": true,
      "aria-labelledby": hasHeader.value ? headerId.value : null,
      "aria-describedby": hasBody.value ? bodyId.value : null,
      onClick(event: MouseEvent) {
        event.stopPropagation()
        emit("click", event)
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
    if (event.key === "Escape") {
      event.stopPropagation()

      if (closeOnEsc?.value) {
        closeModal()
      }

      handleEscape(event)
    }
  }

  /** Dialog container props */
  const dialogContainerProps = computed<(context: any) => MergedVNodeProps>(
    () => ({ emit }) => ({
      ref: overlayRef as any,
      onClick: (event: MouseEvent) => {
        instance?.emit("update:modelValue", !modelValue.value)
        instance?.emit("closeModal")
        handleOverlayClick(event)
      },
      onKeydown: (event: KeyboardEvent) => {
        emit("keydown", event)
        onKeyDown(event)
      },
      onMousedown: (event: MouseEvent) => {
        mouseDownTarget.value = event.target
        emit("mousedown", event)
      },
    })
  )
  /**
   * `aria-hidden` attributes handling
   * @see useAriaHidden
   */
  const shouldHide = computed(
    () => (modelValue.value && useInert?.value) || false
  )
  useAriaHidden(dialogRefEl, shouldHide)

  return {
    modelValue,
    headerId,
    bodyId,
    dialogRef,
    dialogRefEl,
    overlayRef,
    dialogProps,
    hasHeader,
    hasBody,
    dialogContainerProps,
  }
}

export type UseModalReturn = Omit<
  ToRefs<ReturnType<typeof useModal>>,
  "dialogRef" | "overlayRef" | "closeModal"
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
  shouldHide: Ref<boolean>
) {
  let undo: Undo | null = null

  watchEffect(
    () => {
      // await nextTick()
      if (shouldHide.value && node.value) {
        undo = hideOthers(node.value)
      } else {
        undo?.()
      }
    },
    {
      flush: "post",
    }
  )
}

/** Tracks last focused element selector before Modal/dialog is opened */
export function useReturnFocusSelector(shouldTrack: Ref<boolean>) {
  const lastFocused = ref<EventTarget | null>(null)
  const lastFocusedSelector = ref<string | undefined>()

  const trackFocus = (event: Event) => {
    if (!shouldTrack.value) {
      lastFocusedSelector.value = getSelector(event.target as HTMLElement)
    }
  }

  onBeforeMount(() => {
    document.addEventListener("focusin", trackFocus)
  })

  onBeforeUnmount(() => {
    document.removeEventListener("focusin", trackFocus)
    lastFocused.value = null
    lastFocusedSelector.value = undefined
  })

  return {
    lastFocused,
    lastFocusedSelector,
  }
}
