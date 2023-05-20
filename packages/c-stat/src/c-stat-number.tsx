import { PropType, defineComponent, h } from "vue"
import { DOMElements, HTMLChakraProps, chakra } from "@chakra-ui/vue-system"
import { useStatStyles } from "./c-stat"

export interface CStatNumberProps extends HTMLChakraProps<"dd"> {}

export const CStatNumber = defineComponent({
  name: "CStatNumber",
  props: {
    as: {
      type: [Object, String] as PropType<DOMElements>,
      default: "dd",
    },
  },
  setup(props, { slots, attrs }) {
    const styles = useStatStyles()

    return () => (
      <chakra.dd
        __label="stat__number"
        as={props.as}
        __css={{
          ...styles.value.number,
          fontFeatureSettings: "pnum",
          fontVariantNumeric: "proportional-nums",
        }}
        {...attrs}
      >
        {slots.default?.()}
      </chakra.dd>
    )
  },
})
