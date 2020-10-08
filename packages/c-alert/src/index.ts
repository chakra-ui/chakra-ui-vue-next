import { h, defineComponent, Component } from 'vue'

const CAlert = defineComponent({
  props: {
    as: {
      type: [String, Object],
      default: 'div',
    },
  },
  render() {
    return h(
      this.as,
      {
        ...this.$attrs,
        role: 'alert',
      },
      this.$slots.default && this.$slots.default()
    )
  },
})

export default CAlert
