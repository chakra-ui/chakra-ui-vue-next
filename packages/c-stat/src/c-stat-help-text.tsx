import { PropType, defineComponent, h } from "vue"
import { DOMElements, HTMLChakraProps, chakra } from "@chakra-ui/vue-system"
import { useStatStyles } from "./c-stat"

export interface CStatHelpTextProps extends HTMLChakraProps<"dd"> {}

export const CStatHelpText = defineComponent({
  name: "CStatHelpText",
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
        __label="stat__help-text"
        as={props.as}
        __css={styles.value.helpText}
        {...attrs}
      >
        {slots.default?.()}
      </chakra.dd>
    )
  },
})
