import { computed, HTMLAttributes, ref, watchEffect } from "vue"
import { useId } from "./use-id"

export interface UseDisclosureProps {
  isOpen?: boolean
  defaultIsOpen?: boolean
  onClose?(): void
  onOpen?(): void
  id?: string
}

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
   * Ref object containing the HTML attributes for the button that
   * is triggering the disclosure state
   *
   * `NOTE:` Pass this to the v-bind of the element.
   *
   * i.e. `v-bind='buttonProps'`
   */
  const buttonProps = ref<HTMLAttributes>()

  /**
   * Ref object containing the HTML attributes for the element that
   * is being effected by the disclosure state.
   *
   * `NOTE:` Pass this to the v-bind of the element.
   *
   * i.e. `v-bind='disclosureProps'`
   */
  const disclosureProps = ref<HTMLAttributes>()

  watchEffect(() => {
    isOpen.value = isOpenState.value
    buttonProps.value = {
      "aria-expanded": isOpen.value,
      "aria-controls": id.value,
      onClick() {
        onToggle()
      },
    }

    disclosureProps.value = {
      hidden: !isOpen.value,
      id: id.value,
    }
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