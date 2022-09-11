import { render } from '../../test-utils/src'
import { CCheckbox } from '../src'

it('should render properly', () => {
  const { asFragment } = render(CCheckbox)
  expect(asFragment()).toMatchSnapshot()
})