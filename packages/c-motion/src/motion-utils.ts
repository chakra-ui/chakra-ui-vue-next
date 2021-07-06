import { MotionVariants, Transition } from '@vueuse/motion'

type CMotionVariants = {
  [key: string]: MotionVariants
}

export const TransitionEasings = {
  ease: [0.25, 0.1, 0.25, 1],
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
} as const

export const TransitionDefaults = {
  enter: {
    duration: 200,
    ease: TransitionEasings.easeOut,
  },
  leave: {
    duration: 100,
    ease: TransitionEasings.easeIn,
  },
} as const

/**
 * @todo Allow users to compute and apply their own transitions
 */
export const TransitionVariants: CMotionVariants = {
  scale: {
    initial: { scale: 0.95, opacity: 0 },
    enter: { scale: 1, transition: TransitionDefaults.enter, opacity: 1 },
    leave: { scale: 0.95, transition: TransitionDefaults.leave, opacity: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    enter: { opacity: 1, transition: TransitionDefaults.enter },
    leave: { opacity: 0, transition: TransitionDefaults.leave },
  },
  pushLeft: {
    initial: { translateX: '-30%' },
    enter: { translateX: '100%', transition: TransitionDefaults.enter },
    leave: { translateX: '-30%', transition: TransitionDefaults.leave },
  },
  pushRight: {
    initial: { translateX: '30%' },
    enter: { translateX: '-100%', transition: TransitionDefaults.enter },
    leave: { translateX: '30%', transition: TransitionDefaults.leave },
  },
  pushUp: {
    initial: { translateY: '-30%' },
    enter: { translateY: '100%', transition: TransitionDefaults.enter },
    leave: { translateY: '-30%', transition: TransitionDefaults.leave },
  },
  pushDown: {
    initial: { translateY: '30%' },
    enter: { translateY: '-100%', transition: TransitionDefaults.enter },
    leave: { translateY: '30%', transition: TransitionDefaults.leave },
  },
  slideLeft: {
    position: { left: 0, top: 0, bottom: 0, width: '100%' },
    initial: { translateX: '-100%', opacity: 0 },
    enter: {
      translateX: '0%',
      transition: TransitionDefaults.enter,
      opacity: 1,
    },
    leave: {
      translateX: '-100%',
      transition: TransitionDefaults.leave,
      opacity: 0,
    },
  },
  slideRight: {
    position: { right: 0, top: 0, bottom: 0, width: '100%' },
    initial: {
      translateX: '100%',
      opacity: 0,
    },
    enter: {
      translateX: '0%',
      transition: TransitionDefaults.enter,
      opacity: 1,
    },
    leave: {
      translateX: '100%',
      transition: TransitionDefaults.leave,
      opacity: 0,
    },
  },
  slideUp: {
    position: { top: 0, left: 0, right: 0, maxWidth: '100vw' },
    initial: {
      translateY: '-100%',
      opacity: 0,
    },
    enter: {
      translateY: '0%',
      transition: TransitionDefaults.enter,
      opacity: 1,
    },
    leave: {
      translateY: '-100%',
      transition: TransitionDefaults.leave,
      opacity: 0,
    },
  },
  slideDown: {
    position: { bottom: 0, left: 0, right: 0, maxWidth: '100vw' },
    initial: {
      translateY: '100%',
      opacity: 0,
    },
    enter: {
      translateY: '0%',
      transition: TransitionDefaults.enter,
      opacity: 1,
    },
    leave: {
      translateY: '100%',
      transition: TransitionDefaults.leave,
      opacity: 0,
    },
  },
}

export type SlideDirection = 'top' | 'left' | 'bottom' | 'right'

/** Determines the direction of a given transition */
export function slideTransition(options?: { direction?: SlideDirection }) {
  const side = options?.direction ?? 'right'
  switch (side) {
    case 'right':
      return TransitionVariants.slideRight
    case 'left':
      return TransitionVariants.slideLeft
    case 'bottom':
      return TransitionVariants.slideDown
    case 'top':
      return TransitionVariants.slideUp
    default:
      return TransitionVariants.slideRight
  }
}

/** Converts the placement to a transition variant */
export function placementToVariant(placement: SlideDirection) {
  switch (placement) {
    case 'right':
      return 'slideRight'
    case 'left':
      return 'slideLeft'
    case 'bottom':
      return 'slideDown'
    case 'top':
      return 'slideUp'
    default:
      return 'slideRight'
  }
}

export type CMotionVariant = keyof typeof TransitionVariants
