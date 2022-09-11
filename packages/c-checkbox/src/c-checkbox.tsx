/**
 * Hey! Welcome to @chakra-ui/vue-next CCheckbox
 *
 * C checkbox component is used in forms when a user needs to select multiple values from several options
 *
 * @see Docs     https://next.vue.chakra-ui.com/c-checkbox
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/master/packages/c-checkbox/src/c-checkbox/c-checkbox.ts
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 */

import { chakra, DOMElements } from "@chakra-ui/vue-system"
import * as checkbox from "@zag-js/checkbox"
import { normalizeProps, useMachine } from "@zag-js/vue"
import { defineComponent, h, PropType, Fragment, computed } from "vue"
import { genId } from "@chakra-ui/vue-utils"

export const CCheckbox = defineComponent({
  props: {
    as: {
      type: [Object, String] as PropType<DOMElements>,
      default: "div",
    },
  },
  setup(props, { slots, attrs }) {
    const id = genId()
    const [state, send] = useMachine(checkbox.machine({ id }))

    const apiRef = computed(() =>
      checkbox.connect(state.value, send, normalizeProps)
    )
    return () => {
      const api = apiRef.value
      return (
        <chakra.label {...attrs} {...api.rootProps}>
          <chakra.span {...api.labelProps}>
            Input is {api.isChecked ? "checked" : "unchecked"}
          </chakra.span>
          <chakra.input {...api.inputProps} />
          <chakra.div {...api.controlProps} />
        </chakra.label>
      )
    }
  },
})
