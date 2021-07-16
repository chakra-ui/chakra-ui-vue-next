import { MotionVariants } from '@vueuse/motion'

export type DialogMotionPreset =
  | 'slideInBottom'
  | 'slideInRight'
  | 'scale'
  | 'fade'
  | 'none'

export type DialogMotionPresets = Record<DialogMotionPreset, MotionVariants>

export const TransitionEasings = {
  ease: [0.25, 0.1, 0.25, 1],
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
} as const

export const TransitionDefaults = {
  enter: {
    duration: 100,
    ease: TransitionEasings.easeOut,
  },
  leave: {
    duration: 200,
    ease: TransitionEasings.easeIn,
  },
} as const

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
    initial: { scale: 0.95, opacity: 0 },
    enter: { scale: 1, transition: TransitionDefaults.enter, opacity: 1 },
    leave: { scale: 0.95, transition: TransitionDefaults.leave, opacity: 0 },
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
