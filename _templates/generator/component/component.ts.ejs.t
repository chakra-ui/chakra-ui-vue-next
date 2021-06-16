---
to: packages/<%=h.changeCase.paramCase(name)%>/src/<%=h.changeCase.paramCase(name)%>.ts
---
/**
 * Hey! Welcome to @chakra-ui/vue-next <%= h.changeCase.pascalCase(name) %>
 *
 * <%=h.changeCase.sentence(description)%>
 *
 * @see Docs     https://next.vue.chakra-ui.com/<%=h.changeCase.paramCase(name)%>
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/master/packages/<%=h.changeCase.paramCase(name)%>/src/<%=h.changeCase.paramCase(name)%>/<%=h.changeCase.paramCase(name)%>.ts
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 */

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
