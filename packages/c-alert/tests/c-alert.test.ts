import { render } from '../../test-utils/src'
import { CAlert } from '../src'

describe('Alert tests', () => {
  it('should render properly', () => {
    const { asFragment } = render(CAlert)
    expect(asFragment()).toMatchSnapshot()
  })
})
