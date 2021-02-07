import { render } from '../../test-utils/src'
import { CSpinner } from '../src'

it('should render properly', () => {
  const { asFragment } = render(CSpinner)
  expect(asFragment()).toMatchSnapshot()
})