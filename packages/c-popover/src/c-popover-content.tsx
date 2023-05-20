import { computed, defineComponent } from "vue"
import { usePopoverContext, useStyles } from "./popover.context"
import {
  type HTMLChakraProps,
  type SystemStyleObject,
  chakra,
} from "@chakra-ui/vue-system"
import { CPopoverPositioner } from "./c-popover-positioner"
import { match } from "@chakra-ui/vue-utils"

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
            onPointerenter(e: MouseEvent) {
              api.value.open()
            },
            onPointerleave(e: MouseEvent) {
              api.value.close()
            },
          },
          click: {},
        }),
      }
    })

    return () => (
      <CPopoverPositioner>
        <chakra.div
          {...popoverContentProps.value}
          __css={contentStyles.value}
          __label="popover__content"
        >
          {slots.default?.()}
        </chakra.div>
      </CPopoverPositioner>
    )
  },
})
