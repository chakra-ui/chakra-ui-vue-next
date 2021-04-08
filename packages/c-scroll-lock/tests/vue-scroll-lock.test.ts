import { render } from '@chakra-ui/vue-test-utils/src'
import { CScrollLock } from '../src'

it('should render properly', () => {
  const { asFragment } = render(CScrollLock)
  expect(asFragment()).toMatchSnapshot()
})
