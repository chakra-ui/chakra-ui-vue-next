import {
  h,
  defineComponent,
  PropType,
  Teleport,
  TeleportProps,
  onBeforeMount,
  ref,
  onUnmounted,
} from "vue"
import { createPortalTarget, ensureTarget, unmountTarget } from "./portal.utils"
import { useStackProvider } from "@chakra-ui/vue-composables"
import { getValidChildren } from "@chakra-ui/vue-utils"

export interface CPortalProps extends Omit<TeleportProps, "to"> {
  /**
   * The target element to which to mount the portal
   */
  to?: string
  /**
   * Determines whether the `CPortal` component is enabled or disabled
   */
  disabled?: boolean
  /**
   * Name of the portal we use to label component with
   */
  label?: string
}

/**
 * Chakra component to teleport it's children to pre-ordained target.
 *
 * If no target is given to the `CPortal` component via the `to` prop,
 * it will generate a target and append to the document body
 */
const CPortal = defineComponent({
  name: "CPortal",
  props: {
    to: String as PropType<CPortalProps["to"]>,
    disabled: Boolean as PropType<CPortalProps["disabled"]>,
    label: String as PropType<CPortalProps["label"]>,
  },
  setup(props, { slots, attrs }) {
    const target = ref<string | null>(null)

    onBeforeMount(() => {
      if (props.to) {
        ensureTarget(props.to)
        target.value = props.to
      } else {
        target.value = `#${createPortalTarget(props.label).id}`
      }
    })

    onUnmounted(() => {
      if (!props.to) {
        unmountTarget(target.value!)
      }
    })

    useStackProvider()

    return () => {
      return (
        <Teleport {...props} {...attrs} to={target.value}>
          {slots}
        </Teleport>
      )
    }
  },
})

export default CPortal
