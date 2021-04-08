import { render } from '../../test-utils/src'
import { VueScrollLock } from '../src'

it('should render properly', () => {
  const { asFragment } = render(VueScrollLock)
  expect(asFragment()).toMatchSnapshot()
})