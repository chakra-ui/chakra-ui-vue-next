import { render } from '../../test-utils/src'
import { CInput } from '../src'

it('should render properly', () => {
  const { asFragment } = render(CInput)
  expect(asFragment()).toMatchSnapshot()
})