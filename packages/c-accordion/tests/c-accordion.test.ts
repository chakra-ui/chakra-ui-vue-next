import { render } from '@chakra-ui/vue-test-utils'
import CAccordion from '../src'

it('should render properly', () => {
  const { asFragment } = render(CAccordion)
  expect(asFragment()).toMatchSnapshot()
})
