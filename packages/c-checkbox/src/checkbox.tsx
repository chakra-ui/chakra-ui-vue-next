/**
 * Hey! Welcome to @chakra-ui/vue-next Checkbox
 *
 * C checkbox component is used in forms when a user needs to select multiple values from several options
 *
 * @see Docs     https://next.vue.chakra-ui.com/c-checkbox
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/master/packages/c-checkbox/src/c-checkbox/c-checkbox.tsx
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 */

import {
  h,
  defineComponent,
  PropType,
  computed,
  toRefs,
  reactive,
  ref,
  onMounted,
  Fragment,
  cloneVNode,
  watchEffect,
} from "vue"
import {
  chakra,
  omitThemingProps,
  SystemStyleObject,
  ThemingProps,
  useMultiStyleConfig,
} from "@chakra-ui/vue-system"
import { SNAO, vueThemingProps, getValidChildren } from "@chakra-ui/vue-utils"
import { createStylesContext, SystemProps } from "@chakra-ui/vue-system"
import * as checkbox from "@zag-js/checkbox"
import { normalizeProps, useMachine, mergeProps } from "@zag-js/vue"
import { useId, useIds } from "@chakra-ui/vue-composables"
import { filterUndefined, mergeWith, pick } from "@chakra-ui/utils"
import { useFormControlContext } from "@chakra-ui/c-form-control"
import { HTMLChakraProps } from "@chakra-ui/vue-system"
import { CheckboxIcon } from "./checkbox-icon"
import { genId } from "@chakra-ui/vue-utils"

/**
 * - Implement checkbox as state machine.
 * - Implement checkbox as part of group.
 */

const CCheckboxControl = chakra("span", {
  baseStyle: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    verticalAlign: "top",
    userSelect: "none",
    flexShrink: 0,
  },
})

const CLabel = chakra("label", {
  baseStyle: {
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    verticalAlign: "top",
    position: "relative",
  },
})

export interface CCheckboxControlProps {
  isIndeterminate?: boolean
  /**
   * If `true`, the checkbox will be disabled
   */
  isDisabled?: boolean
  /**
   * If `true` and `disabled` is passed, the checkbox will
   * remain tabbable but not interactive
   */
  isFocusable?: boolean
  /**
   * If `true`, the checkbox will be readonly
   */
  isReadonly?: boolean
  /**
   * If `true`, the checkbox is marked as invalid.
   */
  isInvalid?: boolean
  /**
   * If `true`, the checkbox input is marked as required,
   */
  isRequired?: boolean
  /**
   * The name of the input field in a checkbox
   * (Useful for form submission).
   */
  name?: string
  /**
   * The value to be used in the checkbox input.
   * This is the value that will be returned on form submission.
   */
  value?: string | number
  /**
   * Defines the string that labels the checkbox element.
   */
  "aria-label"?: string
  "aria-labelledby"?: string
  "aria-invalid"?: boolean
  "aria-describedby"?: string
  tabIndex?: number
}

export interface CCheckboxProps
  extends HTMLChakraProps<"input">,
    ThemingProps<"Checkbox">,
    CCheckboxControlProps {
  /**
   * The spacing between the checkbox and its label text
   * @default 0.5rem
   * @type SystemProps["marginLeft"]
   */
  spacing?: SystemProps["marginLeft"]
  /**
   * The color of the checkbox icon when checked or indeterminate
   */
  iconColor?: string
  /**
   * The size of the checkbox icon when checked or indeterminate
   */
  iconSize?: string | number
  /**
   * The checked icon to use
   */
  icon?: any
  /**
   * Additional props to be forwarded to the `input` element
   */
  inputProps?: HTMLChakraProps<"input">
}

