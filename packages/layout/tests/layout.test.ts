import { CAspectRatio, CLink, CBadge, CStack, CVStack, CHStack } from '../src'
import { render, testA11y, TestRenderProps } from '../../test-utils/src'

describe('<CLink />', () => {
  const renderComponent = () =>
    render({
      components: { CLink },
      template: `<CLink>CLink</CLink>
      <CLink is-external>CLink external</CLink>
      `,
    })

  it('should render properly', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })

  it('a11y test', async () => {
    await testA11y(renderComponent())
  })
})

describe('<CBadge />', () => {
  const renderComponent = () =>
    render({
      components: { CBadge },
      template: `<CBadge>this is a badge</CBadge>`,
    })

  it('should render properly', async () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })

  it('a11y test', async () => {
    await testA11y(renderComponent())
  })
})

describe('<CStack />', () => {
  const renderComponent = () =>
    render({
      components: { CHStack, CVStack, CStack },
      template: `
      <CStack><div>1</div><div>2</div></CStack>
      <CHStack><div>1</div><div>2</div></CHStack>
      <CVStack><div>1</div><div>2</div></CVStack>
      `,
    })

  it('should render properly', async () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })

  it('a11y test', async () => {
    await testA11y(renderComponent())
  })
})

describe('<CAspectRatio />', () => {
  const renderComponent = () =>
    render({
      components: { CAspectRatio },
      template: `
      <c-aspect-ratio maxW="360px" :ratio="16 / 9" mb="4">
        <img src="https://bit.ly/naruto-sage" alt="img" />
      </c-aspect-ratio>
      `,
    })

  it('should render properly', async () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })

  it('a11y test', async () => {
    await testA11y(renderComponent())
  })
})
