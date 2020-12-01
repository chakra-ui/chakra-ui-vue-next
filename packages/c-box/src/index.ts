import { h, defineComponent, PropType, onMounted } from 'vue'
import theme from '@chakra-ui/vue-theme'

const CBox = defineComponent({
  props: {
    as: {
      type: String as PropType<string>,
      default: 'div',
    },
  },
  setup() {
    onMounted(() => {
      console.log(theme.components)
    })
  },
  render() {
    return h(this?.as, { ...this.$props, ...this.$attrs }, this.$slots)
  },
})

export default CBox
