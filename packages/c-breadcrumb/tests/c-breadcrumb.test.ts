import { render } from '../../test-utils/src'
import { CBreadcrumb } from '../src'

it('should render properly', () => {
  const { asFragment } = render(CBreadcrumb)
  expect(asFragment()).toMatchSnapshot()
})