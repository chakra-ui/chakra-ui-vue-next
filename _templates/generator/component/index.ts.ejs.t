---
to: packages/<%=h.changeCase.paramCase(name)%>/src/index.ts
---

export { default as <%= h.changeCase.pascalCase(name) %> } from './<%=h.changeCase.paramCase(name)%>'
