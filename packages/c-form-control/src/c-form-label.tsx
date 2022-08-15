import { defineComponent, computed, h } from "vue"
import {
  chakra,
  ComponentWithProps,
  HTMLChakraProps,
  ThemingProps,
  useStyleConfig,
  useStyles,
} from "@chakra-ui/vue-system"
import { vueThemingProps } from "@chakra-ui/vue-utils"
import { useFormControlContext } from "./use-form-control"

export interface FormLabelProps
  extends HTMLChakraProps<"label">,
    ThemingProps<"FormLabel"> {}

export const CFormLabel = defineComponent({
  name: "CFormLabel",
  props: vueThemingProps,
  setup(props, { attrs, slots }) {
    const styles = useStyleConfig("FormLabel", props)
    const field = useFormControlContext()
    const requiredIndicator = computed(() => {
      if (slots.indicator) {
        return slots.indicator?.()
      } else {
        return h(CRequiredIndicator)
      }
    })

    return () => (
      <chakra.label
        __label="form__label"
        __css={{
          display: "block",
          textAlign: "start",
          ...styles.value,
        }}
        {...field?.value?.labelProps.value}
        {...attrs}
      >
        {slots?.default?.()}
        {field?.value?.isRequired?.value ? requiredIndicator.value : null}
      </chakra.label>
    )
  },
})

export interface CRequiredIndicatorProps extends HTMLChakraProps<"span"> {}

/**
 * Used to show a "required" text or an asterisks (*) to indicate that
 * a field is required.
 */
export const CRequiredIndicator: ComponentWithProps<CRequiredIndicatorProps> =
  defineComponent({
    name: "CRequiredIndicator",
    setup(_, { attrs }) {
      const field = useFormControlContext()
      const styles = useStyles()

      if (!field?.value?.isRequired?.value) return null

      return () => (
        <chakra.span
          {...field?.value?.requiredIndicatorProps.value}
          __css={styles.value.requiredIndicator}
          __label="form__required-indicator"
          {...attrs}
        >
          *
        </chakra.span>
      )
    },
  })
