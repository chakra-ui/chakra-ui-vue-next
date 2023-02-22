/**
 * This file is a mutated version of the @zag-js/core
 * `useMachine` and `useService` hooks.
 *
 * The goal of this mutation is to us to create the toast state
 * machine context in a global window context.
 */

import type { MachineSrc, StateMachine as S } from "@zag-js/core"
import { ComputedRef, Ref, shallowRef, watch, watchEffect } from "vue"

type MachineOptions<
  TContext extends Record<string, any>,
  TState extends S.StateSchema,
  TEvent extends S.EventObject = S.AnyEventObject
> = Omit<S.HookOptions<TContext, TState, TEvent>, "context"> & {
  context?: Ref<S.UserContext<TContext>> | ComputedRef<S.UserContext<TContext>>
}

export function useService<
  TContext extends Record<string, any>,
  TState extends S.StateSchema,
  TEvent extends S.EventObject = S.AnyEventObject
>(
  machine: MachineSrc<TContext, TState, TEvent>,
  options?: MachineOptions<TContext, TState, TEvent>
) {
  const { actions, state: hydratedState, context } = options ?? {}

  const _machine = typeof machine === "function" ? machine() : machine
  const service = context ? _machine.withContext(context.value) : _machine

  window.addEventListener("load", () => {
    service.start(hydratedState)

    if (service.state.can("SETUP")) {
      service.send("SETUP")
    }

    window.addEventListener("unload", () => {
      service.stop()
    })
  })

  watchEffect(() => {
    service.setOptions({ actions })
  })

  if (context) {
    watch(context, service.setContext, { deep: true })
  }

  return service
}

export function useMachine<
  TContext extends Record<string, any>,
  TState extends S.StateSchema,
  TEvent extends S.EventObject = S.AnyEventObject
>(
  machine: MachineSrc<TContext, TState, TEvent>,
  options?: Omit<S.HookOptions<TContext, TState, TEvent>, "context"> & {
    context?:
      | Ref<S.UserContext<TContext>>
      | ComputedRef<S.UserContext<TContext>>
  }
) {
  const service = useService(machine, options)
  const state = shallowRef(service.state)

  window.addEventListener("load", () => {
    const unsubscribe = service.subscribe((nextState) => {
      state.value = nextState
    })
    window.addEventListener("unload", () => {
      unsubscribe?.()
    })
  })

  return [state, service.send, service] as const
}
