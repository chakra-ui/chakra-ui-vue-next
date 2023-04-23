import { Component } from "vue"
import { CFormControl } from "../../c-form-control/index"
import { render, testA11y } from "@chakra-ui/vue-test-utils"
import { CSelect } from "../src"

const renderComponent = (options?: Component) =>
  render({
    components: {
      CSelect,
    },
    template: `
      <CSelect aria-label="Select Food" placeholder="Select an option">
        <option value="a">A</option>
        <option value="b">B</option>
        <option value="c">C</option>
      </CSelect>`,
    ...options,
  })

describe("CSelect", () => {
  it("should render properly", () => {
    const { asFragment } = render(<CSelect />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("should pass a11y check", async () => {
    await testA11y(renderComponent())
  })

  it("renders a placeholder option", () => {
    const { container } = renderComponent()

    const option = container.querySelector("option[value='']") as HTMLElement

    expect(option).toBeInTheDocument()
    expect(option.textContent).toEqual("Select an option")
  })

  it("renders in disabled state if isDisabled is true", () => {
    const { container } = renderComponent({
      template: `<c-select isDisabled placeholder="Select an option" />`,
    })

    const select = container.querySelector("select") as HTMLElement
    const iconWrapper = container.querySelector(
      ".chakra-select__icon-wrapper"
    ) as HTMLElement

    expect(select).toBeDisabled()
    expect(iconWrapper).toHaveAttribute("data-disabled", "true")
  })

  it("doesn't render in disabled state if isDisabled is false", () => {
    const { container } = renderComponent({
      template: `<c-select :isDisabled="false" placeholder="Select an option" />`,
    })

    const select = container.querySelector("select") as HTMLElement
    const iconWrapper = container.querySelector(
      ".chakra-select__icon-wrapper"
    ) as HTMLElement

    expect(select).not.toBeDisabled()
    expect(iconWrapper).not.toHaveAttribute("data-disabled", "true")
  })

  it("renders in disabled state if wrapped by CFormControl with isDisabled true", () => {
    const { container, asFragment } = render({
      components: { CSelect, CFormControl },
      template: `
        <c-form-control is-disabled>
          <c-select placeholder="Select an option" />
        </c-form-control>
      `,
    })

    const select = container.querySelector("select") as HTMLElement
    const iconWrapper = container.querySelector(
      ".chakra-select__icon-wrapper"
    ) as HTMLElement

    expect(select).toBeDisabled()
    expect(iconWrapper).toHaveAttribute("data-disabled", "true")
    expect(asFragment()).toMatchSnapshot()
  })
})
