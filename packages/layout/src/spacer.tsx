import {
  chakra,
  ComponentWithProps,
  DeepPartial,
  HTMLChakraProps,
} from "@chakra-ui/vue-system"
import { defineComponent, h } from "vue"
import type * as CSS from "csstype"

export interface SpacerProps extends HTMLChakraProps<"div"> { }

/**
 * A flexible flex spacer that expands along the major axis of its containing flex layout.
 * It renders a `div` by default, and takes up any available space.
 *
 * @see Docs https://chakra-ui.com/docs/layout/flex#using-the-spacer
 */
export const CSpacer = defineComponent({
  name: "CSpacer",
  setup(_, { slots }) {
    return () => {
      return (
        <chakra.div
          __label="spacer"
          baseStyle={{
            flex: 1,
            justifySelf: "stretch",
            alignSelf: "stretch",
          }}
        >
          {slots}
        </chakra.div>
      )
    }
  },
})
