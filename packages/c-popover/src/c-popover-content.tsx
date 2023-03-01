import { Transition, computed, defineComponent, watch, watchEffect } from "vue"
import { usePopoverContext } from "./popover.context"
import { HTMLChakraProps, chakra } from "@chakra-ui/vue-system"
import { CPopoverPositioner } from "./c-popover-positioner"
import { CAnimatePresence, TransitionDefaults } from "@chakra-ui/c-motion"
import { MotionDirective, useMotion, useMotions } from "@vueuse/motion"
import { useId } from "@chakra-ui/vue-composables"
import { withDirectives } from "vue"
import { match } from "@chakra-ui/vue-utils"

export interface CPopoverContentProps extends HTMLChakraProps<"div"> {}
export const CPopoverContent = defineComponent({
  name: "CPopoverContent",
  inheritAttrs: false,
  setup(_, { slots, attrs }) {
    const api = usePopoverContext()

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
        <CAnimatePresence>
          {api.value.isOpen &&
            withDirectives(
              <chakra.div {...popoverContentProps.value}>
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
        </CAnimatePresence>
      </CPopoverPositioner>
    )
  },
})
