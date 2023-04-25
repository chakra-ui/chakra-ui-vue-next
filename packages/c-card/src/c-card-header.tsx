import { defineComponent, h } from "vue"
import { HTMLChakraProps, chakra } from "@chakra-ui/vue-system"
import { useCardStyles } from "./card.context"

export interface CCardHeaderProps extends HTMLChakraProps<"div"> {}

export const CCardHeader = defineComponent({
  name: "CCardHeader",
  setup(_, { attrs, slots }) {
    const styles = useCardStyles()

    return () => (
      <chakra.div __label="card__header" __css={styles.value.header} {...attrs}>
        {slots.default?.()}
      </chakra.div>
    )
  },
})
