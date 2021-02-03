import { render, screen } from '@chakra-ui/vue-test-utils'
import { defineComponent, h } from 'vue'
import { chakra } from '../src'

const renderComponent = (options?: Record<string, any>) =>
  render({
    components: {
      chakra: defineComponent({
        setup(_, { slots }) {
          return () => h(chakra('span'), {}, slots)
        },
      }),
    },
    template: `<chakra>child-element</chakra>`,
    ...options,
  })

it('should be render properly', () => {
  const { asFragment } = renderComponent()
  expect(asFragment()).toMatchSnapshot()
})

it('should be render default slot', () => {
  renderComponent()
  expect(screen.getByText('child-element')).toBeInTheDocument()
})
