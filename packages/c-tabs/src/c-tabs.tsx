/**
 * Hey! Welcome to @chakra-ui/vue-next CTabs
 *
 * An accessible tabs component that provides keyboard interactions and aria attributes described in the wai aria tabs design pattern tabs consist of a tab list with one or more visually separated tabs each tab has associated content and only the selected tab s content is shown
 *
 * @see Docs     https://next.vue.chakra-ui.com/c-tabs
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/main/packages/c-tabs/src/c-tabs/c-tabs.ts
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 */

import {
  defineComponent,
  h,
  Fragment,
  type PropType,
  computed,
  type Component,
  type DefineComponent,
  watchEffect,
  onMounted,
  ref,
  Ref,
} from "vue"
import { chakra, DOMElements, HTMLChakraProps } from "@chakra-ui/vue-system"
import { tabsProps } from "./tabs.props"
import { TabsContext, UseTabsProps, useTabs } from "./use-tabs"
import {
  CTabsProvider,
  // registerTabsAuthority,
  // registerTabsDescendant,
  // useTabsAuthority,
  // tabsAuthority,
} from "./tabs.context"
import { createDescendantRegister } from "@chakra-ui/vue-composables"
import { sortByDomNode, unrefElement } from "@chakra-ui/vue-utils"

export interface CTabsProps
  extends HTMLChakraProps<"div">,
    Omit<TabsContext, "id" | "value"> {}

export const CTabs = defineComponent({
  name: "CTabs",
  props: {
    as: {
      type: [Object, String] as PropType<
        DOMElements | Component | DefineComponent
      >,
      default: "div",
    },
    ...tabsProps,
  },
  emits: ["change", "focus", "delete"],
  setup(props, { slots, attrs, emit }) {
    const tabs = ref<Ref<HTMLElement | null>[]>([])
    const panels = ref<Ref<HTMLElement | null>[]>([])

    const tabsProps = computed<UseTabsProps>(() => ({
      context: props,
      defaultValue: props.defaultValue,
      emit,
    }))

    const selectedIndex = ref<number>(0)
    const tabsApi = useTabs(tabsProps.value)

    watchEffect(() => {
      console.log("c-tabs", {
        tabs: tabs.value,
        panels: panels.value,
      })
    })

    onMounted(() => {
      if (!api.value.value) {
      }
    })

    const api = computed(() => ({
      ...tabsApi.value,
      tabs: computed(() => tabs),
      panels: computed(() => panels),
      registerTab(tab: (typeof tabs)["value"][number]) {
        if (tabs.value.includes(tab)) return
        let activeTab = tabs.value[selectedIndex.value!]

        tabs.value.push(tab)
        tabs.value = sortByDomNode(tabs.value, unrefElement)

        let localSelectedIndex =
          tabs.value.indexOf(activeTab) ?? selectedIndex.value
        if (localSelectedIndex !== -1) {
          selectedIndex.value = localSelectedIndex
        }
      },
      unregisterTab(tab: (typeof tabs)["value"][number]) {
        let idx = tabs.value.indexOf(tab)
        if (idx !== -1) tabs.value.splice(idx, 1)
      },
      registerPanel(panel: (typeof panels)["value"][number]) {
        if (panels.value.includes(panel)) return
        panels.value.push(panel)
        panels.value = sortByDomNode(panels.value, unrefElement)
      },
      unregisterPanel(panel: (typeof panels)["value"][number]) {
        let idx = panels.value.indexOf(panel)
        if (idx !== -1) panels.value.splice(idx, 1)
      },
    }))

    CTabsProvider(api)
    return () => (
      <chakra.div as={props.as} {...tabsApi.value.rootProps} {...attrs}>
        {slots.default?.()}
      </chakra.div>
    )
  },
})
