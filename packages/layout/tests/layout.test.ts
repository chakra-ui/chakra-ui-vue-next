import { CLink, CBadge } from '../src'
import { render, testA11y, TestRenderProps } from '../../test-utils/src'

describe('<CLink />', () => {
  const renderComponent = () =>
    render({
      components: { CLink },
      template: `<c-link>CLink</c-link>
      <c-link is-external>CLink external</c-link>
      `,
    })

  it('should render properly', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })

  it('should have no a11y violations', async () => {
    await testA11y(renderComponent())
  })
})

describe('<CBadge />', () => {
  const renderComponent = () =>
    render({
      components: { CBadge },
      template: `<CBadge>this is a badge</CBadge>`,
    })

  test('should render properly', async () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })

  test('passes a11y test', async () => {
    await testA11y(renderComponent())
  })
})
