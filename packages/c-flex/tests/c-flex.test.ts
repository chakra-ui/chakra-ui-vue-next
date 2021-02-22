import { render } from '../../test-utils/src'
import { CFlex } from '../src'

it('should render properly', () => {
  const { asFragment } = render(CFlex)
  expect(asFragment()).toMatchSnapshot()
})
