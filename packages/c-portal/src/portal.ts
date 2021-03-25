import { h, defineComponent, PropType, Teleport, onBeforeMount, ref } from 'vue'
import { createPortalTarget, ensureTarget } from './portal.utils'

const CPortal = defineComponent({
  props: {
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

    return () =>
      h(
        // @ts-ignore
        Teleport,
        {
          to: target.value,
          ...props,
          ...attrs,
        },
        slots
      )
  },
})

export default CPortal
