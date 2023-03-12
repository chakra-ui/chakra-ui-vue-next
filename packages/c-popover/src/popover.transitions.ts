import { TransitionDefaults } from "@chakra-ui/c-motion"
import { MotionVariants } from "@vueuse/motion"

export const PopoverVariants: MotionVariants = {
  initial: { scale: 0.95, opacity: 0 },
  enter: {
    scale: 1,
    transition: TransitionDefaults.enter,
    opacity: 1,
  },
  leave: {
    scale: 0.95,
    transition: TransitionDefaults.leave,
    opacity: 0,
  },
}
