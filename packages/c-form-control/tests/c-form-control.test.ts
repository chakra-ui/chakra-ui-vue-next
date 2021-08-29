import { render } from '../../test-utils/src'
import { CFormControl } from '../src'

it('should render properly', () => {
  const { asFragment } = render(CFormControl)
  expect(asFragment()).toMatchSnapshot()
})