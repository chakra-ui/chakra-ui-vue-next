import { defineComponent, h, TransitionGroup } from "vue"
import { animate, spring } from "motion"

export const CPresenceGroup = defineComponent({
  name: "CPresenceGroup",
  setup(_, { slots }) {
    function enter(element: Element, done: VoidFunction) {
      const el = element as HTMLElement
      const height = el.clientHeight

      animate(
        element,
        {
          height: ["0px", `${height}px`],
          opacity: [0, 1],
          scale: [0.95, 1],
        },
        {
          easing: spring({
            mass: 1,
            stiffness: 100,
            damping: 50,
            velocity: 0,
          }),
        }
      ).finished.then(done)

      requestAnimationFrame(() => {})
    }

    async function exit(element: Element, done: VoidFunction) {
      const easing = spring({
        mass: 1,
        stiffness: 100,
        damping: 50,
        velocity: 0,
      })

      animate(
        element,
        {
          height: `0px`,
          opacity: [1, 0],
          scale: [1, 0.85],
        },
        {
          easing,
        }
      ).finished.then(done)
      requestAnimationFrame(() => {})
    }

    return () => (
      <TransitionGroup tag="div" onEnter={enter} onLeave={exit} css={false}>
        {slots.default?.()}
      </TransitionGroup>
    )
  },
})
