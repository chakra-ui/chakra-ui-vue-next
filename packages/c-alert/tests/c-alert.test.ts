import { render } from '@chakra-ui/vue-test-utils'
import { CAlert } from '../src'

describe('Alert tests', () => {
  it('should render properly', () => {
    const { asFragment } = render(CAlert)
    expect(asFragment()).toMatchSnapshot()
  })
})
