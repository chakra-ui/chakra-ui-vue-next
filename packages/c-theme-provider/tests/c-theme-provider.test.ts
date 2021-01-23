import { render } from '@chakra-ui/vue-test-utils'
import CThemeProvider from '../'

it('should render properly', () => {
  const { html } = render(CThemeProvider)
  expect(html()).toMatchSnapshot()
})
