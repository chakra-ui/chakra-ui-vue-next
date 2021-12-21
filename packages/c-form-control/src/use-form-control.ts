import {
  computed,
  ToRefs,
  ref,
  ComputedRef,
  watchEffect,
  VNodeProps,
} from "vue"
import { useId, useIds } from "@chakra-ui/vue-composables"
import { ariaAttr, dataAttr, callAllHandlers } from "@chakra-ui/utils"
import { HTMLChakraProps, ThemingProps } from "@chakra-ui/vue-system"
import { createContext } from "@chakra-ui/vue-utils"

export interface FormControlOptions {
  /**
   * If `true`, the form control will be required. This has 2 side effects:
   * - The `FormLabel` will show a required indicator
   * - The form element (e.g, Input) will have `aria-required` set to `true`
   */
  isRequired?: boolean
  /**
   * If `true`, the form control will be disabled. This has 2 side effects:
   * - The `FormLabel` will have `data-disabled` attribute
   * - The form element (e.g, Input) will be disabled
   */
  isDisabled?: boolean
  /**
   * If `true`, the form control will be invalid. This has 2 side effects:
   * - The `FormLabel` and `FormErrorIcon` will have `data-invalid` set to `true`
   * - The form element (e.g, Input) will have `aria-invalid` set to `true`
   */
  isInvalid?: boolean
  /**
   * If `true`, the form control will be readonly
   */
  isReadOnly?: boolean
}

export interface FormControlContext extends FormControlOptions {
  /**
   * The label text used to inform users as to what information is
   * requested for a text field.
   */
  label?: string
  /**
   * The custom `id` to use for the form control. This is passed directly to the form element (e.g, Input).
   * - The form element (e.g Input) gets the `id`
   * - The form label id: `form-label-${id}`
   * - The form error text id: `form-error-text-${id}`
   * - The form helper text id: `form-helper-text-${id}`
   */
  id?: string
  /**
   * The custom `for` attribute passed on to the CFormLabel for it's corresponding field
   */
  for?: string
}

export function useFormControlProvider(props: ToRefs<FormControlContext>) {
  const {
    id: idProp,
    isRequired,
    isInvalid,
    isDisabled,
    isReadOnly,
    for: forProp,
  } = props

  // Generate all the required ids
  const id = computed(() => idProp?.value || useId("form").value)
  const [labelId, feedbackId, helpTextId] = useIds(
    id.value,
    "label",
    "feedback",
    "helptext"
  )

  /**
   * Track whether the `CFormErrorMessage` has been rendered.
   * We use this to append its id the the `aria-describedby` of the `input`.
   */
  const hasFeedbackText = ref(false)

  /**
   * Track whether the `CFormHelperText` has been rendered.
   * We use this to append its id the the `aria-describedby` of the `input`.
   */
  const hasHelpText = ref(false)

  // Tracks whether focus is contained inside the form element
  const isFocused = ref(false)

  const helperTextProps = computed(() => ({
    id: helpTextId.value,
  }))

  const labelProps = computed(() => ({
    "data-focus": dataAttr(isFocused.value),
    "data-disabled": dataAttr(isDisabled?.value),
    "data-invalid": dataAttr(isInvalid?.value),
    "data-readonly": dataAttr(isReadOnly?.value),
    id: labelId.value,
    for: forProp?.value ?? id.value,
  }))

  const errorMessageProps = computed(() => ({
    id: feedbackId.value,
    "aria-live": "polite",
  }))

  const rootProps = computed(() => ({
    role: "group",
  }))

  const requiredIndicatorProps = computed(() => ({
    role: "presentation",
    "aria-hidden": true,
  }))

  return {
    isRequired,
    isInvalid,
    isReadOnly,
    isDisabled,
    isFocused,
    onFocus: () => {
      isFocused.value = true
    },
    onBlur: () => {
      isFocused.value = false
    },
    hasFeedbackText,
    hasHelpText,
    id,
    labelId,
    feedbackId,
    helpTextId,
    rootProps,
    labelProps,
    helperTextProps,
    errorMessageProps,
    requiredIndicatorProps,
  }
}

export type CFormControlProviderContext = ComputedRef<
  Omit<ReturnType<typeof useFormControlProvider>, "rootProps">
>

const [
  FormControlProvider,
  useFormControlContext,
] = createContext<CFormControlProviderContext>({
  strict: false,
  name: "FormControlContext",
})

export { FormControlProvider, useFormControlContext }

export interface CFormControlProps
  extends HTMLChakraProps<"div">,
    ThemingProps<"FormControl">,
    FormControlContext {}

export interface UseFormControlProps<T extends VNodeProps>
  extends FormControlOptions {
  id?: string
  onFocus?: (event: FocusEvent) => any
  onBlur?: (event: FocusEvent) => any
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
}

/**
 * Vue Composable that provides the props that should be spread on to
 * input fields (`input`, `select`, `textarea`, etc.).
 *
 * It provides a convenient way to control a form fields, validation
 * and helper text.
 */
export function useFormControl<T extends VNodeProps>(
  props: ToRefs<UseFormControlProps<T>>
) {
  const {
    isDisabled,
    isInvalid,
    isReadOnly,
    isRequired,
    id,
    "aria-describedby": ariaDescribedBy,
    onBlur,
    onFocus,
  } = useFormControlProps(props)

  const formControlProps = computed(() => ({
    id: id?.value,
    "aria-describedby": ariaDescribedBy.value,
    onBlur,
    onFocus,
    disabled: isDisabled?.value,
    readOnly: isReadOnly?.value,
    required: isRequired?.value,
    "aria-invalid": ariaAttr(isInvalid?.value),
    "aria-required": ariaAttr(isRequired?.value),
    "aria-readonly": ariaAttr(isReadOnly?.value),
  }))

  return formControlProps
}

export function useFormControlProps<T extends VNodeProps>(
  props: ToRefs<UseFormControlProps<T>>
) {
  const field = useFormControlContext()

  const {
    id,
    disabled,
    readOnly,
    required,
    isRequired,
    isInvalid,
    isReadOnly,
    isDisabled,
    onFocus,
    onBlur,
    ...rest
  } = props

  const labelIds = ref<string[]>(
    props["aria-describedby"]?.["value"]
      ? [props["aria-describedby"]?.["value"]]
      : []
  )

  watchEffect(() => {
    // Error message must be described first in all scenarios.
    if (field?.value.hasFeedbackText.value && field?.value?.isInvalid?.value) {
      labelIds.value.push(field?.value?.feedbackId?.value)
    }

    if (field?.value?.hasHelpText?.value) {
      labelIds.value.push(field.value.helpTextId.value)
    }
  })

  return {
    ...rest,
    "aria-describedby": computed(() => labelIds.value.join(" ") || undefined),
    id: id ?? field?.value.id,
    isDisabled: disabled ?? isDisabled ?? field?.value?.isDisabled,
    isReadOnly: readOnly ?? isReadOnly ?? field?.value?.isReadOnly,
    isRequired: required ?? isRequired ?? field?.value?.isRequired,
    isInvalid: isInvalid ?? field?.value?.isInvalid,
    onFocus: callAllHandlers(field?.value?.onFocus, onFocus?.value),
    onBlur: callAllHandlers(field?.value?.onBlur, onBlur?.value),
  }
}
