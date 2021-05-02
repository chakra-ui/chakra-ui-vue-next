import { reactive } from 'vue'
import { render, screen, userEvent, waitMs } from '../../test-utils/src'
import { CFocusLock, useFocusLock, UseFocusLockOptions } from '../src'
import { CPortal } from '../../c-portal/src'

const onActivateMock = jest.fn()
const onDeactivateMock = jest.fn()

afterEach(() => {
  jest.clearAllMocks()
})

// TODO:
//
// The majority of the tests in this file are skipped in jest
// because focus tracking seems to behave differently here
// than with in the browser.
//
// Focus appears to be sent to the body instead of the components.
// However in the browser/playground focus behaves as expected.
//
// A possible solution for this problem is to test this in Cypress.

const renderComponent = (props?: any) => {
  const base = {
    components: {
      // CPortal,
      CFocusLock,
    },
    template: `
        <div :ref="lock" data-testid="focus-lock-container">
          <input data-testid="input" />
          <input />
          <input />
        </div>
    `,
    setup() {
      const { lock } = useFocusLock({
        immediate: true,
        onActivate: onActivateMock,
        onDeactivate: onDeactivateMock,
      })

      return {
        lock,
      }
    },
    ...props,
  }
  return render(base)
}

it('should focus first focusable child when mounted', async () => {
  renderComponent()

  /** We delay so that focus lock has time to activate */
  await waitMs(500)

  const input = screen.getByTestId('input')
  expect(input).toHaveFocus()
  expect(onActivateMock).toHaveBeenCalledTimes(1)
})

it('should focus first focusable child when after tab cycle is complete', async () => {
  renderComponent()

  /** We delay so that focus lock has time to activate */
  await waitMs(500)

  await userEvent.tab()
  await userEvent.tab()
  await userEvent.tab()

  const input = screen.getByTestId('input')
  expect(input).toHaveFocus()
  expect(onActivateMock).toHaveBeenCalledTimes(1)
})

it('should focus initialFocus element when initialFocus element is provided', async () => {
  renderComponent({
    template: `
      <div :ref="lock" data-testid="focus-lock-container">
        <input />
        <button :ref="initialFocus" data-testid="initial-focus-element">Focus me first</button>
        <input />
      </div>
    `,
    setup() {
      const options: UseFocusLockOptions = {
        immediate: true,
        onActivate: onActivateMock,
        onDeactivate: onDeactivateMock,
      }

      const { lock, initialFocus } = useFocusLock(options)

      return {
        lock,
        initialFocus,
      }
    },
  })

  /** We delay so that focus lock has time to activate */
  await waitMs(500)

  const button = screen.getByTestId('initial-focus-element')
  expect(button).toHaveFocus()
  expect(onActivateMock).toHaveBeenCalledTimes(1)
})

it('should deactivate focus-lock when clickOutsideDeactivates=`true` and click event happens outside focus lock', async () => {
  renderComponent({
    template: `
      <div :ref="lock" data-testid="focus-lock-container">
        <input />
        <button :ref="initialFocus" data-testid="initial-focus-element">Focus me first</button>
        <input />
      </div>
      <button data-testid="click-outside-focus-trap">Outside</button>
    `,
    setup() {
      const options = reactive({
        immediate: true,
        clickOutsideDeactivates: true,
        escapeDeactivates: false,
        onActivate: onActivateMock,
        onDeactivate: onDeactivateMock,
      })

      const { lock, initialFocus } = useFocusLock(options)

      return {
        lock,
        initialFocus,
      }
    },
  })

  /** We delay so that focus lock has time to activate */
  await waitMs(500)

  const initialFocus = screen.getByTestId('initial-focus-element')
  const outsideButton = screen.getByTestId('click-outside-focus-trap')

  expect(initialFocus).toHaveFocus()
  expect(outsideButton).not.toHaveFocus()
  // On mounted, focus trap is activated only once.
  expect(onActivateMock).toHaveBeenCalledTimes(1)

  await userEvent.click(outsideButton)

  expect(initialFocus).not.toHaveFocus()
  expect(outsideButton).toHaveFocus()
  // On clickoutside focus-lock, focus lock should be deactivated.
  expect(onDeactivateMock).toHaveBeenCalled()
})

it('should render properly', () => {
  const { asFragment } = renderComponent()
  expect(asFragment()).toMatchSnapshot()
})
