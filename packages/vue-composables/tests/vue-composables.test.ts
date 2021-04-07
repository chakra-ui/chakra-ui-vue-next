import { render } from '../../test-utils/src'
import { VueComposables } from '../src'

it('should render properly', () => {
  const { asFragment } = render(VueComposables)
  expect(asFragment()).toMatchSnapshot()
})