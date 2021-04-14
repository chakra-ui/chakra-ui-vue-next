import { CCloseButton } from '../src'
import {
  render,
  userEvent,
  testA11y,
  TestRenderProps,
} from '../../test-utils/src'
import { nextTick } from '@vue/runtime-core'

const renderComponent = ({
  inlineAttrs = '',
  ...props
}: TestRenderProps = {}) => {
  const base = {
    components: {
      CCloseButton,
    },
    template: `<CCloseButton data-testid="closebutton" ${inlineAttrs} />`,
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
    setup: () => ({ handleClick }),
    inlineAttrs: '@click="handleClick"',
  })

  await userEvent.click(getByTestId('closebutton'))
  await nextTick()
  expect(handleClick).toHaveBeenCalled()
})
