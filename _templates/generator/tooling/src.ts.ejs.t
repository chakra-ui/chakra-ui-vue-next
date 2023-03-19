---
to: tooling/<%=h.changeCase.paramCase(name)%>/src/index.tsx
---
const <%= h.changeCase.pascalCase(name) %> = () => {
  return {}
}

export {
  <%= h.changeCase.pascalCase(name) %>
}
