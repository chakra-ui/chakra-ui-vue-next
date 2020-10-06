import { h, defineComponent, PropType } from 'vue'

const CBox = defineComponent({
  props: {
    as: {
      type: String as PropType<string>,
      default: 'div',
    },
  },
  render() {
    return h(this?.as, { ...this.$props, ...this.$attrs }, this.$slots)
  },
})

export default CBox
