import { computed, ToRefs, ref, watchEffect } from 'vue';
import { useId, useIds } from '@chakra-ui/vue-composables'
import { dataAttr } from '@chakra-ui/utils';
import { HTMLChakraProps, ThemingProps } from '@chakra-ui/vue-system';

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
}


export function useFormControlProvider(props: ToRefs<FormControlContext>) {
  const {
    id: idProp,
    isRequired,
    isInvalid,
    isDisabled,
    isReadOnly
  } = props

  // Generate all the required ids
  const id = computed(() => idProp?.value || useId('form').value)
  const [labelId, feedbackId, helpTextId] = useIds(id.value,
    'label',
    'feedback',
    'helptext'
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
    id: labelId.value
  }))

  const errorMessageProps = computed(() => ({
    id: feedbackId.value,
    'aria-live': 'polite'
  }))

  const rootProps = computed(() => ({
    role: 'group'
  }))

  const requiredIndicatorProps = computed(() => (props = {} as any) => ({
    role: 'presentation',
    'aria-hidden': 'true',
    defaultSlot: [props.children || '*']
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
    requiredIndicatorProps
  }
}

export interface CFormControlProps
  extends HTMLChakraProps<"div">,
    ThemingProps<"FormControl">,
    FormControlContext {}
