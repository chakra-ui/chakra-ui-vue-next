import {
  Teleport,
  Transition,
  computed,
  defineComponent,
  mergeProps,
  withDirectives,
} from "vue"
import { useTooltipContext } from "./tooltip.context"
import {
  HTMLChakraProps,
  ThemingProps,
  chakra,
  useStyleConfig,
} from "@chakra-ui/vue-system"
import { CTooltipPositioner } from "./c-tooltip-positioner"
import { filterUndefined } from "@chakra-ui/utils"
import { vueThemingProps } from "@chakra-ui/vue-utils"
import { MotionDirective, useMotions } from "@vueuse/motion"
import { TooltipVariants } from "./tooltip.transition"

const toVar = (value: string, fallback?: string) => ({
  var: value,
  varRef: fallback ? `var(${value}, ${fallback})` : `var(${value})`,
})

export type CTooltipContentProps = HTMLChakraProps<"div">
export const CTooltipContent = defineComponent({
  name: "CTooltipContent",
  props: vueThemingProps,
  setup(props, { slots, attrs }) {
    const api = useTooltipContext()

    const mergedProps = computed(() => mergeProps(props, attrs))
    const themingProps = computed<ThemingProps>(() =>
      filterUndefined({
        colorScheme: mergedProps.value.colorScheme,
        variant: mergedProps.value.variant,
        size: mergedProps.value.size,
        styleConfig: mergedProps.value.styleConfig,
      })
    )
    const styles = useStyleConfig("Tooltip", themingProps.value)
    const contentStyles = computed(() => ({
      ...styles.value,
      transformOrigin: toVar(
        "--transform-origin",
        api.value.positionerProps.style.transformOrigin
      ).varRef,
    }))

    /** Handles exit transition */
    const leaveTransition = (el: Element, done: VoidFunction) => {
      const motions = useMotions()
      const instance = motions[api.value.transitionId]
      instance?.leave(() => {
        done()
      })
    }

    const enterTransition = (el: Element, done: VoidFunction) => {
      const motions = useMotions()
      const instance = motions[api.value.transitionId]
      requestAnimationFrame(async () => {
        instance?.stopTransitions()
        instance?.set("initial")
        await instance?.apply("enter")
        done()
      })
    }

    return () => (
      <Teleport to="body">
        <CTooltipPositioner>
          <Transition onEnter={enterTransition} onLeave={leaveTransition}>
            {api.value.isOpen &&
              withDirectives(
                <chakra.div
                  __css={contentStyles.value}
                  {...api.value.contentProps}
                  {...attrs}
                >
                  {slots.default?.()}
                </chakra.div>,
                [[MotionDirective(TooltipVariants), api.value.transitionId]]
              )}
          </Transition>
        </CTooltipPositioner>
      </Teleport>
    )
  },
})
