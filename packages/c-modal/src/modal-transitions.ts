import { useId } from '@chakra-ui/vue-composables'
import { createContext } from '@chakra-ui/vue-utils'
import { MotionVariants } from '@vueuse/motion'
import { computed, ComputedRef, reactive, ref, Ref, watchEffect } from 'vue'

export type DialogTransitionStatus = 'exited' | 'entered' | 'initial' | 'active'

export interface TransitionInstance {
  id: number | string
  isActive: boolean
  el?: HTMLElement
  status: DialogTransitionStatus
}

export interface TransitionStateHelpers {
  /**
   * Sets the transition status to 'initial'
   */
  initial: VoidFunction
  /**
   * Sets the transition status to 'active'
   */
  active: VoidFunction
  /**
   * Sets the transition status to 'entered'
   */
  entered: VoidFunction
  /**
   * Sets the transition status to 'exited'
   */
  exited: VoidFunction
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
  register: (
    uid: number | string
  ) => [Ref<TransitionInstance>, TransitionStateHelpers]
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
  events?: DialogTransitionsOptions
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

    const exited = () => {
      transition.value.status = 'exited'
    }
    const initial = () => {
      transition.value.status = 'initial'
    }
    const entered = () => {
      transition.value.status = 'entered'
    }
    const active = () => {
      transition.value.status = 'active'
    }

    if (transitionsStore[uid]) {
      return [transition, { active, initial, entered, exited }]
    } else {
      transitions.value.push(transition)
      transitionsStore[uid] = transition
    }

    return [transition, { active, initial, entered, exited }]
  }

  watchEffect(
    () => {
      if (isOpen.value) {
        localIsOpen.value = true
      } else if (!isOpen.value) {
        localIsOpen.value = false
      }

      if (transitionsEntered.value) {
        events?.onChildrenEntered()
      }

      if (transitionsExited.value) {
        events?.onChildrenLeft()
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

export type DialogMotionPreset =
  | 'slideInBottom'
  | 'slideInRight'
  | 'scale'
  | 'fade'
  | 'none'

export type DialogMotionPresets = Record<DialogMotionPreset, MotionVariants>

export const dialogMotionPresets: DialogMotionPresets = {
  slideInBottom: {
    initial: {
      opacity: 0,
      translateY: 10,
    },
    enter: {
      opacity: 1,
      translateY: 0,
    },
    leave: {
      opacity: 0,
      translateY: 10,
    },
  },
  slideInRight: {
    initial: {
      opacity: 0,
      translateX: 10,
    },
    enter: {
      opacity: 1,
      translateX: 0,
    },
    leave: {
      opacity: 0,
      translateX: 10,
    },
  },
  scale: {
    initial: {
      scale: 0.9,
      opacity: 0,
    },
    enter: {
      scale: 1,
      opacity: 1,
    },
    leave: {
      scale: 0.95,
      opacity: 0,
    },
  },
  fade: {
    initial: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
  },
  none: {},
}
