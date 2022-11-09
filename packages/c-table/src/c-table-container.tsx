import { h, defineComponent, PropType, toRefs } from "vue"
import {
  chakra,
  ComponentWithProps,
  DeepPartial,
  HTMLChakraProps,
} from "@chakra-ui/vue-system"

export interface CTableContainerProps extends HTMLChakraProps<"div"> {}

export const CTableContainer: ComponentWithProps<
  DeepPartial<CTableContainerProps>
> = defineComponent({
  name: "CTableContainer",
  props: {
    overflow: String as PropType<CTableContainerProps["overflow"]>,
    overflowX: String as PropType<CTableContainerProps["overflowX"]>,
  },
  setup(props, { slots, attrs }) {
    const { overflow, overflowX, ...rest } = toRefs(props)

    return () => (
      <chakra.div
        {...rest}
        __css={{
          display: "block",
          whiteSpace: "nowrap",
          WebkitOverflowScrolling: "touch",
          overflowX: overflow.value ?? overflowX.value ?? "auto",
          overflowY: "hidden",
          maxWidth: "100%",
        }}
        {...attrs}
      >
        {slots}
      </chakra.div>
    )
  },
})
