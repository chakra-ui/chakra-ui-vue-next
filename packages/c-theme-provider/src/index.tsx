import {
  h,
  defineComponent,
  Fragment,
  PropType,
  provide,
  inject,
  computed,
} from "vue"
import type { Theme } from "@chakra-ui/theme"
import type * as ThemeTools from "@chakra-ui/theme-tools"

export interface CThemeProviderProps {
  value?: Theme
}

const CThemeProvider = defineComponent({
  name: "CThemeProvider",
  props: {
    value: {
      type: [Object] as PropType<Theme>,
      default: () => undefined,
    },
  },
  setup(props, { slots }) {
    const pluginTheme = inject("$chakraTheme")
    const applicationTheme = computed(() => props.value || pluginTheme)
    provide("$chakraTheme", applicationTheme.value)
    return () => (
      <Fragment>{slots?.default?.({ $chakraTheme: props.value })}</Fragment>
    )
  },
})

export default CThemeProvider
