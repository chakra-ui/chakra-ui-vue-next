import { h, defineComponent, PropType } from "vue"
import {
  chakra,
  ComponentWithProps,
  DeepPartial,
  HTMLChakraProps,
} from "@chakra-ui/vue-system"
import { useTableStyles } from "./c-table"

export interface CTableCaptionProps extends HTMLChakraProps<"caption"> {
  /**
   * The placement of the table caption. This sets the `caption-side` CSS attribute.
   * @default "bottom"
   */
  placement?: "top" | "bottom"
}

export const CTableCaption = defineComponent({
  name: "CTableCaption",
  props: {
    placement: String as PropType<CTableCaptionProps["placement"]>,
  },
  setup(props, { slots, attrs }) {
    const styles = useTableStyles()

    return () => (
      <chakra.caption
        __label="table__caption"
        __css={{
          ...styles.value.caption,
          captionSide: props.placement ?? "bottom",
        }}
        {...attrs}
      >
        {slots}
      </chakra.caption>
    )
  },
})
