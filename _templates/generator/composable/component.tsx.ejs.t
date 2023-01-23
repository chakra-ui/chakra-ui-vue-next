---
to: packages/<%=h.changeCase.paramCase(name)%>/src/<%=h.changeCase.paramCase(name)%>.tsx
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

import { defineComponent, h, PropType } from "vue"
import {
  chakra,
  ComponentWithProps,
  DeepPartial,
  DOMElements,
} from "@chakra-ui/vue-system"

export interface <%= h.changeCase.pascalCase(name) %>Props {}

export const <%= h.changeCase.pascalCase(name) %>: ComponentWithProps<DeepPartial<<%= h.changeCase.pascalCase(name) %>Props>> =
  defineComponent({
    props: {
      as: {
        type: [Object, String] as PropType<DOMElements>,
        default: "div",
      },
    },
    setup(props, { slots, attrs }) {
      return () => (
        <chakra.div as={props.as} {...attrs}>
          {slots}
        </chakra.div>
      )
    },
  })
