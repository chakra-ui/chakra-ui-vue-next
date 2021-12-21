import { render, waitMs, screen } from "@chakra-ui/vue-test-utils/src"
import { defineComponent, h, nextTick, onMounted } from "vue"
import { useRef } from "../src/dom"

const ExampleComponent = defineComponent({
  setup(_, { slots }) {
    return () => h("button", {}, () => slots?.default?.())
  },
})

const renderComponent = () =>
  render({
    components: { ExampleComponent },
    template: `
    <div>
      <div data-testid="divElement" :ref="container">Regular element</div>
      <ExampleComponent data-testid="buttonComponent" :ref="component">Hello</ExampleComponent>
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

let _containerEl: HTMLElement | null
let _componentEl: HTMLElement | null

it("`useDOMRef` should bind components to template elements", async () => {
  renderComponent()

  await waitMs(500)
  expect(screen.getByTestId("divElement")).toBe(_containerEl)
  expect(screen.getByTestId("buttonComponent")).toBe(_componentEl)
})

it("`useDOMRef` should bind components to render function elements", async () => {
  renderComponent()

  await waitMs(500)
  expect(screen.getByTestId("divElement")).toBe(_containerEl)
  expect(screen.getByTestId("buttonComponent")).toBe(_componentEl)
})
