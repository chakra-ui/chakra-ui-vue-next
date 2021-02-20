import { h, defineComponent, PropType, Teleport, onBeforeMount, ref } from 'vue'
import { DOMElements } from '@chakra-ui/vue-system'
import { createPortalTarget, ensureTarget } from './portal.utils'

const CPortal = defineComponent({
  props: {
    as: {
      type: [Object, String] as PropType<DOMElements>,
      default: 'div',
    },
    to: String as PropType<string>,
    disabled: Boolean as PropType<boolean>,
  },
  setup(props, { slots, attrs }) {
    const target = ref<string | null>(null)

    onBeforeMount(() => {
      if (props.to) {
        ensureTarget(props.to)
        target.value = props.to
      } else {
        target.value = `#${createPortalTarget().id}`
      }
    })

    // @ts-ignore
    return () => h(Teleport, { to: target.value, ...props, ...attrs }, slots)
  },
})

export default CPortal
