import { render } from '@chakra-ui/vue-test-utils'
import CBox from '../'

it('should render properly', () => {
  const { html } = render(CBox)
  expect(html()).toMatchSnapshot()
})
