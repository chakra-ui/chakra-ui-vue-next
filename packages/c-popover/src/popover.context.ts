import type { connect } from "@zag-js/popover"
import type { ComputedRef } from "vue"
import { createContext } from "@chakra-ui/vue-utils"
import type { UsePopoverReturn } from "./use-popover"

export const [PopoverProvider, usePopoverContext] = createContext<
  ComputedRef<ReturnType<typeof connect>>
>({
  name: "CPopoverContext",
  strict: true,
  errorMessage:
    "usePopoverContext: `context` is undefined. Seems you forgot to wrap Popover child components inside the `<CPopover />` component",
})

export type CPopoverContext = UsePopoverReturn
