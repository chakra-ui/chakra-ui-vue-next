// import { TransitionDefaults } from "@chakra-ui/c-motion"
import { MotionVariants } from "@vueuse/motion"

export const TooltipVariants: MotionVariants = {
  initial: { scale: 0.95, opacity: 0 },
  enter: {
    scale: 1,
    transition: {
      opacity: { easings: "easeOut", duration: 200 },
      scale: { duration: 200, easings: [0.175, 0.885, 0.4, 1.1] },
    },
    opacity: 1,
  },
  leave: {
    scale: 0.85,
    opacity: 0,
    transition: {
      opacity: { duration: 150, easings: "easeInOut" },
      scale: { duration: 200, easings: "easeInOut" },
    },
  },
}
