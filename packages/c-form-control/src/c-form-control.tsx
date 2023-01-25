/**
 * Hey! Welcome to @chakra-ui/vue-next CFormControl
 *
 * Form control component is used to manage form controls such input fields checkbox and radio buttons it provides components and context that make your form fields accessible by default
 *
 * @see Docs     https://next.vue.chakra-ui.com/c-form-control
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/main/packages/c-form-control/src/c-form-control/c-form-control.ts
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 */

import { h, defineComponent, computed, PropType, toRefs } from "vue"
import {
  chakra,
  DOMElements,
  useMultiStyleConfig,
  StylesProvider,
  HTMLChakraProps,
  useStyles,
} from "@chakra-ui/vue-system"
import {
  CFormControlProps,
  CFormControlProviderContext,
  useFormControlProvider,
  FormControlProvider,
  useFormControlContext,
} from "./use-form-control"

/**
 * `CFormControl` provides context such as
 * `isInvalid`, `isDisabled`, and `isRequired` to form elements.
 *
 * This is commonly used in form elements such as `input`,
 * `select`, `textarea`, etc.
 */

export const formControlProps = {
  isRequired: Boolean as PropType<CFormControlProps["isRequired"]>,
  isDisabled: Boolean as PropType<CFormControlProps["isDisabled"]>,
  isInvalid: Boolean as PropType<CFormControlProps["isInvalid"]>,
  isReadOnly: Boolean as PropType<CFormControlProps["isReadOnly"]>,
  label: String as PropType<CFormControlProps["label"]>,
  id: String as PropType<CFormControlProps["id"]>,
}

export const CFormControl = defineComponent({
  props: {
    as: {
      type: [Object, String] as PropType<DOMElements>,
      default: "div",
    },
    ...formControlProps,
  },
  setup(_props, { slots, attrs }) {
    const { as, ...props } = toRefs(_props)
    const ownProps = computed(() => props)
    const styles = useMultiStyleConfig("Form", props)
    const { rootProps, ..._context } = useFormControlProvider(ownProps.value)

    const context: CFormControlProviderContext = computed(() => _context)

    FormControlProvider(context)
    StylesProvider(styles)

    return () => (
      <chakra.div
        as={as.value}
        {...rootProps.value}
        __css={styles.value.container}
        __label="form"
        {...attrs}
      >
        {slots}
      </chakra.div>
    )
  },
})

export interface CHelpTextProps extends HTMLChakraProps<"div"> { }
/**
 * CFormHelperText
 *
 * Assistive component that conveys additional guidance
 * about the field, such as how it will be used and what
 * types in values should be provided.
 */
export const CFormHelperText = defineComponent((props, { attrs, slots }) => {
  const field = useFormControlContext()
  const styles = useStyles()
  const handleVNodeMounted = () => {
    field.value.hasHelpText.value = true
  }

  return () => (
    <chakra.div
      __label="form__helper-text"
      onVnodeBeforeMount={handleVNodeMounted}
      {...field.value.helperTextProps.value}
      __css={styles.value.helperText}
      {...attrs}
    >
      {slots}
    </chakra.div>
  )
})
