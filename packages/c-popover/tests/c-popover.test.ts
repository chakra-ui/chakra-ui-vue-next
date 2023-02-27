import { render } from "../../test-utils/src"
import { CPopover } from "../src"

it("should render properly", () => {
  const { asFragment } = render(CPopover)
  expect(asFragment()).toMatchSnapshot()
})
