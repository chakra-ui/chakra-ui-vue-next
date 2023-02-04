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
  PropType,
  inject,
  watchEffect,
  ComputedRef,
} from "vue"
import * as toast from "@zag-js/toast"
import { normalizeProps, useActor } from "@zag-js/vue"
import { chakra, DOMElements } from "@chakra-ui/vue-system"
import { useMachine } from "./toast-state-machine"
// import { Motion } from "./c-motion"
import { CPresenceGroup } from "./c-presence-group"

import { Presence, Motion } from "motion/vue"

export const placements = [
  "top-start",
  "top",
  "top-end",
  "bottom-start",
  "bottom",
  "bottom-end",
] as const

export type ToastPlacement = (typeof placements)[number]

export function getToastsByPlacement(toasts: toast.Service[]) {
  const result: Partial<Record<ToastPlacement, toast.Service[]>> = {
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

      console.log('"api.rootProps', api)
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

function initial(placement: ToastPlacement) {
  const position = placement
  const dir = ["top", "bottom"].includes(position) ? "y" : "x"

  let factor = ["top-right", "bottom-right"].includes(position) ? 1 : -1
  if (position === "bottom") factor = 1

  console.log(`initial >> ${position}`, {
    opacity: 0,
    [dir]: factor * 24,
  })
  return {
    opacity: 0,
    [dir]: factor * 24,
  }
}

export const CToastContainer = defineComponent({
  name: "CToastContainer",
  setup(_, { slots }) {
    const t = useToast()
    const allToasts = computed(() => t.value.toasts)
    const toast = computed(() => t.value)
    const toastsByPlacements = computed(() =>
      getToastsByPlacement(allToasts.value)
    )

    watchEffect(() => console.debug("toast - container -toast", toast.value))

    return () => {
      const api = toast.value

      return (
        <>
          {Object.entries(toastsByPlacements.value).map(
            ([placement, toasts]) => (
              <chakra.div
                key={placement}
                {...api.getGroupProps({
                  placement: placement as ToastPlacement,
                })}
                pointerEvents="none"
              >
                {/* <CPresenceGroup> */}
                {toasts.map((toast, i) => {
                  return (
                    <Presence key={i}>
                      <Motion
                        initial={initial(toast.state.context.placement)}
                        animate={{
                          opacity: 1,
                          y: 0,
                          x: 0,
                          scale: 1,
                          transition: {
                            duration: 0.4,
                            ease: [0.4, 0, 0.2, 1],
                          },
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.85,
                          transition: {
                            duration: 0.2,
                            ease: [0.4, 0, 1, 1],
                          },
                        }}
                        data-toastId={toast.id}
                      >
                        <CToast actor={toast} />
                      </Motion>
                    </Presence>
                  )
                })}
                {/* </CPresenceGroup> */}
              </chakra.div>
            )
          )}
        </>
      )
    }
  },
})

export const ToastContainerId = "chakra-ui-toast-container"
export const ToastContextSymbol = Symbol("ToastContextSymbol")

export interface IToastContext extends ReturnType<typeof toast.group.connect> {}

export function useToast() {
  // TODO: Consider providing noop for SSR
  return inject<ComputedRef<IToastContext>>(
    ToastContextSymbol,
    {} as ComputedRef<IToastContext>
  )
}
