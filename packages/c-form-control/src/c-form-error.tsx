import { chakra, ComponentWithProps, DeepPartial, HTMLChakraProps, StylesProvider, ThemingProps, useMultiStyleConfig, useStyles } from '@chakra-ui/vue-system';
import { defineComponent } from 'vue';
import { vueThemingProps } from '@chakra-ui/vue-utils';
import { useFormControlContext } from './c-form-control';
import { CIcon, iconProps, IconProps } from '@chakra-ui/c-icon'

export interface CFormErrorMessageProps
  extends HTMLChakraProps<"div">,
    ThemingProps<"FormErrorMessage"> {}

export const CFormErrorMessage: ComponentWithProps<DeepPartial<CFormErrorMessageProps>> = defineComponent({
  name: 'CFormErrorMessage',
  props: {
    ...vueThemingProps,
  },
  setup(props, { slots, attrs }) {
    const styles = useMultiStyleConfig('FormError', props)
    const field = useFormControlContext()
    StylesProvider(styles)

    const handleBeforeVNodeMounted = () => {
      field.value.hasFeedbackText.value = true
    }

    return () => (
      <chakra.div
        __label="form__error-message"
        onVnodeBeforeMount={handleBeforeVNodeMounted}
        __css={{
          display: 'flex',
          alignItems: 'center',
          ...styles.value.text
        }}
        {...attrs}
      >
        {slots}
      </chakra.div>
    )
  }
})

/**
 * Used as the visual indicator that a field is invalid or
 * a field has incorrect values.
 */
export const CFormErrorIcon: ComponentWithProps<DeepPartial<IconProps>> = defineComponent({
  name: 'CFormErrorIcon',
  props: iconProps,
  setup(props, { attrs }) {
    const styles = useStyles()
    const field = useFormControlContext()
    if (!field?.value?.isInvalid?.value) return null

    return () => (
      // @ts-ignore
      <CIcon aria-hidden __css={styles.value.icon} class="chakra-form__error-icon" {...props} { ...attrs} name="__error_icon" />
    )
  }
})