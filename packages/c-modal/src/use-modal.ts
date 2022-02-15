import {
  computed,
  getCurrentInstance,
  ref,
  Ref,
  ToRefs,
  unref,
  VNodeProps,
  watch,
  watchEffect,
} from "vue"
import { useIds } from "@chakra-ui/vue-composables"
import {
  FocusLockProps,
  useReturnFocusSelector,
  useFocusTrap,
} from "@chakra-ui/c-focus-lock"
import {
  MaybeElementRef,
  useRef,
  getSelector,
  TemplateRef,
} from "@chakra-ui/vue-utils"
import { useInertOthers } from "@chakra-ui/vue-a11y"
import { focus, FocusableElement, isFunction } from "@chakra-ui/utils"

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
  } = options

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

  const initialFocusElement = computed<HTMLElement>(() => {
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
  /**
   * This watcher is being used to track
   * the element refs for the dialog container
   * element.
   */
  watch(dialogRefEl, (newVal) => {
    if (!newVal) {
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
    }
  })

  const containers = ref<Set<HTMLElement>>(new Set())

  watchEffect(
    (onInvalidate) => {
      let el: HTMLElement
      if (dialogRefEl.value) {
        el = dialogRefEl.value
        containers.value.add(el)
      }

      onInvalidate(() => {
        containers.value.delete(el)
      })
    },
    { flush: "post" }
  )

  useFocusTrap(
    containers,
    ref(true),
    computed(() => ({
      initialFocus: initialFocusElement.value,
    }))
  )

  /**
   * Dialog props
   */
  const dialogProps = computed<(context: any) => MergedVNodeProps>(
    () =>
      ({ emit }) => ({
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
    () =>
      ({ emit }) => ({
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
  // useAriaHidden(dialogRefEl, shouldHide)
  useInertOthers(dialogRefEl, shouldHide)

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
