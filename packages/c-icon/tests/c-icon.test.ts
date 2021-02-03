import { render } from '../../test-utils/src'
import { CIcon } from '../src'

it('should render properly', () => {
  const { asFragment } = render(CIcon)
  expect(asFragment()).toMatchSnapshot()
})