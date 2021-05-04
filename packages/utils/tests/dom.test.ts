import { render, waitMs, screen } from '@chakra-ui/vue-test-utils/src'
import { defineComponent, h, nextTick, onMounted } from '@vue/runtime-core'
import { useRef } from '../src/dom'

const ExampleComponent = defineComponent({
  template: `<button><slot /></button>`,
})

let _containerEl: HTMLElement | null
let _componentEl: HTMLElement | null

it('`useDOMRef` should bind components to template elements', async () => {
  render({
    components: { ExampleComponent },
    template: `
      <div>
        <div data-testid="divElement" :ref="container">Regular element</div>
        <ExampleComponent data-testid="buttonComponent" :ref="component" />
      </div>
      `,
    setup() {
      const [container, containerEl] = useRef()
      const [component, componentEl] = useRef()

      onMounted(async () => {
        await nextTick()

        _containerEl = containerEl.value
        _componentEl = componentEl.value
      })

      return {
        container,
        component,
      }
    },
  })

  await waitMs(500)
  expect(screen.getByTestId('divElement')).toBe(_containerEl)
  expect(screen.getByTestId('buttonComponent')).toBe(_componentEl)
})

it('`useDOMRef` should bind components to render function elements', async () => {
  render({
    components: { ExampleComponent },
    setup() {
      const [container, containerEl] = useRef()
      const [component, componentEl] = useRef()

      onMounted(async () => {
        await nextTick()

        _containerEl = containerEl.value
        _componentEl = componentEl.value
      })

      return () =>
        h('div', [
          h(
            // @ts-ignore
            'div',
            {
              'data-testid': 'divElement',
              ref: container,
            },
            'Regular element'
          ),
          h(
            // @ts-ignore
            ExampleComponent,
            {
              'data-testid': 'buttonComponent',
              ref: component,
            },
            'Click me'
          ),
        ])
    },
  })

  await waitMs(500)
  expect(screen.getByTestId('divElement')).toBe(_containerEl)
  expect(screen.getByTestId('buttonComponent')).toBe(_componentEl)
})
