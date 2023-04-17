/**
 * Hey! Welcome to @chakra-ui/vue-next CSelect
 *
 * A component that allows users pick a value from predefined options
 *
 * @see Docs     https://next.vue.chakra-ui.com/c-select
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/main/packages/c-select/src/c-select/c-select.ts
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 */

import {
  computed,
  defineComponent,
  h,
  mergeProps,
  PropType,
  reactive,
  SVGAttributes,
  ToRefs,
  toRefs,
  VNode,
} from "vue"
import { filterUndefined } from "@chakra-ui/utils"
import {
  chakra,
  HTMLChakraProps,
  omitThemingProps,
  SystemStyleObject,
  ThemingProps,
  useMultiStyleConfig,
} from "@chakra-ui/vue-system"
import {
  Assign,
  SAO,
  vueThemingProps,
  withSingleton,
} from "@chakra-ui/vue-utils"
import { FormControlOptions, useFormControl } from "@chakra-ui/c-form-control"

import { CSelectField, SelectFieldProps } from "./c-select-field"

interface RootProps extends Omit<HTMLChakraProps<"div">, "color"> {}

interface SelectOptions extends FormControlOptions {
  /**
   * The border color when the select is focused. Use color keys in `theme.colors`
   * @example
   * focusBorderColor = "blue.500"
   */
  focusBorderColor?: string
  /**
   * The border color when the select is invalid. Use color keys in `theme.colors`
   * @example
   * errorBorderColor = "red.500"
   */
  errorBorderColor?: string
  /**
   * The placeholder for the select. We render an `<option/>` element that has
   * empty value.
   *
   * ```jsx
   * <option value="">{placeholder}</option>
   * ```
   */
  placeholder?: string
  /**
   * The size (width and height) of the icon
   */
  iconSize?: string
  /**
   * The color of the icon
   */
  iconColor?: string
}

export interface CSelectProps
  extends SelectFieldProps,
    ThemingProps<"Select">,
    SelectOptions {
  /**
   * Props to forward to the root `div` element
   */
  rootProps?: RootProps
}

export const CSelect = defineComponent({
  name: "CSelect",
  props: {
    color: String,
    placeholder: String,
    iconColor: String as PropType<CSelectProps["iconColor"]>,
    isDisabled: Boolean as PropType<CSelectProps["isDisabled"]>,
    isInvalid: Boolean as PropType<CSelectProps["isInvalid"]>,
    focusBorderColor: SAO as PropType<CSelectProps["focusBorderColor"]>,
    errorBorderColor: SAO as PropType<CSelectProps["errorBorderColor"]>,
    ...vueThemingProps,
  },
  setup(props, { slots, attrs }) {
    const styles = useMultiStyleConfig("Select", props)

    const ownProps = computed(() => toRefs(reactive(omitThemingProps(props))))

    const fieldProps = useFormControl(ownProps.value)
    console.log(
      "🚀 ~ file: c-select.tsx:104 ~ setup ~ fieldProps:",
      fieldProps.value
    )

    const rootStyles: SystemStyleObject = {
      width: "100%",
      height: "fit-content",
      position: "relative",
      color: props.color,
    }

    const fieldStyles: SystemStyleObject = {
      paddingEnd: "2rem",
      ...styles.value.field,
      _focus: {
        zIndex: "unset",
        ...(styles as any).value.field?.["_focus"],
      },
    }

    const iconColor = computed(() => props.iconColor ?? props.color)

    return () => (
      <chakra.div __css={rootStyles}>
        <CSelectField
          placeholder={props.placeholder}
          __css={fieldStyles}
          {...fieldProps.value}
          {...attrs}
        >
          {slots.default?.()}
        </CSelectField>
        <CSelectIcon
          data-disabled={fieldProps.value.disabled}
          {...fieldProps.value}
          color={iconColor.value}
          __css={styles.value.icon}
        />
      </chakra.div>
    )
  },
})

const CSelectIcon = defineComponent({
  name: "CSelectIcon",
  setup(_, { attrs }) {
    return () => (
      <chakra.div
        __label="select__icon-wrapper"
        position="absolute"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        pointerEvents="none"
        top="50%"
        transform="translateY(-50%)"
        {...attrs}
      >
        <svg
          role="presentation"
          class="chakra-select__icon"
          viewBox="0 0 24 24"
          aria-hidden
          style={{
            width: "1em",
            height: "1em",
            color: "currentColor",
          }}
        >
          <path
            fill="currentColor"
            d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
          />
        </svg>
      </chakra.div>
    )
  },
})
