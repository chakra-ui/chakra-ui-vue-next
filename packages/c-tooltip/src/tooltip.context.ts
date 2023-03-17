import type { connect } from "@zag-js/tooltip"
import type { ComputedRef } from "vue"
import { AnyFn, createContext } from "@chakra-ui/vue-utils"
import type { UseTooltipReturn } from "./use-tooltip"

export interface CTooltipContext extends ReturnType<typeof connect> {
  transitionId: string
}

export const [TooltipProvider, useTooltipContext] = createContext<
  ComputedRef<CTooltipContext>
>({
  name: "CTooltipContext",
  strict: true,
})

export type TooltipContext = UseTooltipReturn
