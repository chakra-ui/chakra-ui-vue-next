/**
 *
 * `@chakra-ui/c-focus-lock` component.
 *
 * Some known issues:
 *
 * At this point in time, there seems to be a weird bug
 * where focus is first sent to the body before it
 * is sent into the focus trap.
 *
 * I think this might be an issue later.
 *
 * I did some inspection around this issue for some time
 * and my suspicion is that it is happening inside the library
 */

import {
  defineComponent,
  PropType,
  computed,
  cloneVNode,
  VNode,
  ref,
  unref,
  h,
  watchEffect,
  onUnmounted,
} from "vue"
import {
  focus,
  FocusableElement,
  isFunction,
  warn,
  __DEV__,
} from "@chakra-ui/utils"
import { useFocusTrap, useReturnFocusSelector } from "./use-focus-trap"
import {
  MaybeElementRef,
  unrefElement,
  VueComponentInstance,
} from "@chakra-ui/vue-utils"
import { chakra } from '@chakra-ui/vue-system'

type RefProp =
  | (() => HTMLElement | string | object | undefined | unknown)
  | string

export interface FocusLockProps {
  /**
   * Element to which to send focus when focus trap has been deacivated
   */
  finalFocusRef?: RefProp
  /**
   * Element to which to send focus when focus trap has been activated
   */
  initialFocusRef?: RefProp
  /**
   * If `true`, the first focuable element within the `contentRef`
   * will be auto-focused once `CFocusLock` mounts
   */
  autoFocus?: boolean
}

export const CFocusLock = defineComponent({
  name: "CFocusLock",
  emits: ["activate", "deactivate"],
  props: {
    finalFocusRef: [String, Object, Function] as PropType<
      FocusLockProps["finalFocusRef"]
    >,
    initialFocusRef: [String, Object, Function] as PropType<
      FocusLockProps["initialFocusRef"]
    >,
    autoFocus: {
      type: Boolean as PropType<FocusLockProps["autoFocus"]>,
      default: true,
    },
    escapeDeactivates: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    clickOutsideDeactivates: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    allowOutsideClick: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    restoreFocus: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
  },
  setup(props, { attrs, slots, emit }) {
    const target = ref<HTMLElement | VueComponentInstance>()
    const initialFocusElement = computed<HTMLElement>(() => {
      let initialFocus
      if (props.initialFocusRef) {
        let resolvedInitialFocusRef: MaybeElementRef =
          typeof props.initialFocusRef === "function"
            ? props.initialFocusRef()
            : props.initialFocusRef

        resolvedInitialFocusRef = unref(resolvedInitialFocusRef)
        if (typeof resolvedInitialFocusRef === "string") {
          initialFocus = document.querySelector<FocusableElement & Element>(
            resolvedInitialFocusRef
          )
        } else {
          initialFocus = resolvedInitialFocusRef?.$el || resolvedInitialFocusRef
        }
      }
      return initialFocus
    })

    const enabled = ref(true)
    function activate() {
      enabled.value = true
    }
    function deactivate() {
      enabled.value = false
    }
    const hasFocus = computed(() => enabled.value === true)

    const containers = ref<Set<HTMLElement>>(new Set())
    watchEffect(
      (onInvalidate) => {
        let el: HTMLElement
        if (target.value) {
          el = unrefElement(target)
          containers.value.add(el)
        }

        onInvalidate(() => {
          containers.value.delete(el)
        })
      },
      { flush: "post" }
    )

    useReturnFocusSelector(enabled)

    useFocusTrap(
      containers,
      enabled,
      computed(() => ({
        initialFocus: initialFocusElement.value,
      }))
    )

    return () => {
      const [firstChild] = slots.default?.({}) as VNode[]

      if (!firstChild) {
        warn({
          condition: __DEV__,
          message: `[chakra-ui:focus-lock]: Focus lock component expects at least and only one child element.`,
        })
        return
      }

      return h(cloneVNode(firstChild, {
        ref: target,
        ...attrs,
        "data-chakra-focus-lock": "",
      }), {}, () => slots?.default?.({
        enabled,
        hasFocus,
        activate,
        deactivate
      }))
    }
  },
})
