import type { connect } from "@zag-js/tabs"
import type { ComputedRef, Ref } from "vue"
import { createContext } from "@chakra-ui/vue-utils"
import type { UseTabsReturn } from "./use-tabs"
import { createStylesContext } from "@chakra-ui/vue-system"
import type * as SS from "@chakra-ui/styled-system"

export type CTabsContext = UseTabsReturn
export const [CTabsProvider, useTabsContext] = createContext<
  ComputedRef<ReturnType<typeof connect>>
>({
  name: "CTabsContext",
  strict: true,
})

export const [CTabsStylesProvider, useTabsStyles] = createStylesContext("Tabs")
