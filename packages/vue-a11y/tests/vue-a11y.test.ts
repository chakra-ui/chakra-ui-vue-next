import { render } from '../../test-utils/src'
import { VueA11y } from '../src'

it('should render properly', () => {
  const { asFragment } = render(VueA11y)
  expect(asFragment()).toMatchSnapshot()
})