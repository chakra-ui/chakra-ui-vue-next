/**
 * Hey! Welcome to @chakra-ui/vue-next CFormControl
 *
 * Form control component is used to manage form controls such input fields checkbox and radio buttons it provides components and context that make your form fields accessible by default
 *
 * @see Docs     https://next.vue.chakra-ui.com/c-form-control
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/master/packages/c-form-control/src/c-form-control/c-form-control.ts
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 */

import { h, defineComponent, ComputedRef, computed, PropType, toRefs } from 'vue'
import { chakra, ComponentWithProps, DeepPartial, DOMElements, useMultiStyleConfig, StylesProvider, omitThemingProps } from '@chakra-ui/vue-system'
import { CFormControlProps, useFormControlProvider } from './use-form-control'
import { mergeWith } from '@chakra-ui/utils'
import { createContext } from '@chakra-ui/vue-utils'

type CFormControlProviderContext = ComputedRef<Omit<
  ReturnType<typeof useFormControlProvider>,
  "rootProps"
>>

const [
  FormControlProvider,
  useFormControlContext
] = createContext<CFormControlProviderContext>()

export { useFormControlContext }

/**
 * `CFormControl` provides context such as
 * `isInvalid`, `isDisabled`, and `isRequired` to form elements.
 *
 * This is commonly used in form elements such as `input`,
 * `select`, `textarea`, etc.
 */

export const CFormControl: ComponentWithProps<
DeepPartial<CFormControlProps>
> = defineComponent({
  props: {
    as: {
      type: [Object, String] as PropType<DOMElements>,
      default: 'div',
    },
  },
  setup(_props, { slots, attrs }) {
    const { as, ...props } = toRefs(_props)
    const ownProps = computed(() => props)
    const styles = useMultiStyleConfig('Form', props)

    const { rootProps, ..._context } = useFormControlProvider(ownProps.value)

    const context: CFormControlProviderContext = computed(() => _context)

    FormControlProvider(context)
    StylesProvider(styles)

    return () => (
      <chakra.div as={as.value} {...rootProps.value} __css={styles.value.container} __label="form-control">
        {slots}
      </chakra.div>
    )
  },
})
