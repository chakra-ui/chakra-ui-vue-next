import { h, defineComponent, PropType, unref } from "vue"
import { getValidChildren } from "@chakra-ui/vue-utils"
import { CVisibility } from "./c-visibility"
import { useQuery } from "./use-query"
import { ComponentWithProps } from "@chakra-ui/vue-system"
import { CShowProps } from "./c-show"

export interface CHideProps extends CShowProps {}

export const CHide: ComponentWithProps<CHideProps> = defineComponent({
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
      <CVisibility breakpoint={unref(query)} hide>
        {() => getValidChildren(slots)}
      </CVisibility>
    )
  },
})