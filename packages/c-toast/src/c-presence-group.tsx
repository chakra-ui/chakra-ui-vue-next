import {
  defineComponent,
  h,
  onBeforeUpdate,
  provide,
  Transition,
  TransitionGroup,
} from "vue"
import { mountedStates } from "@motionone/dom"
import { contextId, presenceId } from "./c-motion.context"

export interface PresenceState {
  initial?: boolean | undefined
}

let _id = 1
const createPresenceGroupContextId = () => Symbol(`presence-group-${_id}`)

const doneCallbacks = new WeakMap<Element, VoidFunction>()

function removeDoneCallback(element: Element) {
  const prevDoneCallback = doneCallbacks.get(element)
  prevDoneCallback &&
    element.removeEventListener("motioncomplete", prevDoneCallback)
  doneCallbacks.delete(element)
}

export const CPresenceGroup = defineComponent({
  name: "CPresenceGroup",
  props: {
    name: { type: String },
    initial: {
      type: Boolean,
      default: true,
    },
    exitBeforeEnter: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots, attrs }) {
    const state: PresenceState = { initial: props.initial }
    const presenseGroupContextId = createPresenceGroupContextId()

    provide(presenceId, state)

    function enter(element: Element) {
      const state = mountedStates.get(element)
      console.log("enter state", element, state)

      if (!state) return

      removeDoneCallback(element)
      state.setActive("exit", false)
    }

    function exit(element: Element, done: VoidFunction) {
      const state = mountedStates.get(element)
      console.log("exit state", element, state)

      if (!state) return done()

      state.setActive("exit", true)

      removeDoneCallback(element)
      doneCallbacks.set(element, done)
      element.addEventListener("motioncomplete", done)
    }

    onBeforeUpdate(() => {
      state.initial = undefined
    })

    return () => (
      <TransitionGroup onEnter={enter} onLeave={exit} css={false}>
        {slots.default?.()}
      </TransitionGroup>
    )
  },
})
