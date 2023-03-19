import { render } from "../../test-utils/src"
import { CTooltip } from "../src"

it("should render properly", () => {
  const { asFragment } = render(CTooltip)
  expect(asFragment()).toMatchSnapshot()
})
