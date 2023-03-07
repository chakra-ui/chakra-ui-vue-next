import type { connect } from "@zag-js/tooltip"
import type { ComputedRef } from "vue"
import { createContext } from "@chakra-ui/vue-utils"
import type { UseTooltipReturn } from "./use-tooltip"

export const [TooltipProvider, useTooltipContext] = createContext<
  ComputedRef<ReturnType<typeof connect>>
>({
  name: "CTooltipContext",
  strict: true,
})

export type TooltipContext = UseTooltipReturn
