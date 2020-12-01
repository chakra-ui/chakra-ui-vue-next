import { h, defineComponent, PropType } from 'vue'

const CAccordion = defineComponent({
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

export default CAccordion
