import { ThemeProviderProps } from "@chakra-ui/vue-next/src"
import { render, screen } from "../../test-utils/src"
import { defineComponent, h, inject } from "vue"
import CThemeProvider from "../src"

let blueString: string

const ChildComponent = defineComponent({
  setup() {
    const theme = inject<ThemeProviderProps>("$chakraTheme")
    blueString = JSON.stringify(theme?.colors?.blue)
    return () => h("div", blueString)
  },
})

it("should render default slot", () => {
  const { asFragment } = render({
    components: { CThemeProvider, ChildComponent },
    template: `
      <c-theme-provider>
        <div data-testid="child">Test child element</div>
      </c-theme-provider>
    `,
  })
  expect(asFragment()).toMatchSnapshot()
  expect(screen.getByTestId("child").innerHTML).toEqual("Test child element")
})

it("should provide theme object", () => {
  const { asFragment } = render({
    components: { CThemeProvider, ChildComponent },
    template: `
      <c-theme-provider>
        <child-component />
      </c-theme-provider>
    `,
  })
  expect(asFragment()).toMatchSnapshot()
  expect(screen.getByText(blueString).innerHTML).toEqual(blueString)
})
