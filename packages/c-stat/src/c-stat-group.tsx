import { PropType, defineComponent, h } from "vue"
import { DOMElements, HTMLChakraProps, chakra } from "@chakra-ui/vue-system"

export interface CStatGroupProps extends HTMLChakraProps<"div"> {}

export const CStatGroup = defineComponent({
  name: "CStatGroup",
  props: {
    as: {
      type: [Object, String] as PropType<DOMElements>,
      default: "div",
    },
  },
  setup(props, { slots, attrs }) {
    return () => (
      <chakra.div
        __label="stat__group"
        as={props.as}
        role="group"
        __css={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "flex-start",
        }}
        {...attrs}
      >
        {slots.default?.()}
      </chakra.div>
    )
  },
})
