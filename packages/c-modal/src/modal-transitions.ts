import { useId } from '@chakra-ui/vue-composables'
import { createContext } from '@chakra-ui/vue-utils'
import {
  computed,
  ComputedRef,
  reactive,
  ref,
  Ref,
  watch,
  watchEffect,
} from 'vue'

export type DialogTransitionStatus = 'exited' | 'entered' | 'initial' | 'active'

export interface TransitionInstance {
  id: number | string
  isActive: boolean
  el?: HTMLElement
  status: DialogTransitionStatus
}

export interface DialogTransitionContext {
  /**
   * Local state transitioning state
   */
  localIsOpen: Ref<boolean>
  /**
   * Reflects whether all children are currently transitioning
   */
  isTransitioning: ComputedRef<boolean>
  /**
   * Reflects whether all children are currently transitioning in
   */
  isTransitioningIn: ComputedRef<boolean>
  /**
   * Reflects whether all children are currently transitioning out
   */
  isTransitioningOut: ComputedRef<boolean>
  /**
   * Registers a new transition to set of transitions
   */
  register: (uid: number | string) => Ref<TransitionInstance>
}

export interface DialogTransitionsOptions {
  /**
   * Callback invoked when all children have finished transitioning in
   */
  onChildrenEntered: () => void
  /**
   * Callback invoked when all children have finished transitioning out
   */
  onChildrenLeft: () => void
}

const [DialogTransitionsProvider, useDialogTransition] = createContext<
  ComputedRef<DialogTransitionContext>
>({
  strict: true,
  name: 'DialogTransitionContext',
  errorMessage:
    'useDialogTransition: `context` is undefined. Seems you forgot to wrap modal components in `<CModal />`, `<CDrawer />` or `<CAlertDialog />',
})

/**
 * Hook used to manage all transitions in a compound component context
 * used by CModal, CDrawer and CAlertDialog
 */
export function useDialogTransitions(
  isOpen: Ref<boolean> | ComputedRef<boolean>,
  { onChildrenEntered, onChildrenLeft }: DialogTransitionsOptions
) {
  const localIsOpen = ref(false)
  const transitions = ref<Ref<TransitionInstance>[]>([])

  const isTransitioning = computed(() =>
    transitions.value.find((transition) =>
      ['entered', 'exited'].includes(transition.value.status)
    )?.value
      ? true
      : false
  )

  const transitionsStore = reactive({})

  const transitionsEntered = computed(() =>
    transitions.value.every(
      (transition) => transition.value.status === 'entered'
    )
  )

  const transitionsExited = computed(() =>
    transitions.value.every(
      (transition) => transition.value.status === 'exited'
    )
  )

  const isTransitioningIn = computed(
    () => (isOpen.value && !!isTransitioning.value) as boolean
  )

  const isTransitioningOut = computed(
    () => (!isOpen.value && !!isTransitioning.value) as boolean
  )

  const register: DialogTransitionContext['register'] = (uid) => {
    const transition = ref<TransitionInstance>({
      id: uid,
      isActive: false,
      el: undefined, // TODO May include this later
      status: 'initial',
    })

    if (transitionsStore[uid]) {
      return transitionsStore[uid]
    } else {
      transitions.value.push(transition)
      transitionsStore[uid] = transition
    }
    return transition
  }

  watchEffect(
    () => {
      if (!isOpen.value) return
      else if (!localIsOpen.value) {
        localIsOpen.value = true
      }

      if (transitionsEntered.value) {
        onChildrenEntered()
      }

      if (transitionsExited.value) {
        onChildrenLeft()
      }
    },
    {
      flush: 'post',
    }
  )

  const dialogTransitionsContext = computed(() => ({
    localIsOpen,
    isTransitioning,
    isTransitioningIn,
    isTransitioningOut,
    register,
  }))

  DialogTransitionsProvider(dialogTransitionsContext)

  return {
    localIsOpen,
    isTransitioning,
    isTransitioningIn,
    isTransitioningOut,
    register,
    transitionsEntered,
    transitionsExited,
  }
}

export { useDialogTransition }
