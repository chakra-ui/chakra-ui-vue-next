import {
  computed,
  ComputedRef,
  HTMLAttributes,
  Ref,
  ref,
  watchEffect,
} from "vue"
import { useId } from "./use-id"

export interface UseDisclosureProps {
  /**
   * Defines open state from outside dynamic state being passed in.
   *
   * Overrides `defaultIsOpen` prop.
   */
  isOpen?: boolean
  /**
   * Default state on render. Overriden by `isOpen` prop dynamically
   * if outside state should pass in a truthy value
   */
  defaultIsOpen?: boolean
  /**
   * Additional actions to run when the targeted element is closed.
   */
  onClose?(): void
  /**
   * Additional actions to run when the targeted element is opened.
   */
  onOpen?(): void
  /**
   * Custom id to connect the toggle with the targeted element for accessibility.
   *
   * @default `disclosure-<uid>`
   */
  id?: string
}

type ReturnUseDisclosureType = {
  /**
   * Returns current state
   *
   * @default false
   */
  isOpen: Ref<boolean>
  /**
   * Actions run when opening targeted element.
   *
   * If target element is uncontrolled, then it includes toggle open.
   */
  open: () => void
  /**
   * Actions run when closing targeted element.
   *
   * If target element is uncontrolled, then it includes toggle closed.
   */
  close: () => void
  /**
   * Actions run when toggling open and closed.
   */
  toggle: () => void
  /**
   * Check if external functionality controls the state of the targeted element
   */
  isControlled: boolean
  /**
   * Computed object of Accessibility attributes and toggling event for the toggling element.
   *
   * `NOTE:` Pass this to the v-bind of the element.
   *
   * i.e. `v-bind='buttonProps'`
   */
  buttonProps: ComputedRef<{
    "aria-expanded": HTMLAttributes["aria-expanded"]
    "aria-controls": HTMLAttributes["aria-controls"]
    onClick: HTMLAttributes["onClick"]
  }>
  /**
   * Computed object of Accessibility attributes to show/hide targeted element and for aria controls.
   *
   * `NOTE:` Pass this to the v-bind of the element.
   *
   * i.e. `v-bind='disclosureProps'`
   */
  disclosureProps: ComputedRef<{
    hidden: HTMLAttributes["hidden"]
    id: HTMLAttributes["id"]
  }>
}

/**
 * Handles common open, close, or toggle scenarios.
 *
 * It can be used to control feedback components such as `Modal`, `AlertDialog`, `Drawer`, etc.
 */
export function useDisclosure(
  props: UseDisclosureProps = {}
): ReturnUseDisclosureType {
  const {
    isOpen: isOpenProp,
    onClose: handleClose,
    onOpen: handleOpen,
    id: idProp,
    defaultIsOpen,
  } = props

  const isOpenState = ref(defaultIsOpen || false)

  const isOpen: ReturnUseDisclosureType["isOpen"] = ref(
    isOpenProp !== undefined ? isOpenProp : isOpenState.value
  )

  const isControlled = isOpenProp !== undefined

  const uid = useId()
  const id = computed(() => idProp ?? `disclosure-${uid.value}`)

  const close = () => {
    if (!isControlled) {
      isOpenState.value = false
    }
    handleClose?.()
  }

  const open = () => {
    if (!isControlled) {
      isOpenState.value = true
    }
    handleOpen?.()
  }

  const toggle = () => (isOpen.value ? close() : open())

  const buttonProps: ReturnUseDisclosureType["buttonProps"] = computed(() => ({
    "aria-expanded": isOpen.value,
    "aria-controls": id.value,
    onClick() {
      toggle()
    },
  }))

  const disclosureProps: ReturnUseDisclosureType["disclosureProps"] = computed(
    () => ({
      hidden: !isOpen.value,
      id: id.value,
    })
  )

  watchEffect(() => {
    isOpen.value = isOpenState.value
  })

  return {
    isOpen,
    open,
    close,
    toggle,
    isControlled,
    buttonProps,
    disclosureProps,
  }
}
