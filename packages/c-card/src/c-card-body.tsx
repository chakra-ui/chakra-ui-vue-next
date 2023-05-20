import { defineComponent, h } from "vue"
import { HTMLChakraProps, chakra } from "@chakra-ui/vue-system"
import { useCardStyles } from "./card.context"

export interface CCardBodyProps extends HTMLChakraProps<"div"> {}

export const CCardBody = defineComponent({
  name: "CCardBody",
  setup(_, { attrs, slots }) {
    const styles = useCardStyles()

    return () => (
      <chakra.div __label="card__body" __css={styles.value.body} {...attrs}>
        {slots.default?.()}
      </chakra.div>
    )
  },
})
