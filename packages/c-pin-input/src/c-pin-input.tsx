/**
 * Hey! Welcome to @chakra-ui/vue-next CPinInput
 *
 * The pin input component is similar to the input component but is optimized for entering sequences of digits quickly
 *
 * @see Docs     https://next.vue.chakra-ui.com/c-pin-input
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/master/packages/c-pin-input/src/c-pin-input/c-pin-input.tsx
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 */

import { h, defineComponent, computed, PropType, ComputedRef } from "vue"
import {
  chakra,
  createStylesContext,
  useStyleConfig,
} from "@chakra-ui/vue-system"
import {
  createContext,
  getValidChildren,
  vueThemingProps,
} from "@chakra-ui/vue-utils"
import { CInput } from "@chakra-ui/c-input"
import { connect } from "@zag-js/pin-input"
import { PinInputProps, usePinInputMachine } from "./use-pin-input"

const [StylesProvider, useStyles] = createStylesContext("CPinInput")
const [PinInputProvider, usePinInput] =
  createContext<ComputedRef<ReturnType<typeof connect>>>()

export { PinInputProvider, usePinInput }

export const CPinInputProps = {
  value: {
    type: Object as PropType<Array<string>>,
    default: [],
  },
  modelValue: {
    type: Object as PropType<Array<string>>,
    default: false,
  },
  id: {
    type: String,
    default: "0",
  },
  placeholder: {
    type: String,
    default: "o",
  },
  type: {
    type: String as PropType<"alphanumeric" | "numeric">,
    default: "numeric",
  },
  otp: {
    type: Boolean,
    default: false,
  },
  mask: {
    type: Boolean,
    default: false,
  },
  blurOnComplete: {
    type: Boolean,
    default: false,
  },
  dir: {
    type: String as PropType<"rtl" | "ltr">,
    default: "ltr",
  },
  spacing: {
    type: [String, Number],
    default: "0.75",
  },
  ...vueThemingProps,
}

export const CPinInput = defineComponent({
  name: "CPinInput",
  props: CPinInputProps,
  emits: ["change", "invalid", "complete", "update:modelValue"],
  setup(props, { slots, attrs, emit }) {
    const styles = useStyleConfig("PinInput", props)

    const inputStyles = computed(() => ({
      ...styles.value,
      mx: props.spacing,
    }))
    StylesProvider(inputStyles)

    const api = usePinInputMachine(props as unknown as PinInputProps, emit)

    PinInputProvider(api)

    return () => (
      <chakra.div __label="pin-input" {...api.value.rootProps} {...attrs}>
        {() =>
          getValidChildren(slots).map((child, index) =>
            (child.type as any).name === "CPinInputField"
              ? h(child, { index })
              : child
          )
        }
      </chakra.div>
    )
  },
})

export const CPinInputField = defineComponent({
  name: "CPinInputField",
  props: {
    index: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { attrs }) {
    const styles = useStyles()
    const api = usePinInput()

    return () => (
      <CInput
        __label="pin-input-field"
        __css={styles.value}
        {...api.value.getInputProps({ index: props.index })}
        {...attrs}
      />
    )
  },
})

export const CPinInputClearButton = defineComponent({
  name: "CPinInputClearButton",
  setup(_, { slots, attrs }) {
    const api = usePinInput()
    return () => (
      <chakra.button
        __label="pin-input-clear-button"
        onClick={() => api.value.clearValue()}
        {...attrs}
      >
        {() => getValidChildren(slots)}
      </chakra.button>
    )
  },
})
