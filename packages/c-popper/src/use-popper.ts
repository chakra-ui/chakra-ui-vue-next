import { filterUndefined } from '@chakra-ui/utils'
import { Placement } from '@popperjs/core/lib/enums'
import {
  Instance,
  Modifier,
  VirtualElement,
} from '@popperjs/core/lib/popper-lite'
import {
  nextTick,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue'
import { createPopperFn, CreatePopperOptions } from './create-popper'

export type { Placement }

export interface UsePopperOptions extends CreatePopperOptions {
  strategy?: 'absolute' | 'fixed'
  placement?: Placement
  modifiers?: Array<Modifier<any, any>>
}

const defaultProps: UsePopperOptions = {
  placement: 'bottom',
  strategy: 'absolute',
  flip: true,
  gutter: 8,
  arrowPadding: 8,
  preventOverflow: true,
  eventListeners: true,
  modifiers: [],
}

export function usePopper(props: UsePopperOptions = {}) {
  const options = {
    ...defaultProps,
    ...filterUndefined(props),
  }
  const { modifiers = [], placement, strategy } = options

  const createPopper = ref(createPopperFn(options))
  const reference = ref<Element | VirtualElement | null>(null)
  const popper = ref<HTMLElement | null>(null)
  const popperInstance = ref<Instance | null>(null)

  // cleanup previous instance handler
  const cleanup = ref(() => {})
  let unsubscribe: () => void

  onUnmounted(() => {
    popperInstance.value?.destroy()
    popperInstance.value = null
    unsubscribe?.()
  })

  const setup = async () => {
    await nextTick()
    if (!reference.value || !popper.value) return
    cleanup.value?.()

    popperInstance.value = createPopper.value(reference.value, popper.value, {
      placement,
      modifiers,
      strategy,
    })

    popperInstance.value.forceUpdate()
    cleanup.value = popperInstance.value.destroy
  }

  onBeforeUpdate(() => {
    // clear refs
    reference.value = null
    popper.value = null
    console.log('before uupate')
  })

  onMounted(async () => {
    await nextTick()
    unsubscribe = watch(() => [reference, popper], setup, {
      immediate: true,
      flush: 'post',
    })
  })

  return {
    update: popperInstance.value?.update,
    forceUpdate: popperInstance.value?.forceUpdate,
    reference: (el: any) => {
      if (el) {
        reference.value = el.$el || el
        setup()
      }
    },
    referenceEl: reference,
    popper: (el: any) => {
      if (el) {
        popper.value = el.$el || el
        setup()
      }
    },
    popperEl: popper,
  }
}
