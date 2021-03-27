import { render } from '../../test-utils/src'
import { CCloseButton } from '../src'

it('should render properly', () => {
  const { asFragment } = render(CCloseButton)
  expect(asFragment()).toMatchSnapshot()
})