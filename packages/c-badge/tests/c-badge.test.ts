import { CBadge } from '../src'
import { render, testA11y } from '../../test-utils/src'

const renderComponent = (props?: any) => {
  const base = {
    components: {
      CBadge,
    },
    template: '<c-badge>New !</c-badge>',
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
