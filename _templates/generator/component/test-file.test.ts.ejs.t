---
to: packages/<%=h.changeCase.paramCase(name)%>/tests/<%=h.changeCase.paramCase(name)%>.test.ts
---
import { render } from '../../test-utils/src'
import { <%= h.changeCase.pascalCase(name) %> } from '../src'

it('should render properly', () => {
  const { asFragment } = render(<%= h.changeCase.pascalCase(name) %>)
  expect(asFragment()).toMatchSnapshot()
})