import { render } from "../../test-utils/src"
import { CLiveRegion } from "../src"

it("should render properly", () => {
  const { asFragment } = render(CLiveRegion)
  expect(asFragment()).toMatchSnapshot()
})
