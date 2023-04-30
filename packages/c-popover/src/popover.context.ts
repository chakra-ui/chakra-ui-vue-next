import type { connect } from "@zag-js/popover"
import type { ComputedRef } from "vue"
import { AnyFn, createContext } from "@chakra-ui/vue-utils"
import { AnatomyParts, createStylesContext } from "@chakra-ui/vue-system"
import type * as S from "@chakra-ui/styled-system"
import type { UsePopoverReturn } from "./use-popover"

export const [PopoverProvider, usePopoverContext] = createContext<
  ComputedRef<
    ReturnType<typeof connect> & {
      leaveTransition: AnyFn
      enterTransition: AnyFn
      wait: AnyFn
      transitionId: string
      trigger: "click" | "hover"
    }
  >
>({
  name: "CPopoverContext",
  strict: true,
  errorMessage:
    "usePopoverContext: `context` is undefined. Seems you forgot to wrap Popover child components inside the `<CPopover />` component",
})

export type CPopoverContext = UsePopoverReturn

export const [PopoverStylesProvider, useStyles] =
  createStylesContext<AnatomyParts.Popover>("Popover")
