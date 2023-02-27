import { h, defineComponent, PropType } from "vue"
import { chakra, HTMLChakraProps } from "@chakra-ui/vue-system"
import type * as CSS from "csstype"

export interface CTableContainerProps extends HTMLChakraProps<"div"> {}

export const CTableContainer = defineComponent({
  name: "CTableContainer",
  props: {
    overflow: String as PropType<CTableContainerProps["overflow"]>,
    overflowX: String as PropType<CTableContainerProps["overflowX"]>,
  },
  setup(props, { slots, attrs }) {
    return () => (
      <chakra.div
        __label="table__container"
        __css={{
          display: "block",
          whiteSpace: "nowrap",
          WebkitOverflowScrolling: "touch",
          overflowX: props.overflow ?? props.overflowX ?? "auto",
          overflowY: "hidden",
          maxWidth: "100%",
        }}
        {...attrs}
      >
        {slots.default?.()}
      </chakra.div>
    )
  },
})
