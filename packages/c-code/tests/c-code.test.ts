import { CCode } from '../src'
import { render, testA11y } from '../../test-utils/src'

const renderComponent = (props?: any) => {
  const base = {
    components: {
      CCode,
    },
    template: '<c-code>hello world</c-code>',
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
