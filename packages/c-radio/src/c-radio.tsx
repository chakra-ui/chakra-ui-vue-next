/**
 * Hey! Welcome to @chakra-ui/vue-next CRadio
 *
 * Radios are used when only one choice may be selected in a series of options
 *
 * @see Docs     https://next.vue.chakra-ui.com/c-radio
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/main/packages/c-radio/src/c-radio/c-radio.ts
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 */

import {
  computed,
  defineComponent,
  h,
  InputHTMLAttributes,
  mergeProps,
  PropType,
  reactive,
} from "vue"
import {
  chakra,
  HTMLChakraProps,
  type ThemingProps,
  type StyleResolverProps,
  useMultiStyleConfig,
} from "@chakra-ui/vue-system"
import * as VS from "@chakra-ui/vue-system"
import { getValidChildren, SNAO, vueThemingProps } from "@chakra-ui/vue-utils"
import { RadioContext, useRadioGroupContext } from "./radio-context"

export interface CRadioProps
  extends Omit<HTMLChakraProps<"label">, keyof RadioContext>,
    ThemingProps<"Radio">,
    RadioContext {
  /**
   * The spacing between the checkbox and its label text
   * @default 0.5rem
   * @type SystemProps["marginLeft"]
   */
  spacing?: StyleResolverProps["marginLeft"]
  /**
   * Additional props to be forwarded to the `input` element
   */
  inputProps?: InputHTMLAttributes
}

export const CRadio = defineComponent({
  props: {
    value: {
      type: String as PropType<CRadioProps["value"]>,
      required: true,
    },
    disabled: {
      type: Boolean as PropType<CRadioProps["disabled"]>,
    },
    invalid: {
      type: Boolean as PropType<CRadioProps["invalid"]>,
    },
    readOnly: {
      type: Boolean as PropType<CRadioProps["readOnly"]>,
    },
    spacing: {
      type: SNAO as PropType<CRadioProps["spacing"]>,
      default: "0.5rem",
    },
    ...vueThemingProps,
  },
  setup(props, { slots, attrs }) {
    const groupApi = useRadioGroupContext()

    const styleAttrs = computed(() => mergeProps(props, groupApi.value, attrs))

    const styles = useMultiStyleConfig("Radio", styleAttrs)

    const radioProps = reactive({
      value: props.value,
      disabled: props.disabled,
      invalid: props.invalid,
      readOnly: props.readOnly,
    })

    const inputProps = computed(() => {
      const apiInputProps = groupApi.value.getRadioInputProps(radioProps)
      const apiInputState = groupApi.value.getRadioState(radioProps)

      return {
        ...apiInputProps,
        // modelValue: apiInputState.isChecked,
      }
    })

    const rootStyles = computed(() => ({
      display: "inline-flex",
      alignItems: "center",
      verticalAlign: "top",
      cursor: "pointer",
      position: "relative",
      ...styles.value.container,
    }))

    const labelStyles = computed(() => ({
      userSelect: "none",
      marginStart: props.spacing,
      ...styles.value.label,
    }))

    const controlStyles = computed(() => ({
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      ...styles.value.control,
    }))

    return () => (
      <chakra.label
        {...groupApi.value.getRadioProps(radioProps)}
        __css={rootStyles.value}
        {...attrs}
      >
        <chakra.input
          __chakraIsRaw
          __label="radio__input"
          {...inputProps.value}
        />
        <chakra.span
          __label="radio__control"
          {...groupApi.value.getRadioControlProps(radioProps)}
          __css={controlStyles.value}
        />
        <chakra.span
          __label="radio__label"
          {...groupApi.value.getRadioLabelProps(radioProps)}
          __css={labelStyles.value}
        >
          {() => getValidChildren(slots)}
        </chakra.span>
      </chakra.label>
    )
  },
})
