import { render } from '@chakra-ui/vue-test-utils'
import CButton from '../src'

it('should render properly', () => {
  const { asFragment } = render(CButton)
  expect(asFragment()).toMatchSnapshot()
})
