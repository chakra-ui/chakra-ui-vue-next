import { CFlex } from '../src'
import { render, testA11y } from '../../test-utils/src'

const renderComponent = (props?: any) =>
  render({
    components: { CFlex },
    template: '<c-flex>Flex box !</c-flex>',
    ...props,
  })

it('should render properly', () => {
  const { asFragment } = renderComponent()
  expect(asFragment()).toMatchSnapshot()
})

it('should have no a11y violations', async () => {
  await testA11y(renderComponent())
})
