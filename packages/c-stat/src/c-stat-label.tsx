import { PropType, defineComponent, h } from "vue"
import { DOMElements, HTMLChakraProps, chakra } from "@chakra-ui/vue-system"
import { useStatStyles } from "./c-stat"

export interface CStatLabelProps extends HTMLChakraProps<"dt"> {}

export const CStatLabel = defineComponent({
  name: "CStatLabel",
  props: {
    as: {
      type: [Object, String] as PropType<DOMElements>,
      default: "dt",
    },
  },
  setup(props, { slots, attrs }) {
    const styles = useStatStyles()

    return () => (
      <chakra.dt
        __label="stat__label"
        as={props.as}
        __css={styles.value.label}
        {...attrs}
      >
        {slots.default?.()}
      </chakra.dt>
    )
  },
})
