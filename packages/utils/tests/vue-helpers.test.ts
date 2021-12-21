import { createContext } from "@chakra-ui/vue-utils/src"
import { defineComponent, h } from "vue"
import { render } from "@chakra-ui/vue-test-utils/src"

interface ExampleContext {
  example: string
}

const [ExampleProvider, useExampleContext] = createContext<ExampleContext>({
  name: "ExampleContext",
  errorMessage:
    "useContext: `context` is undefined. Seems you forgot to wrap component within the Provider",
})

const ExampleComponent = defineComponent({
  setup() {
    const { example } = useExampleContext()
    return () => h("div", `injected: ${example}`)
  },
})

beforeEach(() => {
  // disable console.warn
  jest.spyOn(console, "warn").mockImplementation(() => {})
})

it("should provide and inject a context", () => {
  const { getByText } = render({
    components: { ExampleComponent },
    template: `
      <div>
        <ExampleComponent />
      </div>
    `,
    setup() {
      ExampleProvider({ example: "works" })
    },
  })
  getByText(/works/)
})

it("should throw an error when there is no provider", () => {
  expect(() => {
    render({
      components: { ExampleComponent },
      template: `<ExampleComponent />`,
      setup() {},
    })
  }).toThrowError(
    "useContext: `context` is undefined. Seems you forgot to wrap component within the Provider"
  )
})
