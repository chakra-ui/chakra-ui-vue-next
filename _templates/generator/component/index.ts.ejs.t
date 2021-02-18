---
to: packages/<%=h.changeCase.paramCase(name)%>/src/index.ts
---

export { default as <%= h.changeCase.pascalCase(name) %> } from '@chakra-ui/<%=h.changeCase.paramCase(name)%>'
