import { render, screen } from '../../test-utils/src'
import { defineComponent, h } from 'vue'
import { chakra } from '../src'

describe('chakra() works', () => {
  const renderComponent = (options?: Record<string, any>) =>
    render({
      components: {
        chakra: defineComponent({
          setup(_, { slots }) {
            return () => h(chakra('span', {}), {}, slots)
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
})

describe('as prop', () => {
  const FakeRouterLink = defineComponent({
    props: ['to'],
    setup(props, { slots }) {
      return () => h('a', { href: props.to }, { default: () => slots })
    },
  })
  it('render dom elements like as="h1"', () => {
    const { container, asFragment } = render({
      components: {
        chakra: defineComponent({
          setup(_, { slots }) {
            return () => h(chakra('h1', {}), {}, slots)
          },
        }),
      },
      template: `<chakra>as h1</chakra>`,
    })

    expect(asFragment()).toMatchSnapshot()
    expect(container.querySelector('h1')).toBeInTheDocument()
  })

  it('resolve global vue components like as="router-link"', () => {
    const { container, asFragment } = render(
      {
        components: {
          chakra: defineComponent({
            props: ['as'],
            setup(props, { slots, attrs }) {
              return () => h(chakra(props.as), {}, slots)
            },
          }),
        },
        template: `<chakra as="fake-router-link" to="https://google.com">as router-link</chakra>`,
      },
      // testing-library options
      {
        global: {
          components: {
            FakeRouterLink,
          },
        },
      }
    )

    expect(container.querySelector('a')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })

  it('render Vue Component like :as="RouterLink"', () => {
    const { container, asFragment } = render({
      components: {
        chakra: defineComponent({
          setup(_, { slots }) {
            return () =>
              h(
                chakra(FakeRouterLink, { to: 'https://vue.chakra-ui.com/' }),
                {},
                slots
              )
          },
        }),
      },
      template: `<chakra>as RouterLink</chakra>`,
    })

    expect(container.querySelector('a')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })
})
