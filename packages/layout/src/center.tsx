import { defineComponent, h, PropType } from "vue"
import {
  chakra,
  DOMElements,
  HTMLChakraProps,
} from "@chakra-ui/vue-system"
import type * as CSS from "csstype"

export interface CCenterProps extends HTMLChakraProps<"div"> { }

/**
 * Vue component used to horizontally and vertically center its child.
 * It uses the popular `display: flex` centering technique.
 *
 * @see Docs https://vue.chakra-ui.com/docs/layout/center
 */
export const CCenter = defineComponent({
  name: "CCenter",
  props: {
    as: {
      type: [String, Object] as PropType<DOMElements>,
      default: "div",
    },
  },
  setup(props, { slots, attrs }) {
    return () => {
      return (
        <chakra.div
          __label="center"
          __css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          {...props}
          {...attrs}
        >
          {slots}
        </chakra.div>
      )
    }
  },
})
