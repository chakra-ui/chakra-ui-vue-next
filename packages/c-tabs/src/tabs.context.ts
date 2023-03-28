import type { connect } from "@zag-js/tabs"
import type { ComputedRef, Ref } from "vue"
import { customRef, triggerRef } from "vue"
import { createContext } from "@chakra-ui/vue-utils"
import type { UseTabsReturn } from "./use-tabs"
import {
  Descendant,
  DescendantAuthority,
  createDescendantRegister,
} from "@chakra-ui/vue-composables"

export interface CTabRegistryContext {
  tabs: ComputedRef<Ref<Ref<HTMLElement | null>[]>>
  panels: ComputedRef<Ref<Ref<HTMLElement | null>[]>>
  registerTab(tab: Ref<HTMLElement | null>): void
  unregisterTab(tab: Ref<HTMLElement | null>): void
  registerPanel(panel: Ref<HTMLElement | null>): void
  unregisterPanel(panel: Ref<HTMLElement | null>): void
}

export interface CTabsAuthorityContext {
  registerTabsDescendant: (id: string) => Descendant
  useTabsAuthority: () => DescendantAuthority
}
export type CTabsContext = UseTabsReturn
export const [CTabsProvider, useTabsContext] = createContext<
  ComputedRef<ReturnType<typeof connect>>
>({
  name: "CTabsContext",
  strict: true,
})
