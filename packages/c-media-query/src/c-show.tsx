import { h, defineComponent, PropType, unref } from "vue"
import { getValidChildren } from "@chakra-ui/vue-utils"
import { CVisibility } from "./c-visibility"
import { useQuery } from "./use-query"
import { ComponentWithProps } from "@chakra-ui/vue-system"

export interface CShowProps {
  /**
   * A custom css media query that determines when the `slots` are rendered.
   * Will render `slots` if that query resolves to `true`.
   */
  breakpoint?: string
  /**
   * A value from the `breakpoints` section in the theme. Will render `slots`
   * from that breakpoint and below. Default breakpoint values: `sm`, `md`, `lg`, `xl`, `2xl`.
   */
  below?: string
  /**
   * A value from the `breakpoints` section in the theme. Will render `slots`
   * from that breakpoint and above. Default breakpoint values: `sm`, `md`, `lg`, `xl`, `2xl`.
   */
  above?: string
}

export const CShow: ComponentWithProps<CShowProps> = defineComponent({
  props: {
    breakpoint: {
      type: String as PropType<CShowProps["breakpoint"]>,
    },
    above: {
      type: String as PropType<CShowProps["above"]>,
    },
    below: {
      type: String as PropType<CShowProps["below"]>,
    },
  },
  setup(props, { slots }) {
    const query = useQuery(props)
    return () => {
      return (
        <CVisibility breakpoint={unref(query)}>
          {() => getValidChildren(slots)}
        </CVisibility>
      )
    }
  },
})
