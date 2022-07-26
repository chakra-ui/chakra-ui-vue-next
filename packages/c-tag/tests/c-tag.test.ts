import { render } from "../../test-utils/src"
import {
  CTag,
  CTagCloseButton,
  CTagLabel,
  CTagLeftIcon,
  CTagRightIcon,
} from "../src"

type CTagRenderType =
  | "label"
  | "left-icon"
  | "right-icon"
  | "close-button"
  | "button-disabled"
  | "all"

const renderCTag = (props?: any, type?: CTagRenderType) => {
  const template = (type: CTagRenderType) => {
    switch (type) {
      case "label":
        return "<CTag><CTagLabel>Sample tag</CTagLabel></CTag>"
      case "left-icon":
        return "<CTag><CTagLeftIcon name='add'/><CTagLabel>Sample tag</CTagLabel></CTag>"
      case "right-icon":
        return "<CTag><CTagLabel>Sample tag</CTagLabel><CTagRightIcon name='check'/></CTag>"
      case "close-button":
        return "<CTag><CTagLabel>Sample tag</CTagLabel><CTagCloseButton /></CTag>"
      case "button-disabled":
        return "<CTag><CTagLabel>Sample tag</CTagLabel><CTagCloseButton isDisabled /></CTag>"
      case "all":
        return "<CTag><CTagLeftIcon name='add'/><CTagLabel>Sample tag</CTagLabel><CTagCloseButton /></CTag>"
      default:
        return "<CTag>Sample tag</CTag>"
    }
  }
  const base = {
    components: {
      CTag,
      CTagLabel,
      CTagLeftIcon,
      CTagRightIcon,
      CTagCloseButton,
    },
    template: template(type),
    ...props,
  }
  return render(base)
}

describe("CTag", () => {
  it("renders base tag properly", () => {
    const { asFragment } = renderCTag()
    expect(asFragment()).toMatchSnapshot()
  })

  it("renders base tag with c-label properly", () => {
    const { asFragment } = renderCTag({}, "label")
    expect(asFragment()).toMatchSnapshot()
  })

  it("renders tag with left icon properly", () => {
    const { asFragment } = renderCTag({}, "left-icon")
    expect(asFragment()).toMatchSnapshot()
  })

  it("renders with right icon properly", () => {
    const { asFragment } = renderCTag({}, "right-icon")
    expect(asFragment()).toMatchSnapshot()
  })

  it("renders with close button properly", () => {
    const { asFragment } = renderCTag({}, "close-button")
    expect(asFragment()).toMatchSnapshot()
  })

  it("renders with disabled button properly", () => {
    const { asFragment } = renderCTag({}, "button-disabled")
    expect(asFragment()).toMatchSnapshot()
  })

  it("renders with left icon and close button", () => {
    const { asFragment } = renderCTag({}, "all")
    expect(asFragment()).toMatchSnapshot()
  })
})
