import { render } from '@chakra-ui/vue-test-utils/src'
import { CScrollLock } from '../src'

const renderComponent = (props?: {}) =>
  render({
    template: `
    <div>
      <section>
        <c-scroll-lock>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qu
          officia deserunt mollit anim id est laborum.
          </p>
        </c-scroll-lock>
      </section>
    </div>
  `,
    ...props,
  })

it('should render properly', () => {
  const { asFragment } = renderComponent()
  expect(asFragment()).toMatchSnapshot()
})

it('should block body', () => {
  const { asFragment } = renderComponent()
  expect(asFragment()).toMatchSnapshot()
})
