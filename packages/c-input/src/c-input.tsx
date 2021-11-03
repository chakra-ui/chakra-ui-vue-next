/**
 * Hey! Welcome to @chakra-ui/vue-next CInput
 *
 * Input component is a component that is used to get user input in a text field
 *
 * @see Docs     https://next.vue.chakra-ui.com/c-input
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/master/packages/c-input/src/c-input/c-input.ts
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 */

import { h, defineComponent, Fragment, PropType, toRefs, ToRefs, computed } from 'vue'
import { chakra, DOMElements, HTMLChakraProps, ThemingProps, useMultiStyleConfig, omitThemingProps } from '@chakra-ui/vue-system'
import { FormControlOptions, formControlProps, useFormControl } from '@chakra-ui/c-form-control'
import { SAO } from '@chakra-ui/vue-utils'

interface InputOptions {
  /**
   * The border color when the input is focused. Use color keys in `theme.colors`
   * @example
   * focusBorderColor = "blue.500"
   */
  focusBorderColor?: string
  /**
   * The border color when the input is invalid. Use color keys in `theme.colors`
   * @example
   * errorBorderColor = "red.500"
   */
  errorBorderColor?: string
  /**
   * If `true`, the input element will span the full width of its parent
   *
   * @deprecated
   * This component defaults to 100% width,
   *  please use the props `maxWidth` or `width` to configure
   */
  isFullWidth?: boolean
}

type Omitted = "disabled" | "required" | "readOnly" | "size"

interface CInputNativeProps extends InputOptions, FormControlOptions {}

export interface CInputProps
  extends Omit<HTMLChakraProps<"span">, Omitted>,
  CInputNativeProps,
    ThemingProps<"Input"> {
      modelValue: string
    }

export const CInput = defineComponent((_props: CInputProps, { slots, emit, attrs }) => {
  const { as , ...props } = _props
  const styles = useMultiStyleConfig("Input", props)
  const ownProps = computed(() => toRefs(omitThemingProps(props)))
  const input = useFormControl(ownProps as ToRefs<CInputNativeProps>)

  const handleInput = (e: Event) => {
    emit('update:modelValue', (e?.currentTarget as HTMLInputElement)?.value)
    emit('input', e, (e?.currentTarget as HTMLInputElement)?.value)
    emit('change', e, (e?.currentTarget as HTMLInputElement)?.value)
  }

  return () => (
    <chakra.input
      {...input.value}
      value={props.modelValue}
      onInput={handleInput}
      __css={styles.value.field}
      __label="input"
      {...attrs}
    />
  )
})

// @ts-ignore 
CInput.name = "CInput",
CInput.props = {
  as: {
    type: [Object, String] as PropType<DOMElements>,
    default: 'input',
  },
  modelValue: [String] as PropType<string>,
  ...formControlProps,
  focusBorderColor: SAO as PropType<CInputProps['focusBorderColor']>,
  isFullWidth: [Boolean, Array] as PropType<CInputProps['isFullWidth']>,
  errorBorderColor: SAO as PropType<CInputProps['errorBorderColor']>,
}
CInput.emits = ['update:modelValue', 'input', 'change']