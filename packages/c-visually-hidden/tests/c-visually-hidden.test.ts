import { render } from '../../test-utils/src'
import { CVisuallyHidden } from '../src'

it('should render properly', () => {
  const { asFragment } = render(CVisuallyHidden)
  expect(asFragment()).toMatchSnapshot()
})