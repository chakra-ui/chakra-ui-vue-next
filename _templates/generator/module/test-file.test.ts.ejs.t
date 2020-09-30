---
to: packages/<%=h.changeCase.paramCase(name)%>/tests/<%=h.changeCase.paramCase(name)%>.test.ts
---
import { render } from '@chakra-ui/vue-test-utils'
import <%= h.changeCase.pascalCase(name) %> from '../'


it('should render properly', () => {
  const { html } = render(<%= h.changeCase.pascalCase(name) %>)
  expect(html()).toMatchSnapshot()
})