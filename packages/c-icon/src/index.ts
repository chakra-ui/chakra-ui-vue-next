import { h, defineComponent, PropType } from 'vue'

export const CIcon = defineComponent({
  props: {
    as: {
      type: Object as PropType<string>,
      default: 'div',
    },
  },
  setup(props, { slots, attrs }) {
    return h(props?.as, { ...attrs }, slots.default?.())
  },
})
