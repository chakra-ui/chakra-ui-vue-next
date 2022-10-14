import {
  h,
  defineComponent,
  Fragment,
  PropType,
  provide,
  inject,
  computed,
} from "vue"
import { Theme } from "@chakra-ui/vue-theme"
import { ComponentWithProps } from "@chakra-ui/vue-system"

export interface CThemeProviderProps {
  value?: Theme
}

const CThemeProvider: ComponentWithProps<CThemeProviderProps> = defineComponent(
  {
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
        <Fragment>{slots.default?.({ $chakraTheme: props.value })}</Fragment>
      )
    },
  }
)

export default CThemeProvider
