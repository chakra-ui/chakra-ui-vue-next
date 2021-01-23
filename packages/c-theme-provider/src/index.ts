import {
  h,
  defineComponent,
  Fragment,
  PropType,
  provide,
  inject,
  computed,
} from 'vue'
import { ThemeProviderProps } from '@chakra-ui/vue-next'

const CThemeProvider = defineComponent({
  name: 'CThemeProvider',
  props: {
    value: {
      type: [Object] as PropType<ThemeProviderProps>,
      default: () => undefined,
    },
  },
  setup(props, { slots }) {
    const pluginTheme = inject('$chakraTheme')
    const applicationTheme = computed(() => props.value || pluginTheme)
    provide('$chakraTheme', applicationTheme.value)
    return () => h(Fragment, slots.default?.({ $chakraTheme: props.value }))
  },
})

export default CThemeProvider
