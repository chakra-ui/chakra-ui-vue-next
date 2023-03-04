import { Transition, computed, defineComponent, watch, watchEffect } from "vue"
import { usePopoverContext, useStyles } from "./popover.context"
import {
  type HTMLChakraProps,
  type SystemStyleObject,
  chakra,
} from "@chakra-ui/vue-system"
import { CPopoverPositioner } from "./c-popover-positioner"
import { TransitionDefaults } from "@chakra-ui/c-motion"
import { MotionDirective, useMotions } from "@vueuse/motion"
import { withDirectives } from "vue"
import { match } from "@chakra-ui/vue-utils"

const variants = {
  backdrop: {
    initial: {
      opacity: 0,
      scale: 1.1,
    },
    animate: { opacity: 0.5, scale: 1 },
    exit: { opacity: 0, scale: 1.1 },
  },
  content: {
    initial: {
      opacity: 0,
      scale: 1.005,
      y: 10,
    },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 1.005, y: 10 },
  },
}

export interface CPopoverContentProps extends HTMLChakraProps<"div"> {}
export const CPopoverContent = defineComponent({
  name: "CPopoverContent",
  inheritAttrs: false,
  setup(_, { slots, attrs }) {
    const api = usePopoverContext()

    const styles = useStyles()
    const contentStyles = computed<SystemStyleObject>(() => ({
      position: "relative",
      display: "flex",
      flexDirection: "column",
      ...styles.value.content,
    }))

    const popoverContentProps = computed(() => {
      const { ...rest } = { ...attrs, ...api.value.contentProps }
      return {
        ...rest,
        ...match(api.value.trigger, {
          hover: {
            async onPointerenter(e: MouseEvent) {
              const motions = useMotions()
              const instance = motions[api.value.transitionId]
              instance.stopTransitions()
              api.value.open()
              requestAnimationFrame(() => {
                api.value.enterTransition(() => null)
              })
            },
            async onPointerleave(e: MouseEvent) {
              requestAnimationFrame(() => {
                api.value.leaveTransition(() => api.value.close())
              })
            },
          },
          click: {},
        }),
      }
    })

    return () => (
      <CPopoverPositioner>
        {withDirectives(
          <chakra.div
            {...popoverContentProps.value}
            __css={contentStyles.value}
            __label="popover__content"
          >
            {slots.default?.()}
          </chakra.div>,
          [
            [
              MotionDirective({
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
              }),
              api.value.transitionId,
            ],
          ]
        )}
      </CPopoverPositioner>
    )
  },
})
