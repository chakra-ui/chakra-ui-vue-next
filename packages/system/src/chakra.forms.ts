import {
  PropType,
  SetupContext,
  computed,
  getCurrentInstance,
  ComponentInternalInstance,
} from "vue"
import { UnionStringArray } from "@chakra-ui/utils"

const inputTypes = [
  "button",
  "checkbox",
  "color",
  "date",
  "datetime-local",
  "email",
  "file",
  "hidden",
  "image",
  "month",
  "number",
  "password",
  "radio",
  "range",
  "reset",
  "search",
  "submit",
  "tel",
  "text",
  "time",
  "url",
  "week",
] as const

export type InputTypes = UnionStringArray<typeof inputTypes>

export interface FormElementProps {
  emits: string[]
  props: Record<string, unknown>
  handleValueChange: (
    props: any,
    type?: InputTypes
  ) => (emit: SetupContext["emit"]) => Record<string, unknown>
}

export const formElements: Record<string, FormElementProps> = {
  input: {
    emits: ["input", "change", "onUpdate:modelValue"],
    props: {
      modelValue: [Boolean, String] as PropType<boolean | string>,
    },
    handleValueChange(props: any, type?: InputTypes) {
      return (emit: SetupContext["emit"]) => {
        return {
          ...(type === "checkbox" && {
            checked: props.modelValue,
            // value: props.modelValue,
          }),
          onChange: (event: Event) => {
            if (type === "checkbox") {
              emit(
                "change",
                !(event?.target as HTMLInputElement).checked,
                event
              )
              emit(
                "update:modelValue",
                !(event?.target as HTMLInputElement).checked,
                event
              )
              return
            }
          },
          onInput: (event: any) => {
            emit(
              "input",
              (event?.currentTarget as HTMLInputElement).value,
              event
            )
            emit(
              "update:modelValue",
              (event?.currentTarget as HTMLInputElement).value,
              event
            )
          },
        }
      }
    },
  },
  textarea: {
    emits: ["input", "change", "onUpdate:modelValue"],
    props: {
      modelValue: [Boolean, String] as PropType<boolean | string>,
    },
    handleValueChange(props: any, type?: InputTypes) {
      return (emit: SetupContext["emit"]) => {
        return {
          onInput: (event: any) => {
            emit(
              "input",
              (event?.currentTarget as HTMLInputElement).value,
              event
            )
            emit(
              "update:modelValue",
              (event?.currentTarget as HTMLInputElement).value,
              event
            )
          },
        }
      }
    },
  },
  select: {
    emits: ["input", "change", "onUpdate:modelValue"],
    props: {
      modelValue: [Boolean, String] as PropType<boolean | string>,
    },
    handleValueChange(props: any, type?: InputTypes) {
      return (emit: SetupContext["emit"]) => {
        return {
          onChange: (event: any) => {
            emit(
              "input",
              (event?.currentTarget as HTMLInputElement).value,
              event
            )
            emit(
              "update:modelValue",
              (event?.currentTarget as HTMLInputElement).value,
              event
            )
          },
        }
      }
    },
  },
}

export type ChakraFactoryElements = "input" | "select" | "textarea"

interface ChakraFactoryElementHandlers {
  onChange?: Function[]
  onInput?: Function[]
}

const events = new Map<
  ComponentInternalInstance["uid"],
  ChakraFactoryElementHandlers
>()

export function useFormElement(element: ChakraFactoryElements, props: any) {
  const instance = getCurrentInstance()
  const uid = computed(() => instance?.uid || Date.now())

  const elProps = computed(() => ({
    checked: props.modelValue,
    value: props.moddelValue,
  }))

  return {
    elProps,
  }
}
