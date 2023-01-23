---
to: packages/<%=h.changeCase.paramCase(name)%>/tsconfig.json
---

{
  "extends": "../../tsconfig.json",
  "include": ["src", "./index.tsx", "./index.ts"]
}