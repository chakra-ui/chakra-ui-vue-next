import { vueThemingProps, SNAO, mergeWith } from "@chakra-ui/vue-utils"
import { h, defineComponent, PropType, computed } from "vue"
import {
  chakra,
  keyframes,
  DOMElements,
  ThemingProps,
  useStyleConfig,
  SystemStyleObject,
  HTMLChakraProps,
} from "@chakra-ui/vue-system"
import { CVisuallyHidden } from "@chakra-ui/c-visually-hidden"

const spin = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
})

interface SpinnerOptions {
  /**
   * The color of the empty area in the spinner
   */
  emptyColor?: string
  /**
   * The color of the spinner
   */
  color?: string
  /**
   * The thickness of the spinner
   * @example
   * ```html
   * <c-spinner thickness="4px"/>
   * ```
   */
  thickness?: string
  /**
   * The speed of the spinner.
   * @example
   * ```html
   * <c-spinner speed="0.2s"/>
   * ```
   */
  speed?: string
  /**
   * For accessibility, it is important to add a fallback loading text.
   * This text will be visible to screen readers.
   */
  label?: string
}

export interface CSpinnerProps
  extends SpinnerOptions,
    ThemingProps,
    HTMLChakraProps<"div"> {
  color?: string
  as?: DOMElements
}

const defaultSpinnerProps = {
  as: "div",
  emptyColor: "transparent",
  thickness: "2px",
  speed: "0.45s",
}

export const CSpinner = defineComponent({
  name: "CSpinner",
  props: {
    as: SNAO as PropType<CSpinnerProps["as"]>,
    /**
     * The color of the empty area in the spinner
     */
    emptyColor: SNAO as PropType<CSpinnerProps["emptyColor"]>,
    /**
     * The color of the spinner
     */
    color: SNAO as PropType<CSpinnerProps["color"]>,
    /**
     * The thickness of the spinner
     * @example
     * ```html
     * <c-spinner thickness="4px"/>
     * ```
     */
    thickness: SNAO as PropType<CSpinnerProps["thickness"]>,
    /**
     * The speed of the spinner.
     * @example
     * ```html
     * <c-spinner speed="0.2s"/>
     * ```
     */
    speed: SNAO as PropType<CSpinnerProps["speed"]>,
    /**
     * For accessibility, it is important to add a fallback loading text.
     * This text will be visible to screen readers.
     */
    label: SNAO as PropType<CSpinnerProps["label"]>,
    ...vueThemingProps,
  },
  setup(_props, { slots, attrs }) {
    const props = computed(() => mergeWith({}, defaultSpinnerProps, _props))
    const themingProps = computed<ThemingProps>(() => ({
      colorScheme: props.value.colorScheme,
      variant: props.value.variant,
      size: props.value.size,
      styleConfig: props.value.styleConfig,
    }))
    const styles = useStyleConfig("Spinner", themingProps)
    const spinnerStyles = computed<SystemStyleObject>(() => ({
      display: "inline-block",
      borderColor: "currentColor",
      borderStyle: "solid",
      borderRadius: "99999px",
      borderWidth: props.value.thickness,
      borderBottomColor: props.value.emptyColor,
      borderLeftColor: props.value.emptyColor,
      color: props.value.color,
      animation: `${spin} ${props.value.speed} linear infinite`,
      ...styles.value,
    }))

    return () => (
      <chakra.div
        as={props.value.as}
        __label="spinner"
        __css={spinnerStyles.value}
        {...attrs}
      >
        {props.value.label ? (
          <CVisuallyHidden>{props.value.label}</CVisuallyHidden>
        ) : null}
      </chakra.div>
    )
  },
})
