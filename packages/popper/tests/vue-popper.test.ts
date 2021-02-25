import { render } from '../../test-utils/src'
import { VuePopper } from '../src'

it('should render properly', () => {
  const { asFragment } = render(VuePopper)
  expect(asFragment()).toMatchSnapshot()
})