import { MotionDirective, useMotions } from "@vueuse/motion"
import {
  defineComponent,
  h,
  computed,
  onBeforeUnmount,
  PropType,
  withDirectives,
  watch,
} from "vue"
import { chakra } from "@chakra-ui/vue-system"
import { CAnimatePresence, TransitionDefaults } from "@chakra-ui/c-motion"
import { CMotion } from "@chakra-ui/c-motion"
import { genId } from "@chakra-ui/vue-utils"

export const CheckIcon = defineComponent({
  name: "CheckboxCheckIcon",
  setup(_, { attrs, slots }) {
    const transitionId = `check-icon-${genId()}`
    /** Handles exit transition */
    const leave = (done: VoidFunction) => {
      const motions = useMotions()
      const instance = motions[transitionId]
      instance?.leave(() => {
        done()
      })
    }
    onBeforeUnmount(() => {
      leave(() => null)
    })
    return () => (
      <chakra.svg
        width="1.2em"
        viewBox="0 0 12 10"
        style={{
          fill: "none",
          strokeWidth: 2,
          stroke: "currentColor",
          strokeDasharray: 16,
        }}
        {...attrs}
      >
        {() => <polyline points="1.5 6 4.5 9 10.5 1" />}
      </chakra.svg>
    )
  },
})

export const IndeterminateIcon = defineComponent({
  name: "CheckboxIndeterminateIcon",
  setup(_, { attrs, slots }) {
    const transitionId = `indeterminate-icon-${genId()}`
    /** Handles exit transition */
    const leave = (done: VoidFunction) => {
      const motions = useMotions()
      const instance = motions[transitionId]
      instance?.leave(() => {
        done()
      })
    }
    onBeforeUnmount(() => {
      leave(() => null)
    })
    return () => (
      <chakra.svg
        width="1.2em"
        viewBox="0 0 24 24"
        style={{ stroke: "currentColor", strokeWidth: 4 }}
        {...attrs}
      >
        {() => <line x1="21" x2="3" y1="12" y2="12" />}
      </chakra.svg>
    )
  },
})

export const CCheckboxTransition = defineComponent({
  name: "CCheckboxTransition",
  props: {
    open: Boolean as PropType<boolean>,
  },
  setup(props, { attrs, slots }) {
    return () => (
      <CMotion
        type={"scale"}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        {props.open ? () => <chakra.div>{slots}</chakra.div> : null}
      </CMotion>
    )
  },
})

export interface CheckboxIconProps {
  isIndeterminate?: boolean
  isChecked?: boolean
}

export const CheckboxIcon = defineComponent(
  (props: CheckboxIconProps, { slots, attrs }) => {
    const IconEl = computed(() =>
      props.isIndeterminate ? IndeterminateIcon : CheckIcon
    )

    return () => <IconEl.value {...attrs} />
  }
)

CheckboxIcon.name = "CheckboxIcon"
CheckboxIcon.props = {
  isIndeterminate: Boolean as PropType<boolean>,
  isChecked: Boolean as PropType<boolean>,
}
