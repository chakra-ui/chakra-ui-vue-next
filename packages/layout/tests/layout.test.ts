import { CLink, CBadge } from '../src'
import { render, testA11y } from '../../test-utils/src'

const renderComponent = (props?: any) =>
  render({
    components: { CLink },
    template: `<c-link>CLink</c-link>
    <c-link is-external>CLink external</c-link>
    `,
    ...props,
  })

it('should render properly', () => {
  const { asFragment } = renderComponent()
  expect(asFragment()).toMatchSnapshot()
})

it('should have no a11y violations', async () => {
  await testA11y(renderComponent())
})

describe('<CBadge />', () => {
  const renderBadgeComponent = () =>
    render({
      components: { CBadge },
      template: `<CBadge>this is a badge</CBadge>`,
    })

  test('should render properly', async () => {
    const { asFragment } = renderBadgeComponent()
    expect(asFragment()).toMatchSnapshot()
  })

  test('passes a11y test', async () => {
    await testA11y(renderBadgeComponent())
  })
})
