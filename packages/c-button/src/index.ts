import { h, defineComponent, PropType } from 'vue'

const CButton = defineComponent({
  name: 'CButton',
  props: {
    as: {
      type: String as PropType<string>,
      default: 'button',
    },
  },
  render() {
    return h(
      this?.as,
      { ...this.$props, ...this.$attrs },
      this.$slots.default && this.$slots.default()
    )
  },
})

export default CButton
