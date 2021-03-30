import { CCloseButton } from '../src'
import { render, userEvent, testA11y } from '../../test-utils/src'
import { nextTick } from '@vue/runtime-core'

const renderComponent = (props?: any) => {
  const base = {
    components: {
      CCloseButton,
    },
    template: '<CCloseButton data-testid="closebutton" />',
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

it('should be in the DOM', () => {
  const { getByTestId } = renderComponent()
  expect(getByTestId('closebutton')).toBeInTheDocument()
})

it('should have correct aria-label attribute', () => {
  const { getByTestId } = renderComponent()
  expect(getByTestId('closebutton')).toHaveAttribute('aria-label', 'Close')
})

it('should emit click event on click', async () => {
  const handleClick = jest.fn()
  const { getByTestId } = renderComponent({
    template: '<c-icon-button data-testid="close" @click="handleClick" />',
    setup() {
      return {
        handleClick,
      }
    },
  })

  await userEvent.click(getByTestId('close'))
  await nextTick()
  expect(handleClick).toHaveBeenCalled()
})
