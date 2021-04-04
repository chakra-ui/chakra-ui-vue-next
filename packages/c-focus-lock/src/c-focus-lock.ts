import { h, defineComponent, PropType, ref, onMounted, nextTick } from 'vue'
import { chakra } from '@chakra-ui/vue-system'
import { getAllFocusable, focus } from '@chakra-ui/utils'
import { FocusLockOptions, useFocusLock } from './use-focus-lock'

type RefProp = () => HTMLElement & string

export interface FocusLockProps {
  /**
   * `ref` of the element to receive focus initially
   */
  initialFocusRef: RefProp
  /**
   * `ref` of the element to return focus to when `CFocusLock`
   * unmounts or is deactivated
   */
  finalFocusRef: RefProp
  /**
   * The `ref` of the wrapper for which the focus-lock wraps
   */
  contentRef: RefProp
  /**
   * If `true`, focus will be restored to the element that
   * triggered the `CFocusLock` once it unmounts
   */
  restoreFocus: boolean
  /**
   * Disables focus trapping when set to `true`.
   */
  isDisabled: boolean
  /**
   * If `true`, the first focuable element within the `contentRef`
   * will be auto-focused once `CFocusLock` mounts
   */
  autoFocus: boolean
}

export const CFocusLock = defineComponent({
  props: {
    initialFocusRef: [String, Function] as PropType<
      FocusLockProps['initialFocusRef']
    >,
    finalFocusRef: [String, Function] as PropType<
      FocusLockProps['finalFocusRef']
    >,
    contentRef: [String, Function] as PropType<FocusLockProps['contentRef']>,
    restoreFocus: {
      type: Boolean as PropType<FocusLockProps['restoreFocus']>,
      default: true,
    },
    isDisabled: Boolean as PropType<FocusLockProps['isDisabled']>,
    autoFocus: Boolean as PropType<FocusLockProps['autoFocus']>,
  },
  setup(props, { slots }) {
    const initialFocusEl = ref<HTMLElement | null>(null)
    const finalFocusEl = ref<HTMLElement | null>(null)
    const contentEl = ref<HTMLElement | null>(null)

    const getElementFromRefProp = (prop?: RefProp) => {
      let el: HTMLElement | null = null
      // Get final focus element
      if (typeof prop === 'function') {
        el = prop?.()
        // @ts-ignore
        el = el?.$el || el
      } else if (typeof prop === 'string') {
        el = document.querySelector(prop)
      }

      return el
    }

    onMounted(async () => {
      await nextTick()
      initialFocusEl.value = getElementFromRefProp(props.initialFocusRef)
      finalFocusEl.value = getElementFromRefProp(props.finalFocusRef)
      contentEl.value = getElementFromRefProp(props.contentRef)
      debugger
    })

    const handleDeactivation = () => {
      finalFocusEl.value?.focus()
    }

    const handleActivation = () => {
      debugger
      if (initialFocusEl.value) {
        initialFocusEl.value?.focus()
      } else if (contentEl.value) {
        const focusables = getAllFocusable(contentEl.value)
        if (!focusables.length) {
          focus(contentEl.value, { nextTick: true })
        }
      }
    }

    return () =>
      h(
        chakra('div'),
        {
          label: 'focus-lock',
        },
        slots
      )
  },
})
