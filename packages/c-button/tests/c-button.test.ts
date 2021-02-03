import { render } from '../../test-utils/src'
import CButton from '../src'

it('should render properly', () => {
  const { asFragment } = render(CButton)
  expect(asFragment()).toMatchSnapshot()
})
