import { render } from '../../test-utils/src'
import { CSkipNav } from '../src'

it('should render properly', () => {
  const { asFragment } = render(CSkipNav)
  expect(asFragment()).toMatchSnapshot()
})