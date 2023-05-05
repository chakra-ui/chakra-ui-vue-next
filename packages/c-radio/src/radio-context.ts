import * as CSS from "csstype"
import * as radio from "@zag-js/radio-group"
import { createContext } from "@chakra-ui/vue-utils"
import type { UseRadioGroupReturn } from "./use-radio-group"
import { UnwrapRef } from "vue"
import { createStylesContext } from "@chakra-ui/vue-system"
import * as VS from "@chakra-ui/vue-system"

export type RadioContext = Parameters<
  ReturnType<typeof radio.connect>["getRadioProps"]
>[0]

export const [RadioProvider, useRadioContext] = createContext<RadioContext>({
  name: "CRadioContext",
  strict: true,
})

export type RadioGroupContext = UnwrapRef<UseRadioGroupReturn>

export const [RadioGroupProvider, useRadioGroupContext] =
  createContext<UseRadioGroupReturn>({
    name: "CRadioGroupContext",
    strict: true,
  })

export const [RadioGroupStylesProvider, useRadioGroupStyles] =
  createStylesContext("CRadioGroup")