export const CCheckbox = defineComponent({
  props: {
    modelValue: String as PropType<string>,
    value: String as PropType<CCheckboxProps["value"]>,
    id: String as PropType<string>,
    isIndeterminate: Boolean as PropType<CCheckboxProps["isIndeterminate"]>,
    isFocusable: Boolean as PropType<CCheckboxProps["isFocusable"]>,
    defaultChecked: Boolean as PropType<boolean>,
    name: String as PropType<CCheckboxProps["name"]>,
    "aria-label": String as PropType<CCheckboxProps["aria-label"]>,
    "aria-labelledby": String as PropType<CCheckboxProps["aria-labelledby"]>,
    "aria-invalid": Boolean as PropType<CCheckboxProps["aria-invalid"]>,
    "aria-describedby": String as PropType<CCheckboxProps["aria-describedby"]>,
    spacing: {
      type: SNAO as PropType<CCheckboxProps["spacing"]>,
      default: "0.5rem",
    },
    iconColor: String as PropType<CCheckboxProps["iconColor"]>,
    iconSize: [String, Number] as PropType<CCheckboxProps["iconSize"]>,
    icon: Object as PropType<CCheckboxProps["icon"]>,
    inputProps: Object as PropType<CCheckboxProps["inputProps"]>,
    ...vueThemingProps,
  },
  emits: ["change", "update:modelValue"],
  setup(props, { slots, attrs, emit }) {
    const ownProps = computed(() => toRefs(reactive(omitThemingProps(props))))
    const mergedProps = computed(() => mergeWith({}, props, attrs))
    const styles = useMultiStyleConfig("Checkbox", mergedProps)

    const inheritedFormControlProps = useFormControlContext()

    const id = genId()
    const [rootId, inputId, controlId, labelId] = useIds(
      `chakra-checkbox-${id}`,
      "root",
      "input",
      "control",
      "label"
    )

    const machineContext = computed<Omit<checkbox.Context, "id">>(() => {
      const _inheritedFormControlProps = pick(
        inheritedFormControlProps?.value || {},
        ["isRequired", "isDisabled", "isInvalid", "isReadOnly"]
      )

      const cleanedContextProps = filterUndefined({
        readonly: _inheritedFormControlProps?.isReadOnly?.value,
        required: _inheritedFormControlProps?.isRequired?.value,
        disabled: _inheritedFormControlProps?.isDisabled?.value,
        invalid: _inheritedFormControlProps?.isInvalid?.value,
      })

      const cleanedOwnProps = filterUndefined({
        required: attrs.isRequired,
        disabled: attrs.isDisabled,
        invalid: attrs.isInvalid,
        readonly: attrs.isReadOnly,
        focusable: props.isFocusable,
        "aria-invalid": props["aria-invalid"],
        "aria-label": props["aria-label"],
        "aria-labelledby": props["aria-labelledby"],
        "aria-describedby": props["aria-describedby"],
      })

      return mergeWith({}, cleanedContextProps, cleanedOwnProps, {
        value: props.value,
        defaultChecked: props.defaultChecked,
        indeterminate: props.isIndeterminate,
      })
    })

    const context = computed<checkbox.Context>(() => ({
      id: id,
      ids: {
        root: rootId.value,
        input: inputId.value,
        control: controlId.value,
        labelId: labelId.value,
      },
      ...machineContext.value,
    }))

    const [state, send] = useMachine(
      checkbox.machine({
        id: "chakra-ui-checkbox-machine",
      }),
      {
        context,
      }
    )

    const api = computed(() =>
      checkbox.connect(state.value, send, normalizeProps)
    )

    const iconStyles = computed<SystemStyleObject>(() => ({
      opacity: api.value.isChecked || api.value.isIndeterminate ? 1 : 0,
      transform:
        api.value.isChecked || api.value.isIndeterminate
          ? "scale(1)"
          : "scale(0.95)",
      fontSize: props.iconSize,
      color: props.iconColor,
      ...styles.value.icon,
    }))

    const clonedIcon = computed(() =>
      cloneVNode(h(CheckboxIcon), {
        __css: iconStyles.value,
        isIndeterminate: api.value.isIndeterminate,
        isChecked: api.value.isChecked,
      })
    )

    const isChecked = computed(() => api.value.isChecked)

    watchEffect(() => {
      console.log("state changed", state.value)
    })

    function handleSetChecked() {
      if (isChecked.value) {
        api.value.setChecked(false)
      } else {
        api.value.setChecked(true)
      }
    }
    //
    // watchEffect(() => {
    //   console.log("machineContext", machineContext.value)
    //   console.log("api", api.value)
    //   console.log("clonedIcon", clonedIcon.value)
    // })

    const inputProps = computed(() =>
      mergeProps(api.value.inputProps, {
        onChange() {
          if (api.value.isIndeterminate && !api.value.isReadOnly) {
            api.value.setIndeterminate(false)
            api.value.setChecked(true)
          }
        },
      })
    )

    return () => {
      const children = getValidChildren(slots)
      const hasChildren = children.length > 0

      return (
        <chakra.div
          sx={{
            "> div": styles.value.container,
          }}
        >
          {() => (
            <CLabel
              __label="checkbox"
              {...api.value.rootProps}
              __css={styles.value.container}
            >
              {() => (
                <>
                  <input class="chakra-checkbox__input" {...inputProps.value} />
                  <CCheckboxControl
                    __label="checkbox__control"
                    __css={styles.value.control}
                    {...api.value.controlProps}
                  >
                    {() => clonedIcon.value}
                  </CCheckboxControl>
                  {hasChildren && (
                    <chakra.span
                      label="checkbox__label"
                      {...api.value.labelProps}
                      __css={{
                        marginStart: props.spacing,
                        ...styles.value.label,
                      }}
                    >
                      {slots}
                    </chakra.span>
                  )}
                </>
              )}
            </CLabel>
          )}
        </chakra.div>
      )
    }
  },
})
