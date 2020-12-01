import { render } from '@chakra-ui/vue-test-utils'
import CAccordion from '../'

it('should render properly', () => {
  const { html } = render(CAccordion)
  expect(html()).toMatchSnapshot()
})
