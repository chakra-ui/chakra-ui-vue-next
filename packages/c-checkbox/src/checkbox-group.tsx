import { UseCheckboxGroupProps } from "./checkbox.types"
import { ThemingProps } from "@chakra-ui/styled-system"
import {
  defineComponent,
  h,
  ComputedRef,
  PropType,
  computed,
  renderSlot,
} from "vue"
import { createContext, vueThemingProps } from "@chakra-ui/vue-utils"
import { ComponentWithProps, DeepPartial } from "@chakra-ui/vue-system"
import { useCheckboxGroup } from "./use-checkbox-group"

export interface CCheckboxGroupProps
  extends UseCheckboxGroupProps,
    Omit<ThemingProps<"Checkbox">, "orientation"> {}

export type CheckboxGroupContext = ComputedRef<
  ThemingProps & {
    isDisabled?: boolean
    value: (string | number)[]
    handleChange(value: number | string, isChecked: boolean): void
  }
>

const [CheckboxGroupProvider, useCheckboxGroupContext] =
  createContext<CheckboxGroupContext>({
    strict: false,
    name: "CheckboxGroupContext",
  })

export const CCheckboxGroup = defineComponent({
  name: "CCheckboxGroup",
  props: {
    modelValue: {
      type: Object as PropType<(string | number)[]>,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: () => [],
    },
    isDisabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    ...vueThemingProps,
  },
  emits: ["change", "update:modelValue"],
  setup(props, { emit, slots }) {
    const checkBoxGroupValue = computed<(number | string)[]>({
      get() {
        return props.modelValue
      },
      set(value) {
        emit("update:modelValue", value)
      },
    })

    const { modelValue, handleChange } = useCheckboxGroup({
      modelValue: checkBoxGroupValue,
      isDisabled: computed(() => props.isDisabled),
    })

    const checkboxGroupContext = computed(() => ({
      size: props.size,
      variant: props.variant,
      isDisabled: props.isDisabled,
      colorScheme: props.colorScheme,
      value: modelValue.value,
      handleChange,
    }))

    CheckboxGroupProvider(checkboxGroupContext)
    return () => renderSlot(slots, "default")
  },
})

export { useCheckboxGroupContext }
