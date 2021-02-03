import { render } from '../../test-utils/src'
import CAccordion from '../src'

it('should render properly', () => {
  const { asFragment } = render(CAccordion)
  expect(asFragment()).toMatchSnapshot()
})
