import { render } from '../../test-utils/src'
import { CModal } from '../src'

it('should render properly', () => {
  const { asFragment } = render(CModal)
  expect(asFragment()).toMatchSnapshot()
})