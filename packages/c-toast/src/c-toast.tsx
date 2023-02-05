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
  reactive,
  watch,
} from "vue"
import { normalizeProps, useMachine, useActor } from "@zag-js/vue"
import { chakra, DOMElements } from "@chakra-ui/vue-system"
import { getToastsByPlacement, ToastPlacement, __toast__ } from "./toast.utils"
import type * as Toast from "@zag-js/core"
import { CPresenceGroup } from "./c-presence-group"
import {
  CAlert,
  CAlertDescription,
  CAlertTitle,
  CAlertIcon,
} from "@chakra-ui/c-alert"
import { CCloseButton } from "@chakra-ui/c-close-button"

import { Presence } from "motion/vue"
import { Motion } from "./c-motion"

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
      __toast__.connect(state.value, send, normalizeProps)
    )

    return () => {
      const api = apiRef.value
      const { style: rootPropsStyles, ...restRootProps } = api.rootProps
      return (
        <Motion
          style={{
            ...(rootPropsStyles as any),
          }}
          initial={initial(state.value.context.placement)}
          animate={{
            opacity: 1,
            height: "auto",
            y: 0,
            x: 0,
            scale: 1,
            transition: {
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
            },
          }}
          exit={{
            height: 0,
            opacity: [1, 0],
            scale: [1, 0.9],
            // y: initial(state.value.context.placement).height,
            transition: {
              duration: 0.3,
              ease: [0.4, 0, 1, 1],
            },
          }}
          data-toastId={state.value.context.id}
        >
          <CAlert
            {...restRootProps}
            status={api.type as Exclude<typeof api.type, "custom">}
          >
            <CAlertIcon />
            <CAlertTitle {...api.titleProps}>{api.title}</CAlertTitle>
            <CAlertDescription {...api.descriptionProps}>
              {api.description}
            </CAlertDescription>
            <CCloseButton onClick={api.dismiss} />
          </CAlert>
        </Motion>
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
    height: 0,
    [dir]: factor * 24,
  }
}

interface IToastStore {
  toastGroup?: IToastContext
}
// @ts-ignore Type inferrence
export const toastStore = reactive<IToastStore>({
  toastGroup: undefined,
})

export const toastContext = computed(() => toastStore.toastGroup)

export const CToastContainer = defineComponent({
  name: "CToastContainer",
  setup(_, { slots }) {
    const t = useToast()

    // Create Toast Group Machine
    const [state, send] = useMachine(
      // @ts-ignore
      __toast__.group.machine({ id: "chakra.toast.group" }),
      {
        context: ref({
          pauseOnInteraction: true,
        }),
      }
    )

    const toast = computed(() =>
      // @ts-ignore
      __toast__.group.connect(state.value, send, normalizeProps)
    )

    const allToasts = computed(() => toast.value.toasts)
    const toastsByPlacements = computed(() =>
      getToastsByPlacement(allToasts.value)
    )

    watch(
      () => toast.value,
      (value) => {
        // Update the store context object
        // every time it changes
        toastStore.toastGroup = value
      },
      { immediate: true }
    )

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
                <CPresenceGroup>
                  {toasts.map((toast, i) => {
                    return <CToast actor={toast} key={i} />
                  })}
                </CPresenceGroup>
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

export interface IToastContext
  extends ReturnType<typeof __toast__.group.connect> {}

export function useToast() {
  // TODO: Consider providing noop for SSR
  return inject<ComputedRef<IToastContext>>(
    ToastContextSymbol,
    {} as ComputedRef<IToastContext>
  )
}
