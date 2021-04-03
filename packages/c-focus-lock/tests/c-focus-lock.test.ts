import { render, screen, userEvent } from '../../test-utils/src'
import { CFocusLock } from '../src'

const renderComponent = (props?: any) => {
  const base = {
    components: {
      CFocusLock,
    },
    template: `
      <c-focus-lock>
        <input data-testid="input" />
        <input />
        <input />
      </c-focus-lock>
    `,
    ...props,
  }
  return render(base)
}

it('should focus first focusable child when mounted', () => {
  renderComponent()

  const input = screen.getByTestId('input')
  expect(input).toHaveFocus()
})

it('should focus first focusable child when after tab cycle is complete', async () => {
  renderComponent()

  await userEvent.tab()
  await userEvent.tab()
  await userEvent.tab()

  const input = screen.getByTestId('input')
  expect(input).toHaveFocus()
})

it('should render properly', () => {
  const { asFragment } = renderComponent()
  expect(asFragment()).toMatchSnapshot()
})
