import { MotionVariants } from '@vueuse/motion'

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
