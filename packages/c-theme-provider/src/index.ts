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
    return () => h(Fragment, slots.default?.({ $chakraTheme: props.value }))
  },
})

export default CThemeProvider
