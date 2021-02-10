import { CButton } from '../src'
import { render, userEvent } from '../../test-utils/src'

const renderComponent = (props?: any) => {
  const base = {
    components: {
      CButton,
    },
    template: '<CButton>Happy button</CButton>',
    ...props,
  }
  return render(base)
}

it('should render properly', () => {
  const { asFragment } = renderComponent()
  expect(asFragment()).toMatchSnapshot()
})

it('should be in the DOM', () => {
  const { baseElement } = renderComponent()
  expect(baseElement).toBeInTheDocument()
})

it('should emit click event on click', async () => {
  const handleClick = jest.fn()
  const { getByTestId } = renderComponent({
    template:
      '<c-button data-testid="button" @click="handleClick">Happy button</c-button>',
    setup() {
      return {
        handleClick,
      }
    },
  })

  await userEvent.click(getByTestId('button'))
  expect(handleClick).toHaveBeenCalled()
})
