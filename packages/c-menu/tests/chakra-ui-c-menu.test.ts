import { render } from '../../test-utils/src'
import { ChakraUiCMenu } from '../src'

it('should render properly', () => {
  const { asFragment } = render(ChakraUiCMenu)
  expect(asFragment()).toMatchSnapshot()
})