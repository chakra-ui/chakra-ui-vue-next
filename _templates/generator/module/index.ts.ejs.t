---
to: packages/<%=h.changeCase.paramCase(name)%>/src/<%=h.changeCase.paramCase(name)%>.ts
---

import { h, defineComponent } from 'vue'

const <%= h.changeCase.pascalCase(name) %> = defineComponent({
  props: {
    as: {
      type: Object as PropType<string>,
      default: 'div',
    },
  },
  setup(props, { slots, attrs }) {
    return h(props?.as, { ...attrs }, slots.default?.())
  },
})

export default <%= h.changeCase.pascalCase(name) %>
