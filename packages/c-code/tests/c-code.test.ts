import { CCode } from '../src'
import { render, testA11y } from '../../test-utils/src'

const renderComponent = (props?: any) => {
  const base = {
    components: {
      CCode,
    },
    template: `
      <c-code>hello world</c-code>
      <c-code color-scheme="red"> hello world, red </c-code>
      <c-code color-scheme="green"> hello world, green </c-code>
      <c-code color-scheme="yellow"> hello world, yellow </c-code>
      <c-code color-scheme="teal"> hello world, teal </c-code>
    `,
    ...props,
  }
  return render(base)
}

it('should have no a11y violations', async () => {
  await testA11y(renderComponent())
})

it('should render properly', () => {
  const { asFragment } = renderComponent()
  expect(asFragment()).toMatchSnapshot()
})
