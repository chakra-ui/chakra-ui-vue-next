import { render } from '../../test-utils/src'
import { CButtonGroup, CButton } from '../src'

const renderComponent = (props?: any) => {
  const base = {
    components: {
      CButtonGroup,
      CButton,
    },
    template: `
    <c-button-group variant="outline">
      <c-button color-scheme="blue">Save</c-button>
      <c-button>Cancel</c-button>
    </c-button-group>
    `,
    ...props,
  }
  return render(base)
}

it('should render properly', () => {
  const { asFragment } = renderComponent()
  expect(asFragment()).toMatchSnapshot()
})
