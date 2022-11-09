import { h, defineComponent, PropType, toRefs } from "vue"
import {
  chakra,
  ComponentWithProps,
  DeepPartial,
  HTMLChakraProps,
} from "@chakra-ui/vue-system"
import { useCTableStyles } from "./c-table"

export interface CTableCaptionProps extends HTMLChakraProps<"caption"> {
  /**
   * The placement of the table caption. This sets the `caption-side` CSS attribute.
   * @default "bottom"
   */
  placement?: "top" | "bottom"
}

export const CTableCaption: ComponentWithProps<
  DeepPartial<CTableCaptionProps>
> = defineComponent({
  name: "CTableCaption",
  props: {
    placement: String as PropType<CTableCaptionProps["placement"]>,
  },
  setup(props, { slots, attrs }) {
    const { placement, ...rest } = toRefs(props)

    const styles = useCTableStyles()

    return () => (
      <chakra.caption
        {...rest}
        __css={{
          // @ts-ignore Not recognizing `caption` in the object
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
