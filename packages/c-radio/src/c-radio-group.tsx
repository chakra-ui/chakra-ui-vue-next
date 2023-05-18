import { h, PropType, defineComponent } from "vue"
import {
  HTMLChakraProps,
  ThemingProps,
  chakra,
  useMultiStyleConfig,
} from "@chakra-ui/vue-system"
import { useThemingProps, vueThemingProps } from "@chakra-ui/vue-utils"
import { UseRadioGroupProps, useRadioGroup } from "./use-radio-group"
import { RadioGroupProvider, RadioGroupStylesProvider } from "./radio-context"

export interface CRadioGroupProps
  extends UseRadioGroupProps,
    HTMLChakraProps<"div">,
    Omit<ThemingProps<"Radio">, "orientation"> {}

export const CRadioGroup = defineComponent({
  name: "CRadioGroup",
  props: {
    dir: {
      type: String as PropType<CRadioGroupProps["dir"]>,
    },
    disabled: {
      type: Boolean as PropType<CRadioGroupProps["disabled"]>,
    },
    form: {
      type: String as PropType<CRadioGroupProps["form"]>,
    },
    getRootNode: {
      type: Function as PropType<CRadioGroupProps["getRootNode"]>,
    },
    id: {
      type: String as PropType<CRadioGroupProps["id"]>,
    },
    ids: {
      type: Object as PropType<CRadioGroupProps["ids"]>,
    },
    name: {
      type: String as PropType<CRadioGroupProps["name"]>,
    },
    modelValue: {
      type: String as PropType<CRadioGroupProps["modelValue"]>,
    },
    orientation: {
      type: String as PropType<CRadioGroupProps["orientation"]>,
    },
    readonly: {
      type: Boolean as PropType<CRadioGroupProps["readOnly"]>,
    },
    ...vueThemingProps,
  },
  emits: ["change", "update:modelValue"],
  setup(props, { slots, attrs, expose }) {
    const api = useRadioGroup(props)

    const themeProps = useThemingProps(props)

    const styles = useMultiStyleConfig("Radio", themeProps)

    RadioGroupProvider(api)

    RadioGroupStylesProvider(styles)

    expose(api.value)

    return () => (
      <chakra.div __label="radio-group" {...api.value.rootProps} {...attrs}>
        {slots.default?.(api.value)}
      </chakra.div>
    )
  },
})
