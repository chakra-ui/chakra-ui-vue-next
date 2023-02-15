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
  Ref,
  computed,
  PropType,
  inject,
  watchEffect,
  ComputedRef,
  reactive,
} from "vue"
import { normalizeProps, useMachine, useActor, useService } from "@zag-js/vue"
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
    const [state, send] = useActor(computed(() => props.actor).value)
    const apiRef = computed(() =>
      // @ts-ignore
      __toast__.connect(state.value, send, normalizeProps)
    )

    const toast = useToast()

    watchEffect(() => {
      console.log("toast state", state.value)
    })

    return () => {
      const { style: rootPropsStyles, ...restRootProps } =
        apiRef.value.rootProps
      return (
        <div>
          <CAlert
            {...restRootProps}
            status={
              apiRef.value.type as Exclude<typeof apiRef.value.type, "custom">
            }
            style={{
              ...(rootPropsStyles as any),
            }}
          >
            <CAlertIcon />
            <CAlertTitle {...apiRef.value.titleProps}>
              {apiRef.value.title}
            </CAlertTitle>
            <CAlertDescription {...apiRef.value.descriptionProps}>
              {apiRef.value.description}
            </CAlertDescription>
            <CCloseButton onClick={() => apiRef.value.dismiss()} />
          </CAlert>
        </div>
      )
    }
  },
})

interface IToastStore {
  toastApi?: IToastContext
}

export const toastStore: Ref<IToastStore> = ref({
  toastApi: undefined,
})

// @ts-ignore typing gcoming soon
export const globalToastMachine: Toast.Machine<
  __toast__.GroupMachineContext,
  Toast.StateMachine.StateSchema,
  Toast.StateMachine.AnyEventObject
> = __toast__.group.machine({
  id: "chakra.toast.group",
  pauseOnInteraction: true,
})
globalToastMachine.start()

export const toastContext = computed(() => toastStore.value.toastApi)

export const CToastContainer = defineComponent({
  name: "CToastContainer",
  setup() {
    const t = useToast()

    // Create Toast Group Machine
    const [state, send] = useActor(
      // @ts-ignore
      globalToastMachine
    )

    const toast = computed(() =>
      // @ts-ignore
      __toast__.group.connect(state.value, send, normalizeProps)
    )

    const allToasts = computed(() => toast.value.toasts)
    const toastsByPlacements = computed(() =>
      getToastsByPlacement(allToasts.value)
    )

    watchEffect(() => {
      toastStore.value.toastApi = toast.value
    })

    return () => {
      const api = toast.value

      return (
        <chakra.span>
          {Object.entries(toastsByPlacements.value).map(
            ([placement, toasts]) => (
              <CPresenceGroup
                key={placement}
                {...api.getGroupProps({
                  placement: placement as ToastPlacement,
                })}
              >
                {toasts.map((toast, i) => {
                  return <CToast actor={toast} key={placement} />
                })}
              </CPresenceGroup>
            )
          )}
        </chakra.span>
      )
    }
  },
})

export const ToastContainerId = "chakra-ui-toast-container"
export const ToastContextSymbol = Symbol("ToastContextSymbol")

export interface IToastContext
  extends ReturnType<typeof __toast__.group.connect> {}

export function useToast() {
  return inject<ComputedRef<IToastContext>>(
    ToastContextSymbol,
    {} as ComputedRef<IToastContext>
  )
}

export function createStandAloneToast() {
  return globalToastMachine!
}
