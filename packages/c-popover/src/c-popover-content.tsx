import { Transition, computed, defineComponent, watch, watchEffect } from "vue"
import { usePopoverContext, useStyles } from "./popover.context"
import {
  type HTMLChakraProps,
  type SystemStyleObject,
  chakra,
} from "@chakra-ui/vue-system"
import { CPopoverPositioner } from "./c-popover-positioner"
import { MotionDirective, useMotions } from "@vueuse/motion"
import { withDirectives } from "vue"
import { match } from "@chakra-ui/vue-utils"
import { PopoverVariants } from "./popover.transitions"

const toVar = (value: string, fallback?: string) => ({
  var: value,
  varRef: fallback ? `var(${value}, ${fallback})` : `var(${value})`,
})

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
      transformOrigin: toVar(
        "--transform-origin",
        api.value.positionerProps.style.transformOrigin
      ).varRef,
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
          [[MotionDirective(PopoverVariants), api.value.transitionId]]
        )}
      </CPopoverPositioner>
    )
  },
})
