import { render } from '@chakra-ui/vue-test-utils'
import CButton from '../'


it('should render properly', () => {
  const { html } = render(CButton)
  expect(html()).toMatchSnapshot()
})