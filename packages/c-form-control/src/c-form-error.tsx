import {
  AnatomyParts,
  chakra,
  createStylesContext,
  HTMLChakraProps,
  useMultiStyleConfig,
} from "@chakra-ui/vue-system"
import { ThemingProps } from "@chakra-ui/styled-system"
import { defineComponent, h } from "vue"
import { vueThemingProps } from "@chakra-ui/vue-utils"
import { useFormControlContext } from "./use-form-control"
import { CIcon, _iconProps, IconProps } from "@chakra-ui/c-icon"

const [StylesProvider, useStyles] =
  createStylesContext<AnatomyParts.FormError>("CFormError")

export interface CFormErrorMessageProps
  extends HTMLChakraProps<"div">,
    ThemingProps<"FormErrorMessage"> {}

export const CFormErrorMessage = defineComponent({
  name: "CFormErrorMessage",
  props: {
    ...vueThemingProps,
  },
  setup(props, { slots, attrs }) {
    const styles = useMultiStyleConfig<AnatomyParts.FormError>(
      "FormError",
      props
    )
    const field = useFormControlContext()

    StylesProvider(styles)

    const handleBeforeVNodeMounted = () => {
      field.value.hasFeedbackText.value = true
    }

    return () => {
      if (!field?.value?.isInvalid?.value) return null

      return (
        <chakra.div
          __label="form__error-message"
          onVnodeBeforeMount={handleBeforeVNodeMounted}
          __css={{
            display: "flex",
            alignItems: "center",
            ...styles.value.text,
          }}
          {...attrs}
        >
          {slots}
        </chakra.div>
      )
    }
  },
})

/**
 * Used as the visual indicator that a field is invalid or
 * a field has incorrect values.
 */
export const CFormErrorIcon = defineComponent({
  name: "CFormErrorIcon",
  props: _iconProps,
  setup(props, { attrs }) {
    const styles = useStyles()
    const field = useFormControlContext()

    return () => {
      if (!field?.value?.isInvalid?.value) return null

      return (
        // @ts-ignore
        <CIcon
          aria-hidden
          __css={styles.value.icon}
          class="chakra-form__error-icon"
          {...props}
          {...attrs}
          name="__error_icon"
        />
      )
    }
  },
})
