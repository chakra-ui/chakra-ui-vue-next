import { h, defineComponent, PropType, unref } from "vue"
import { getValidChildren } from "@chakra-ui/vue-utils"
import { CVisibility } from "./c-visibility"
import { useQuery } from "./use-query"
import { CShowProps } from "./c-show"

export interface CHideProps extends CShowProps {}

/**
 * Wrapper component to hide child elements based on breakpoint value
 */
export const CHide = defineComponent({
  props: {
    breakpoint: {
      type: String as PropType<CHideProps["breakpoint"]>,
    },
    above: {
      type: String as PropType<CHideProps["above"]>,
    },
    below: {
      type: String as PropType<CHideProps["below"]>,
    },
  },
  setup(props, { slots }) {
    const query = useQuery(props)
    return () => (
      <CVisibility breakpoint={query.value} hide>
        {() => getValidChildren(slots)}
      </CVisibility>
    )
  },
})
