import { computed, HTMLAttributes, ref, watchEffect } from "vue"
import { useId } from "./use-id"

export interface UseDisclosureProps {
  isOpen?: boolean
  defaultIsOpen?: boolean
  onClose?(): void
  onOpen?(): void
  id?: string
}

/**
 * Handles common open, close, or toggle scenarios.
 * It can be used to control feedback components such as `Modal`, `AlertDialog`, `Drawer`, etc.
 */
export function useDisclosure(props: UseDisclosureProps = {}) {
  const {
    isOpen: isOpenProp,
    onClose: handleClose,
    onOpen: handleOpen,
    id: idProp,
    defaultIsOpen,
  } = props

  const isOpenState = ref(defaultIsOpen || false)

  const isOpen = ref<boolean>(
    isOpenProp !== undefined ? isOpenProp : isOpenState.value
  )

  const isControlled = isOpenProp !== undefined

  const uid = useId()
  const id = computed(() => idProp ?? `disclosure-${uid.value}`)

  const onClose = () => {
    if (!isControlled) {
      isOpenState.value = false
    }
    handleClose?.()
  }

  const onOpen = () => {
    if (!isControlled) {
      isOpenState.value = true
    }
    handleOpen?.()
  }

  const onToggle = () => (isOpen.value ? onClose() : onOpen())

  /**
   * Computed object containing the HTML attributes for the button that
   * is triggering the disclosure state
   *
   * `NOTE:` Pass this to the v-bind of the element.
   *
   * i.e. `v-bind='buttonProps'`
   */

  const buttonProps = computed(() => ({
    "aria-expanded": isOpen.value,
    "aria-controls": id.value,
    onClick() {
      onToggle()
    },
  }))

  /**
   * Computed object containing the HTML attributes for the element that
   * is being effected by the disclosure state.
   *
   * `NOTE:` Pass this to the v-bind of the element.
   *
   * i.e. `v-bind='disclosureProps'`
   */
  const disclosureProps = computed(() => ({
    hidden: !isOpen.value,
    id: id.value,
  }))

  watchEffect(() => {
    isOpen.value = isOpenState.value
  })

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
    isControlled,
    buttonProps,
    disclosureProps,
  }
}
