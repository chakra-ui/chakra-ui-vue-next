import { render, testA11y } from '../../test-utils/src'
import { CInput } from '../src'

const renderComponent = () =>
    render({
      components: { CInput },
      template: `<CInput />`,
    })

describe('<CInput />', () => {
  it('should render properly', () => {
    const { asFragment } = render(CInput)
    expect(asFragment()).toMatchSnapshot()
  })

  it('a11y test', async () => {
    await testA11y(renderComponent(), {
      axeOptions: {
        rules: {
          label: { enabled: false },
        }
      }
    })
  })
})