import { render } from '../../test-utils/src'
import { CAlert, CAlertDescription, CAlertIcon, CAlertTitle } from '../src'

const renderComponent = (props?: any) =>
  render({
    components: { CAlert, CAlertDescription, CAlertIcon, CAlertTitle },
    template: `
      <c-alert data-testid="alert" variant="left-accent" status="info" mb="3">
        <c-alert-icon mr="2" />
        <c-alert-title> Info alert </c-alert-title>
        <c-alert-description> Something just happened </c-alert-description>
      </c-alert>`,
    ...props,
  })

it('should render properly', () => {
  const { asFragment } = render(CAlert)
  expect(asFragment()).toMatchSnapshot()
})

it('should render all children', () => {
  const { asFragment } = renderComponent()
  expect(asFragment()).toMatchSnapshot()
})

it('should possess correct role attributes', () => {
  const { getByTestId } = renderComponent()
  expect(getByTestId('alert')).toHaveAttribute('role', 'alert')
})
