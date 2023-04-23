import { h, Fragment, Component } from "vue"
import { CFormControl } from "../../c-form-control/index"
import { render, screen, testA11y } from "@chakra-ui/vue-test-utils"
import { createIcon } from "@chakra-ui/vue-next"
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

  const SmileyEmojiIcon = createIcon({
    name: "SmileyEmojiIcon",
    viewBox: "0 0 32 32",
    path: `<g data-testid="custom-icon" fill="none"><path fill="url(#f463id0)" d="M15.999 29.998c9.334 0 13.999-6.268 13.999-14c0-7.73-4.665-13.998-14-13.998C6.665 2 2 8.268 2 15.999c0 7.731 4.664 13.999 13.999 13.999Z"/><path fill="url(#f463id1)" d="M15.999 29.998c9.334 0 13.999-6.268 13.999-14c0-7.73-4.665-13.998-14-13.998C6.665 2 2 8.268 2 15.999c0 7.731 4.664 13.999 13.999 13.999Z"/><path fill="url(#f463id2)" d="M15.999 29.998c9.334 0 13.999-6.268 13.999-14c0-7.73-4.665-13.998-14-13.998C6.665 2 2 8.268 2 15.999c0 7.731 4.664 13.999 13.999 13.999Z"/><path fill="url(#f463id3)" fill-opacity=".6" d="M15.999 29.998c9.334 0 13.999-6.268 13.999-14c0-7.73-4.665-13.998-14-13.998C6.665 2 2 8.268 2 15.999c0 7.731 4.664 13.999 13.999 13.999Z"/><path fill="url(#f463id4)" d="M15.999 29.998c9.334 0 13.999-6.268 13.999-14c0-7.73-4.665-13.998-14-13.998C6.665 2 2 8.268 2 15.999c0 7.731 4.664 13.999 13.999 13.999Z"/><path fill="url(#f463id5)" d="M15.999 29.998c9.334 0 13.999-6.268 13.999-14c0-7.73-4.665-13.998-14-13.998C6.665 2 2 8.268 2 15.999c0 7.731 4.664 13.999 13.999 13.999Z"/><path fill="url(#f463id6)" d="M15.999 29.998c9.334 0 13.999-6.268 13.999-14c0-7.73-4.665-13.998-14-13.998C6.665 2 2 8.268 2 15.999c0 7.731 4.664 13.999 13.999 13.999Z"/><path fill="url(#f463id7)" d="M15.999 29.998c9.334 0 13.999-6.268 13.999-14c0-7.73-4.665-13.998-14-13.998C6.665 2 2 8.268 2 15.999c0 7.731 4.664 13.999 13.999 13.999Z"/><g filter="url(#f463idb)" opacity=".5"><path stroke="#9A4609" stroke-linecap="round" stroke-width="2" d="M7.5 11.5s.25-2 2.5-2s2.5 2 2.5 2"/></g><g filter="url(#f463idc)" opacity=".5"><path stroke="#9A4609" stroke-linecap="round" stroke-width="2" d="M18.5 11.5s.5-2 2.5-2s2.5 2 2.5 2"/></g><path stroke="#43273B" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11s.25-2 2.5-2s2.5 2 2.5 2"/><g filter="url(#f463idd)" opacity=".26"><path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width=".75" d="M8.25 10.75s.25-2 2.5-2s2.5 2 2.5 2"/></g><path stroke="#43273B" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11s.5-2 2.5-2s2.5 2 2.5 2"/><g filter="url(#f463ide)" opacity=".26"><path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width=".75" d="M19.25 10.75s.25-2 2.5-2s2.5 2 2.5 2"/></g><path fill="url(#f463id8)" d="M11.62 18.5h6.48l5.4 3l-3.78 8L10 26l1.62-7.5Z"/><path fill="url(#f463idf)" d="M18.368 22.368L15.5 19.5l8-3.5l.955 2.292a3.734 3.734 0 0 1-6.087 4.076Z"/><path stroke="url(#f463id9)" stroke-linecap="round" stroke-width="2" d="M9 16c.5.667 2.5 2.5 7 2.5s6.5-1.833 7-2.5"/><path fill="url(#f463ida)" fill-rule="evenodd" d="m18.175 22.175l.193.193a3.734 3.734 0 0 0 6.087-4.076l-.267-.641A3.981 3.981 0 0 0 22 17c-.424 0-.832.066-1.215.188l-.756.33a3.999 3.999 0 0 0-1.854 4.657Z" clip-rule="evenodd"/><defs><radialGradient id="f463id0" cx="0" cy="0" r="1" gradientTransform="rotate(132.839 10.786 10.065) scale(37.5033)" gradientUnits="userSpaceOnUse"><stop stop-color="#FFF478"/><stop offset=".475" stop-color="#FFB02E"/><stop offset="1" stop-color="#F70A8D"/></radialGradient><radialGradient id="f463id1" cx="0" cy="0" r="1" gradientTransform="rotate(131.878 10.74 10.193) scale(38.9487)" gradientUnits="userSpaceOnUse"><stop stop-color="#FFF478"/><stop offset=".475" stop-color="#FFB02E"/><stop offset="1" stop-color="#F70A8D"/></radialGradient><radialGradient id="f463id2" cx="0" cy="0" r="1" gradientTransform="rotate(101.31 2.876 12.808) scale(17.8466 22.8581)" gradientUnits="userSpaceOnUse"><stop offset=".788" stop-color="#F59639" stop-opacity="0"/><stop offset=".973" stop-color="#FF7DCE"/></radialGradient><radialGradient id="f463id3" cx="0" cy="0" r="1" gradientTransform="matrix(-29 29 -29 -29 18 14)" gradientUnits="userSpaceOnUse"><stop offset=".315" stop-opacity="0"/><stop offset="1"/></radialGradient><radialGradient id="f463id4" cx="0" cy="0" r="1" gradientTransform="rotate(77.692 -2.555 18.434) scale(28.1469)" gradientUnits="userSpaceOnUse"><stop offset=".508" stop-color="#7D6133" stop-opacity="0"/><stop offset="1" stop-color="#715B32"/></radialGradient><radialGradient id="f463id5" cx="0" cy="0" r="1" gradientTransform="matrix(7.5 10.99996 -7.97335 5.4364 16.5 16.5)" gradientUnits="userSpaceOnUse"><stop stop-color="#FFB849"/><stop offset="1" stop-color="#FFB847" stop-opacity="0"/></radialGradient><radialGradient id="f463id6" cx="0" cy="0" r="1" gradientTransform="matrix(11.49998 2 -2 11.49998 20.5 18)" gradientUnits="userSpaceOnUse"><stop stop-color="#FFA64B"/><stop offset=".9" stop-color="#FFAE46" stop-opacity="0"/></radialGradient><radialGradient id="f463id7" cx="0" cy="0" r="1" gradientTransform="rotate(43.971 -9.827 29.173) scale(59.0529)" gradientUnits="userSpaceOnUse"><stop offset=".185" stop-opacity="0"/><stop offset="1" stop-opacity=".4"/></radialGradient><radialGradient id="f463id8" cx="0" cy="0" r="1" gradientTransform="rotate(129.007 5.449 13.952) scale(7.72137 5.2163)" gradientUnits="userSpaceOnUse"><stop stop-color="#F63711"/><stop offset="1" stop-color="#E24A2C" stop-opacity="0"/></radialGradient><radialGradient id="f463id9" cx="0" cy="0" r="1" gradientTransform="matrix(0 6 -9.18387 0 16 14)" gradientUnits="userSpaceOnUse"><stop offset=".518" stop-color="#4E2553"/><stop offset=".703" stop-color="#5B4852"/><stop offset="1" stop-color="#4E2553"/><stop offset="1" stop-color="#4E2553"/></radialGradient><radialGradient id="f463ida" cx="0" cy="0" r="1" gradientTransform="matrix(1.33333 2 -6 4 22.667 21)" gradientUnits="userSpaceOnUse"><stop stop-color="#FF7291"/><stop offset="1" stop-color="#FF7291" stop-opacity="0"/></radialGradient><filter id="f463idb" width="10" height="7" x="5" y="7" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_31_15" stdDeviation=".75"/></filter><filter id="f463idc" width="10.001" height="7" x="16" y="7" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_31_15" stdDeviation=".75"/></filter><filter id="f463idd" width="8.75" height="5.75" x="6.375" y="6.875" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_31_15" stdDeviation=".75"/></filter><filter id="f463ide" width="8.75" height="5.75" x="17.375" y="6.875" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_31_15" stdDeviation=".75"/></filter><linearGradient id="f463idf" x1="23.5" x2="20.383" y1="22.5" y2="16.006" gradientUnits="userSpaceOnUse"><stop stop-color="#D40F31"/><stop offset=".341" stop-color="#FF2375"/><stop offset="1" stop-color="#FF278E"/></linearGradient></defs></g>`,
  })

  const renderSelectWithCustomIcon = (options?: Component) =>
    render({
      components: {
        CSelect,
        SmileyEmojiIcon,
      },
      template: `
        <c-select aria-label="Select Food" placeholder="Select an option">
          <template v-slot:icon>
            <smiley-emoji-icon />
          </template>
          <option value="a">A</option>
          <option value="b">B</option>
          <option value="c">C</option>
        </c-select>`,
      ...options,
    })

  it("renders in custom icon in `icon` slot.", () => {
    const { container, asFragment } = renderSelectWithCustomIcon()

    const select = container.querySelector("select") as HTMLElement
    const iconWrapper = container.querySelector(
      ".chakra-select__icon-wrapper"
    ) as HTMLElement
    const customIcon = screen.getByTestId("custom-icon")

    expect(iconWrapper).toBeInTheDocument()
    expect(iconWrapper).toContainElement(customIcon)
    expect(asFragment()).toMatchSnapshot()
  })
})
