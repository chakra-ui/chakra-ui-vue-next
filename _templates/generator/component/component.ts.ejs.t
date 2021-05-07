---
to: packages/<%=h.changeCase.paramCase(name)%>/src/<%=h.changeCase.paramCase(name)%>.ts
---

import { h, defineComponent, PropType } from 'vue'
import { chakra, DOMElements } from '@chakra-ui/vue-system'

export const <%= h.changeCase.pascalCase(name) %> = defineComponent({
  props: {
    as: {
      type: [Object, String] as PropType<DOMElements>,
      default: 'div',
    },
  },
  setup(props, { slots, attrs }) {
    return () => h(chakra(props.as), { ...attrs }, slots)
  },
})
