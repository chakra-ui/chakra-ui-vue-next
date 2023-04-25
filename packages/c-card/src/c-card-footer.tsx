import {
  type Component,
  type DefineComponent,
  type PropType,
  computed,
  defineComponent,
  h,
} from "vue"
import {
  type HTMLChakraProps,
  chakra,
  type SystemStyleObject,
  type DOMElements,
  ComponentWithProps,
} from "@chakra-ui/vue-system"
import { useCardStyles } from "./card.context"

export interface CCardFooterProps extends HTMLChakraProps<"div"> {
  justify?: SystemStyleObject["justifyContent"]
}

export const CCardFooter = defineComponent({
  name: "CCardFooter",
  props: {
    as: {
      type: [Object, String] as PropType<
        DOMElements | Component | DefineComponent
      >,
      default: "div",
    },
    justify: {
      type: String as PropType<CCardFooterProps["justify"]>,
      default: "",
    },
  },
  setup(props, { attrs, slots }) {
    const styles = useCardStyles()

    const ownStyles = computed(() => ({
      display: "flex",
      justifyContent: props.justify,
      ...styles.value.footer,
    }))

    return () => (
      <chakra.div __label="card__footer" __css={ownStyles.value} {...attrs}>
        {slots.default?.()}
      </chakra.div>
    )
  },
}) as ComponentWithProps<CCardFooterProps>
