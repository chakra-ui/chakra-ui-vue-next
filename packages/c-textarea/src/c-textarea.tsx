/**
 * Hey! Welcome to @chakra-ui/vue-next CTextarea
 *
 * C textarea
 *
 * @see Docs     https://next.vue.chakra-ui.com/c-textarea
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/master/packages/c-textarea/src/c-textarea/c-textarea.ts
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 */

import {
  h,
  defineComponent,
  PropType,
  computed,
  reactive,
  toRefs,
  ToRefs,
} from "vue"
import {
  chakra,
  HTMLChakraProps,
  omitThemingProps,
  ThemingProps,
  useStyleConfig,
} from "@chakra-ui/vue-system"
import { omit } from "@chakra-ui/utils"
import { vueThemingProps } from "@chakra-ui/vue-utils"
import {
  FormControlOptions,
  formControlProps,
  useFormControl,
} from "@chakra-ui/c-form-control"

interface TextareaOptions {
  /**
   * The border color when the textarea is focused. Use color keys in `theme.colors`
   * @example
   * focusBorderColor = "blue.500"
   */
  focusBorderColor?: string
  /**
   * The border color when the textarea is invalid. Use color keys in `theme.colors`
   * @example
   * errorBorderColor = "red.500"
   */
  errorBorderColor?: string
}

type Omitted = "disabled" | "required" | "readOnly"

export interface CTextareaNativeProps
  extends TextareaOptions,
    FormControlOptions {}

export interface TextareaProps
  extends Omit<HTMLChakraProps<"textarea">, Omitted>,
    CTextareaNativeProps,
    ThemingProps<"Textarea"> {}

export const CTextarea = defineComponent({
  name: "CTextarea",
  props: {
    modelValue: String as PropType<string>,
    ...formControlProps,
    rows: Number as PropType<HTMLTextAreaElement["rows"]>,
    ...vueThemingProps,
  },
  emits: ["update:modelValue", "input", "change"],
  setup(props, { emit, attrs }) {
    const styles = useStyleConfig("Textarea", props)

    const ownProps = computed(() =>
      toRefs(reactive(omitThemingProps(props as ThemingProps<"Textarea">)))
    )

    const textarea = useFormControl(
      ownProps.value as ToRefs<CTextareaNativeProps>
    )

    const textareaStyles = computed(() =>
      props.rows
        ? omit(styles.value, ["h", "minH", "height", "minHeight"])
        : styles.value
    )

    const handleInput = (e: Event) => {
      emit("update:modelValue", (e?.currentTarget as HTMLInputElement)?.value)
      emit("input", e, (e?.currentTarget as HTMLInputElement)?.value)
      emit("change", e, (e?.currentTarget as HTMLInputElement)?.value)
    }

    return () => (
      <chakra.textarea
        __chakraIsRaw
        {...textarea.value}
        value={props.modelValue}
        onInput={handleInput}
        __css={textareaStyles.value}
        __label="textarea"
        {...attrs}
      />
    )
  },
})
