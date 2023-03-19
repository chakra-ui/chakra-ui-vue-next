---
to: packages/<%=h.changeCase.paramCase(name)%>/tests/<%=h.changeCase.paramCase(name)%>.test.ts
---
import { <%= h.changeCase.pascalCase(name) %> } from '../'


it('should be truthy', () => {
  expect(1).toBe(1)
})