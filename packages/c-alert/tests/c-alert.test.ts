import { render } from '@chakra-ui/vue-test-utils'
import CAlert from '../'

it('should render properly', () => {
  const { html } = render(CAlert)
  expect(html()).toMatchSnapshot()
})
