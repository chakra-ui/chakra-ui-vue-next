import { computed, defineComponent, PropType } from "vue"
import { useMediaQuery } from "@vueuse/core"
import { ComponentWithProps } from "@chakra-ui/vue-system"

export interface CVisbilityProps {
  /**
   * Test
   */
  breakpoint: string
  hide?: boolean
}

export const CVisibility = defineComponent(
  {
    props: {
      breakpoint: {
        type: String as PropType<CVisbilityProps["breakpoint"]>,
        required: true,
      },
      hide: Boolean as PropType<CVisbilityProps["hide"]>,
    },
    setup(props, { slots }) {
      const show = useMediaQuery(props.breakpoint)

      const isVisible = computed(() => (props.hide ? !show.value : show.value))

      return () => (isVisible.value ? slots.default!() : null)
    },
  }
)
