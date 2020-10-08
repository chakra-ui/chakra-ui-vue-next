import { render } from '@chakra-ui/vue-test-utils'
import CButton from '../src'

it('should render properly', () => {
  const { html } = render(CButton)
  expect(html()).toMatchSnapshot()
})
