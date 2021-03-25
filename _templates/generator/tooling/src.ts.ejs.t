---
to: tooling/<%=h.changeCase.paramCase(name)%>/src/index.ts
---
const <%= h.changeCase.pascalCase(name) %> = () => {
  return {}
}

export {
  <%= h.changeCase.pascalCase(name) %>
}
