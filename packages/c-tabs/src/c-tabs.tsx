/**
 * Hey! Welcome to @chakra-ui/vue-next CTabs
 *
 * An accessible tabs component that provides keyboard interactions and aria attributes described in the wai aria tabs design pattern tabs consist of a tab list with one or more visually separated tabs each tab has associated content and only the selected tab s content is shown
 *
 * @see Docs     https://next.vue.chakra-ui.com/c-tabs
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/main/packages/c-tabs/src/c-tabs/c-tabs.ts
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 */
// =============================================================================
/**
 *
 * MAINTAINERS' NOTE:
 *
 * Hi there! Friendly contributors!
 *
 * With V2 of Chakra UI Vue, we decided to go with more explicit
 * approach to render the tabs component. In v0, we dynamically
 * computed the tabs and panels indices and would use that to
 * create a tab index that can be used to track the currently
 * active tab.
 *
 * What advantages did this bring?
 * 1) Less code is written by the end user. They don't have to
 *    worry about the index of the tab.
 * 2) Just mount the tabs, and we show the first tab.
 *
 * What about the cons of implicit tabs?
 * 1) It's not SSR friendly. We can't render the tabs on the server
 *    since the tabs have not been mounted in the DOM. Even if we
 *    were to render on the server, we would have to re-render the
 *    tabs and re-compute the tab indices on the client-side. This
 *    results in double work. Because the rendering is implicit, we also
 *    do not know whether a given tab will possess a given index both
 *    the server-side and the client.
 *
 *    Consequently, we decided to go with an explicit approach to
 *    rendering the tabs to preserve SSR friendliness,
 *    and ease of maintenance.
 *
 * 2) Limited degrees of control of the visible tab in the parent scope.
 *    The highest degree of control the consumer has without computing
 *    tab indices is to use the `index` prop to control the visible tab.
 *    But this STILL will require the user to manually do some computation.
 *
 * About Explicit Tabs
 * -------------------
 * Explicit tabs declarations in v2 are different from implicit declarations
 * in that the user has to declare the tabs and panel values explicitly.
 * The result is a more verbose syntax, but in the end, it presents a more robust
 * and flexible API.
 *
 * These are the current advantages:
 * 1) SSR friendly. With this approach, we can render a tab using SSR.
 * 2) We can use the `modelValue` prop to implement two-way binding.
 * 3) The consumer can dynamically update the value of the tab without
 *    having to worry about the index, and is this, a more explicit pattern.
 * 4) Exposes control of the visible tab to the parent component. (e.g. use router
 *    params to control the visible tab with out computing tab indices.)
 *
 * Disadvantages:
 * 1) Verbose API.
 *
 * Well, there you have it.
 */

import {
  defineComponent,
  h,
  Fragment,
  type PropType,
  computed,
  type Component,
  type DefineComponent,
  ref,
  Ref,
  mergeProps,
} from "vue"
import {
  chakra,
  DOMElements,
  HTMLChakraProps,
  useMultiStyleConfig,
} from "@chakra-ui/vue-system"
import { tabsProps } from "./tabs.props"
import { TabsContext, UseTabsProps, useTabs } from "./use-tabs"
import { CTabsProvider, CTabsStylesProvider } from "./tabs.context"
import { vueThemingProps } from "@chakra-ui/vue-utils"
import { filterUndefined } from "@chakra-ui/utils"

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
    ...vueThemingProps,
  },
  emits: ["change", "focus", "delete", "update:modelValue"],
  setup(props, { slots, attrs, emit }) {
    const tabsProps = computed<UseTabsProps>(() => ({
      context: props,
      defaultValue: props.modelValue,
      emit,
    }))
    const api = useTabs(tabsProps.value)
    CTabsProvider(api)

    const themingProps = computed(() =>
      filterUndefined({
        colorScheme: props.colorScheme,
        variant: props.variant,
        size: props.size,
        styleConfig: props.styleConfig,
      })
    )

    // Styles
    const styles = useMultiStyleConfig("Tabs", themingProps)
    CTabsStylesProvider(styles)

    return () => (
      <chakra.div
        __label="tabs"
        as={props.as}
        {...api.value.rootProps}
        __css={styles.value.root}
        {...attrs}
      >
        {slots.default?.()}
      </chakra.div>
    )
  },
})
