import {
  CInput,
  CInputGroup,
  CInputLeftElement,
  CInputRightElement,
} from "../src"
import { Component, h } from "vue"
import { render, screen, testA11y } from "../../test-utils/src"

const renderComponent = (options: Component = {}) =>
  render({
    components: { CInput },
    template: `<CInput />`,
    ...options,
  })

describe("<CInput />", () => {
  it("should render properly", () => {
    const { asFragment } = render(CInput)
    expect(asFragment()).toMatchSnapshot()
  })

  it("a11y test", async () => {
    await testA11y(renderComponent(), {
      axeOptions: {
        rules: {
          label: { enabled: false },
        },
      },
    })
  })

  it("element inside input group render correctly", () => {
    const { getByText } = render(() => (
      <CInputGroup>
        <CInputLeftElement>
          <span>Hello</span>
        </CInputLeftElement>
        <CInput />
        <CInputRightElement>
          <span>World</span>
        </CInputRightElement>
      </CInputGroup>
    ))

    expect(getByText("Hello")).toBeInTheDocument()
    expect(getByText("World")).toBeInTheDocument()
  })

  it("Invalid input renders correctly", () => {
    render(() => <CInput isInvalid />)

    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true")
  })

  it("Disabled input renders correctly", () => {
    render(() => <CInput isDisabled />)
    expect(screen.getByRole("textbox")).toHaveAttribute("disabled")
  })

  it("Read-only input renders correctly", () => {
    render(() => <CInput isReadOnly />)
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-readonly", "true")
  })
})
