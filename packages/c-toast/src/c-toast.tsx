/**
 * Hey! Welcome to @chakra-ui/vue-next CToast
 *
 * The toast component is used to give feedback to users after an action has taken place
 *
 * @see Docs     https://next.vue.chakra-ui.com/c-toast
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/main/packages/c-toast/src/c-toast/c-toast.ts
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 */

import {
  defineComponent,
  h,
  ref,
  Fragment,
  computed,
  onMounted,
  PropType,
  watchEffect,
} from "vue"
import * as toast from "@zag-js/toast"
import { normalizeProps, useActor } from "@zag-js/vue"
import { chakra, DOMElements } from "@chakra-ui/vue-system"
import { useMachine } from "./toast-state-machine"
import { Motion } from "./c-motion"
import { CPresenceGroup } from "./c-presence-group"

export const placements = [
  "top-start",
  "top",
  "top-end",
  "bottom-start",
  "bottom",
  "bottom-end",
] as const

export type Placement = (typeof placements)[number]

export function getToastsByPlacement(toasts: toast.Service[]) {
  const result: Partial<Record<Placement, toast.Service[]>> = {
    "top-start": [],
    top: [],
    "top-end": [],
    "bottom-start": [],
    bottom: [],
    "bottom-end": [],
  }

  for (const toast of toasts) {
    const placement = toast.state.context.placement!
    result[placement] ||= []
    result[placement]!.push(toast)
  }

  return result
}

export interface CToastProps {}

export const CToast = defineComponent({
  props: {
    as: {
      type: [Object, String] as PropType<DOMElements>,
      default: "div",
    },
    actor: {
      type: Object as PropType<any>,
    },
  },
  setup(props, { slots, attrs }) {
    const [state, send] = useActor(props.actor)
    const apiRef = computed(() =>
      // @ts-ignore
      toast.connect(state.value, send, normalizeProps)
    )

    return () => {
      const api = apiRef.value
      return (
        <div
          style={{
            backgroundColor: "var(--chakra-colors-blue-100)",
            borderRadius: "10px",
            padding: "16px 20px",
          }}
          {...api.rootProps}
        >
          <h3 {...api.titleProps}>{api.title}</h3>
          <p {...api.descriptionProps}>{api.description}</p>
          <button onClick={api.dismiss}>Close</button>
        </div>
      )
    }
  },
})

const [state, send] = useMachine(
  // @ts-ignore
  toast.group.machine({ id: "chakra.toast.group" }),
  {
    context: ref({
      pauseOnInteraction: true,
    }),
  }
)

export const $toast = computed(() =>
  toast.group.connect(state.value, send, normalizeProps)
)

export const CToastContainer = defineComponent({
  name: "CToastContainer",
  setup(_, { slots }) {
    const allToasts = computed(() => $toast.value.toasts)
    const toastsByPlacements = computed(() =>
      getToastsByPlacement(allToasts.value)
    )

    watchEffect(() =>
      console.log("toastsByPlacements", toastsByPlacements.value)
    )

    return () => {
      const api = $toast.value

      return (
        <>
          {Object.entries(toastsByPlacements.value).map(
            ([placement, toasts]) => (
              <div
                key={placement}
                {...api.getGroupProps({ placement: placement as Placement })}
              >
                <CPresenceGroup>
                  {toasts.map((toast, i) => {
                    console.log("toast-objct", toast)
                    return (
                      <Motion
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          y: 0,
                        }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        key={i}
                        data-toastId={toast.id}
                      >
                        <CToast actor={toast} />
                      </Motion>
                    )
                  })}
                </CPresenceGroup>
              </div>
            )
          )}
        </>
      )
    }
  },
})
