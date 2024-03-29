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
  Fragment,
  h,
  PropType,
  reactive,
  toRefs,
  type ConcreteComponent,
  watchEffect,
  DefineComponent,
} from "vue"
import {
  AnatomyParts,
  chakra,
  HTMLChakraProps,
  omitThemingProps,
  ThemingProps,
  useMultiStyleConfig,
} from "@chakra-ui/vue-system"
import { SAO, vueThemingProps, isObjectComponent } from "@chakra-ui/vue-utils"
import { FormControlOptions, useFormControl } from "@chakra-ui/c-form-control"

import { CSelectField, CSelectFieldProps } from "./c-select-field"

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
  extends CSelectFieldProps,
    ThemingProps<"Select">,
    SelectOptions {
  /**
   * Props to forward to the root `div` element
   */
  rootProps?: RootProps
}

const CDefaultSelectIcon = defineComponent(() => {
  return () => (
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
  )
})
CDefaultSelectIcon.name = "CDefaultSelectIcon"

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
    modelValue: [String, Number] as PropType<string | number>,
    ...vueThemingProps,
  },
  emits: ["update:modelValue"],
  setup(props, { slots, attrs, emit }) {
    const styles = useMultiStyleConfig<AnatomyParts.Select>("Select", props)

    const ownProps = computed(() => toRefs(reactive(omitThemingProps(props))))

    const fieldProps = useFormControl(ownProps.value)

    function handleChangeValue(e: Event) {
      emit("update:modelValue", (e.target as HTMLSelectElement)?.value)
    }

    const SelectIcon = computed(() => {
      return slots?.icon?.() || [h(CDefaultSelectIcon)]
    })

    const rootStyles = computed(() => ({
      width: "100%",
      height: "fit-content",
      position: "relative",
      color: props.color,
    }))

    const fieldStyles = computed(() => ({
      paddingEnd: "2rem",
      ...styles.value.field,
      _focus: {
        zIndex: "unset",
        ...(styles as any).value.field?.["_focus"],
      },
    }))

    const iconColor = computed(() => props.iconColor ?? props.color)

    return () => (
      <chakra.div __css={rootStyles.value}>
        <chakra.select
          __label="select"
          __css={fieldStyles.value}
          {...fieldProps.value}
          {...attrs}
          value={props.modelValue}
          onChange={handleChangeValue}
        >
          <Fragment>
            {props.placeholder && <option value="">{props.placeholder}</option>}
            {slots.default?.()}
          </Fragment>
        </chakra.select>
        <CSelectIcon
          data-disabled={fieldProps.value.disabled}
          {...fieldProps.value}
          color={iconColor.value}
          __css={styles.value.icon}
        >
          {SelectIcon.value}
        </CSelectIcon>
      </chakra.div>
    )
  },
})

const CSelectIcon = defineComponent({
  name: "CSelectIcon",
  setup(_, { attrs, slots }) {
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
        {slots.default?.()}
      </chakra.div>
    )
  },
})
